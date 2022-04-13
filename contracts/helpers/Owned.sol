// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract Owned {
  address public ownerAddr;

  constructor() public {
    ownerAddr = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == ownerAddr);
    _;
  }

  function transferOwnership(address _newOwner) public onlyOwner {
    require(_newOwner != address(0));

    ownerAddr = _newOwner;
  }
}