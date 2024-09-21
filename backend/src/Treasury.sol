// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract Treasury is Ownable {
  IERC20 public token;

  constructor(address initialOwner, IERC20 _token) Ownable(initialOwner) {
    token = _token;
    require(token.approve(address(this), type(uint).max));
  }

  modifier onlyDonor() {
    require(donors[msg.sender]);
    _;
  }

  modifier onlyResearcher() {
    require(researchers[msg.sender]);
    _;
  }

  modifier onlyApprover() {
    require(approvers[msg.sender]);
    _;
  }

  modifier onlyDebug() {
    require(owner() == msg.sender);
    _;
  }

  mapping(address => bool) public donors;
  mapping(address => bool) public researchers;
  mapping(address => bool) public approvers;

  uint totalProposals;
  uint totalDonors;
  uint8 constant THRESHOLD_MIN = 80;

  struct Proposal {
    uint fund;
    uint8 threshold;
    uint period;
    uint createdAt;
    uint totalVotes;
    uint totalYes;
    bool isApproved;
  }

  mapping(uint => Proposal) public proposals;

  function addDonor(address donorAddress) external onlyOwner {
    donors[donorAddress] = true;
    totalDonors++;
  }

  function addResearcher(address researcherAddress) external onlyOwner {
    researchers[researcherAddress] = true;
  }

  function addApprover(address approverAddress) external onlyOwner {
    approvers[approverAddress] = true;
  }

  function propose(uint fund) external onlyResearcher {
    require(fund > 0);
    proposals[totalProposals] = Proposal({
      fund: fund,
      threshold: THRESHOLD_MIN,
      period: 3600 * 24,
      createdAt: block.timestamp,
      totalVotes: 0,
      totalYes: 0,
      isApproved: false
    });
    totalProposals++;
  }

  function approve(uint proposalId) external onlyApprover {
    require(proposalId < totalProposals);
    require(!proposals[proposalId].isApproved);
    require(block.timestamp > proposals[proposalId].createdAt + proposals[proposalId].period);
    require(proposals[proposalId].totalYes > proposals[proposalId].totalVotes * proposals[proposalId].threshold / 100);
    proposals[proposalId].isApproved = true;
  }

  function vote(uint proposalId, bool yes) external onlyDonor {
    require(donors[msg.sender]);
    require(proposalId < totalProposals);
    require(!proposals[proposalId].isApproved);
    require(block.timestamp <= proposals[proposalId].createdAt + proposals[proposalId].period);
    require(proposals[proposalId].totalVotes < totalDonors);
    proposals[proposalId].totalVotes++;
    if (yes) {
      proposals[proposalId].totalYes++;
    }
  }

  function deposit(uint _amount) external onlyDonor {
    require(donors[msg.sender]);
    require(token.allowance(msg.sender, address(this)) >= _amount);
    require(token.balanceOf(msg.sender) >= _amount);
    require(token.transfer(address(this), _amount));
  }

  function withdraw(uint proposalId) external onlyResearcher {
    require(researchers[msg.sender]);
    require(proposals[proposalId].fund > 0);
    require(proposals[proposalId].isApproved);
    require(token.balanceOf(address(this)) >= proposals[proposalId].fund);
    require(token.transferFrom(address(this), msg.sender, proposals[proposalId].fund));
  }

  function setThreshold(uint proposalId, uint8 threshold) external onlyDebug {
    require(proposalId < totalProposals);
    require(threshold >= 0 && threshold <= 100);
    proposals[proposalId].threshold = threshold;
  }

  function setPeriod(uint proposalId, uint period) external onlyDebug {
    require(period >= 0 && period <= 60 * 60 * 24);
    proposals[proposalId].period = period;
  }
}