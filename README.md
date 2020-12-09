# Displaying Bitcoin Forks

Blockchains are actually not chains of blocks, but rather resemble a tree. When one parent block has more than one child block, the chain splits into one main chain and one or more forks.
In this problem, we assume that we have a [BTC Relay](http://btcrelay.org/) deployed on Ethereum that stores a set of Bitcoin blockchains (one main chain and several forks).
Your task is two-fold: First, you will need to add functions to the library to extract the information of chains from the Ethereum smart contract. Second, you will have to display the forks in some way in the UI.

## Task

Forks can happen relatively frequently depending on the blockchain. They are fairly rare in Bitcoin but a relay still needs to handle them. For users, forks pose a risk as well. In case their Bitcoin transaction ends up in a fork, the transaction is not part of the canonical main chain: if the user wants to prove that he/she made a transaction, the user would not be able to do that against the BTC-Relay.

Since this can happen in practice, we would at least let the user know which chains the relay considers as forks. Hence, your task is to extract the chains from the relay smart contract and display them to the user. This question is somewhat open-ended and you can decide where you want to lay your focus.

### Library

On the library, you will have to write a function that provides the chain elements to the UI

- Create a getter that extracts the chain elements from the smart contract
- Sort the chain elements according to their `current_height`
- Return the sorted list of elements to the UI

You can get started in the library

### UI

In the UI, you will have to create one or multiple pages that display the different forks. Ideally, a user can sensibly browse through the block headers. There is already a base suggestion available. Bootstrap is also already included, but feel free to switch to your favorite framework as well.


## Existing Code

There are two sub-projects in this repository:

- `dapp`: includes some boilerplate react code.
- `relay`: includes the smart contract and the outline for the library in `relay/lib`


### Lib

Make sure you have the right [requirements](https://hardhat.org/tutorial/setting-up-the-environment.html) installed for smart contracts on Ethereum.

In one terminal, start your hardhat node:

```bash
cd relay
yarn install
yarn hardhat
```

In another terminal, compile and deploy the contracts as well as creating the typechain interfaces:
```bash
cd relay
yarn build
yarn deploy
```
### UI

To get started on the UI:

```bash
cd dapp
yarn install
yarn start
```
## Requirements and Criteria

You are supposed to solve the task with the following requirements:

* Preferred programming language: TypeScript
* Accepted programming language: TypeSCript, JavaScript

Your solution will be judged based on the following criteria:

* Quality of the code
* Readability of the code
* Tests

## Expected Code

Your final solution should have the following code:

* One or multiple pages displaying the different chains with their blocks
* One or multiple functions in the library that extract the information from the smart contract
