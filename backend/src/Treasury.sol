// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract Treasury is Ownable {
  struct SignatureRSV {
    bytes32 r;
    bytes32 s;
    uint256 v;
  }

  bytes32 public constant EIP712_DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
  string public constant SIGNIN_TYPE = "SignIn(address user,uint32 time)";
  bytes32 public constant SIGNIN_TYPEHASH = keccak256(bytes(SIGNIN_TYPE));
  bytes32 public immutable DOMAIN_SEPARATOR;

  struct SignIn {
    address user;
    uint32 time;
    SignatureRSV rsv;
  }

  IERC20 public token;

  constructor(address initialOwner, IERC20 _token) Ownable(initialOwner) {
    token = _token;
    require(token.approve(address(this), type(uint).max));

    DOMAIN_SEPARATOR = keccak256(abi.encode(
      EIP712_DOMAIN_TYPEHASH,
      keccak256("Treasury.SignIn"),
      keccak256("1"),
      block.chainid,
      address(this)
    ));
  }

  modifier authenticated(SignIn calldata auth) {
    // Must be signed within 24 hours ago.
    require(auth.time > (block.timestamp - (60*60*24)));
    // Validate EIP-712 sign-in authentication.
    bytes32 authdataDigest = keccak256(abi.encodePacked(
      "\x19\x01",
      DOMAIN_SEPARATOR,
      keccak256(abi.encode(
        SIGNIN_TYPEHASH,
        auth.user,
        auth.time
      ))
    ));
    address recovered_address = ecrecover(authdataDigest, uint8(auth.rsv.v), auth.rsv.r, auth.rsv.s);
    require( auth.user == recovered_address, "Invalid Sign-In" );
    _;
  }

  modifier onlyDonor(address user) {
    require(donors[msg.sender]);
    _;
  }

  modifier onlyResearcher(address user) {
    require(researchers[msg.sender]);
    _;
  }

  modifier onlyApprover(address user) {
    require(approvers[msg.sender]);
    _;
  }

  modifier onlyDebug(address user) {
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

  function addDonor(address donorAddress) external onlyOwner(){
    donors[donorAddress] = true;
    totalDonors++;
  }

  function addResearcher(address researcherAddress) external onlyOwner() {
    researchers[researcherAddress] = true;
  }

  function addApprover(address approverAddress) external onlyOwner() {
    approvers[approverAddress] = true;
  }

  function propose(SignIn calldata auth, uint fund) external onlyResearcher(auth.user) authenticated(auth) {
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

  function approve(SignIn calldata auth, uint proposalId) external onlyApprover(auth.user) authenticated(auth) {
    require(proposalId < totalProposals);
    require(!proposals[proposalId].isApproved);
    require(block.timestamp > proposals[proposalId].createdAt + proposals[proposalId].period);
    require(proposals[proposalId].totalYes > proposals[proposalId].totalVotes * proposals[proposalId].threshold / 100);
    proposals[proposalId].isApproved = true;
  }

  function vote(SignIn calldata auth, uint proposalId, bool yes) external onlyDonor(auth.user) authenticated(auth) {
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

  function deposit(SignIn calldata auth, uint _amount) external onlyDonor(auth.user) authenticated(auth) {
    require(donors[msg.sender]);
    require(token.allowance(msg.sender, address(this)) >= _amount);
    require(token.balanceOf(msg.sender) >= _amount);
    require(token.transfer(address(this), _amount));
  }

  function withdraw(SignIn calldata auth, uint proposalId) external onlyResearcher(auth.user) authenticated(auth) {
    require(researchers[msg.sender]);
    require(proposals[proposalId].fund > 0);
    require(proposals[proposalId].isApproved);
    require(token.balanceOf(address(this)) >= proposals[proposalId].fund);
    require(token.transferFrom(address(this), msg.sender, proposals[proposalId].fund));
  }

  function setThreshold(SignIn calldata auth, uint proposalId, uint8 threshold) external onlyDebug(auth.user) authenticated(auth) {
    require(proposalId < totalProposals);
    require(threshold >= 0 && threshold <= 100);
    proposals[proposalId].threshold = threshold;
  }

  function setPeriod(SignIn calldata auth, uint proposalId, uint period) external onlyDebug(auth.user) authenticated(auth) {
    require(period >= 0 && period <= 60 * 60 * 24);
    proposals[proposalId].period = period;
  }
}