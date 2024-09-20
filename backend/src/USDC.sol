// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDC is ERC20, Ownable {
  constructor(address initialOwner) Ownable(initialOwner) ERC20("USDC", "USDC") {
    _setupDecimals(6);
    _mint(initialOwner, type(uint).max);
  }
}