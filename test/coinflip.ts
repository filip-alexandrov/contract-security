/* eslint-disable */
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import hre from "hardhat";

let ethers = hre.ethers;

describe("Exploit", function () {
  let CoinFlip: ContractFactory;
  let coinflipContract: Contract;

  let Exploit: ContractFactory;
  let exploitContract: Contract;

  before(async function () {
    CoinFlip = await ethers.getContractFactory("CoinFlip");
    coinflipContract = await CoinFlip.deploy();
    await coinflipContract.deployed();

    Exploit = await ethers.getContractFactory("ExploitCoinflip");
    exploitContract = await Exploit.deploy();
    await exploitContract.deployed();
  });
  it("Check block number", async function () {
    const latestBlock = await hre.ethers.provider.getBlock("latest");
  });
  it("Exploit", async function () {
    for (let i = 0; i < 10; i++) {
      await exploitContract.flip(coinflipContract.address);
    }
    console.log(await coinflipContract.consecutiveWins());
  });
});
