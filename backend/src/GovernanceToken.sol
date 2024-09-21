// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceToken is ERC20, Ownable {
  ERC20 public usdc;
  
  constructor(address initialOwner, ERC20 _usdc) Ownable(initialOwner) ERC20("GovernanceToken", "GT") {
    usdc = _usdc;
  }

  function mint(uint value) external {
    // require(usdc.allowance(msg.sender, address(this)) > value);
    // require(usdc.balanceOf(msg.sender) >= value);
    // require(usdc.transfer(address(this), value));
    _mint(msg.sender, value);
  }
}