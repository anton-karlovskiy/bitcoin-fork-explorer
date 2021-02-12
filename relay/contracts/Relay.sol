//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

import "hardhat/console.sol";

struct Chain {
    // the id of the chain
    uint chain_id;
    // start block height of the chain element
    uint start_height;
    // current block height of the chain element
    uint current_height;
    // current best block hash at the current height
    bytes32 best_block_hash;
    // a mapping of block heights to their hash
    mapping (uint => bytes32) blocks;
}

contract Relay {
    // mapping of all chains
    mapping (uint => Chain) chains;
    // chain at position 0 is the main chain, others are forks
    mapping (uint => uint) sorted_chains;
    // maximum chain id
    uint chain_ids;

    // this function is a vast over-simplification
    function store_block_header(uint block_height , bytes32 block_hash, uint chain_id) public {
        if (chains[chain_id].best_block_hash == 0) {
            // store a new chain element
            Chain storage new_chain = chains[chain_id];
            new_chain.chain_id = chain_id;
            new_chain.start_height= block_height;
            new_chain.current_height = block_height;
            new_chain.best_block_hash = block_hash;
            new_chain.blocks[block_height] = block_hash;
            sorted_chains[chain_ids] = chain_id;
            chain_ids += 1;
        } else {
            Chain storage existing_chain = chains[chain_id];
            existing_chain.current_height = block_height;
            existing_chain.best_block_hash = block_hash;
            existing_chain.blocks[block_height] = block_hash;
        }
    }

    // returns the individual elements of a chain except the blocks
    function get_chain_at_position(uint position) public view returns (uint, uint, uint, bytes32) {
        Chain storage chain = chains[sorted_chains[position]];
        return (chain.chain_id, chain.start_height, chain.current_height, chain.best_block_hash);
    }

    // gets the blocks of a chain
    function get_blocks_for_chain_id(uint id, uint height) public view returns (bytes32) {
        Chain storage chain = chains[id];
        return chain.blocks[height];
    }

    // TODO: could be `get_number_of_chains`
    // gets the highest chain id
    function get_max_chain_id() public view returns (uint) {
        return chain_ids;
    }
}
