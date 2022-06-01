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

  let Telephone: ContractFactory;
  let telephoneContract: Contract;

  let Exploit: ContractFactory;
  let exploitContract: Contract;

  before(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();
    Telephone = await ethers.getContractFactory("Telephone");
    telephoneContract = await Telephone.deploy();
    await telephoneContract.deployed();

    Exploit = await ethers.getContractFactory("ExploitTelephone");
    exploitContract = await Exploit.deploy();
    await exploitContract.deployed();
  });
  it("Check block number", async function () {
    const latestBlock = await hre.ethers.provider.getBlock("latest");
  });
  it("Exploit", async function () {
    await exploitContract.changeOwner(telephoneContract.address);

    console.log(await telephoneContract.owner());
    console.log(owner.address);
  });
});
