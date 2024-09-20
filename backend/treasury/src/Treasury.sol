// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
  constructor(address initialOwner) Ownable(initialOwner) {}

  modifier onlyDonor() {
    require(donors[msg.sender]);
    _;
  }

  modifier onlyResearcher() {
    require(researchers[msg.sender]);
    _;
  }

  mapping(address => bool) public donors;
  mapping(address => bool) public researchers;

  uint totalProposals;

  struct Proposal {
    uint fund;
  }

  mapping(uint => Proposal) public proposals;

  function addDonor(address donorAddress) external onlyOwner {
    donors[donorAddress] = true;
  }

  function addResearcher(address researcherAddress) external onlyOwner {
    researchers[researcherAddress] = true;
  }

  function propose(uint fund) public {
    require(fund > 0);
    proposals[totalProposals] = Proposal({
      fund: fund
    });
    totalProposals++;
  }

  function deposit() external payable onlyDonor {
    require(donors[msg.sender]);
  }

  function withdraw(uint proposalId) external payable onlyResearcher {
    require(researchers[msg.sender]);
    require(proposals[proposalId].fund > 0);
  }
}