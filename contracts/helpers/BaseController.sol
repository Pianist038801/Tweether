// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import './Owned.sol';

contract BaseController is Owned {
   // The Contract Manager's address
  address managerAddr;

  function setManagerAddr(address _managerAddr) public onlyOwner {
    managerAddr = _managerAddr; 
  }

}