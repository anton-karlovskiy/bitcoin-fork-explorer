//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";

struct Chain {
    uint start_height;
    uint current_height;
    bytes32 best_block_hash;
    uint chain_id;
}

contract Relay {
    // chain at position 0 is the main chain, others are forks
    mapping (uint => Chain) chains;
    // maxium chain id
    uint chain_ids;

    constructor {

    }


  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
