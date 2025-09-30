const { ethers, fhevm } = require("hardhat");
const { expect } = require("chai");

describe("FHELending", function () {
  it("should store encrypted balance", async function () {
    const [alice] = await ethers.getSigners();

    // Deploy contract
    const FHELending = await ethers.getContractFactory("FHELending");
    const contract = await FHELending.deploy();
    await contract.deployed();

    // ✅ Create encrypted input
    const input = fhevm.createEncryptedInput(contract.address, alice.address);
    input.add64(1000); // Encrypt 1000 tokens
    const encrypted = await input.encrypt();

    // ✅ Call contract with ciphertext
    const tx = await contract.connect(alice).submitEncryptedBalance(encrypted.handles[0]);
    await tx.wait();

    // ✅ Fetch encrypted balance (still ciphertext)
    const encryptedBalance = await contract.getEncryptedBalance(alice.address);
    expect(encryptedBalance).to.not.equal("0x");
    console.log("Encrypted balance stored:", encryptedBalance);
  });
});
