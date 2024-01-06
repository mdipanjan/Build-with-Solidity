const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Base Contract", function () {
    let Base;
    let base;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Base = await ethers.getContractFactory("Base");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // Deploy a new Base contract before each test.
        base = await Base.deploy(1000); // Assuming 1000 is the initial supply.

        // Set uniswapV2Pair to a non-zero address to simulate trading started
        const uniswapV2PairAddress = addr1.address; // using addr1 for simulation
        await base.setRestrictions(false, uniswapV2PairAddress, 0, 0); // assuming these are the intended parameters
        
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await base.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await base.balanceOf(owner.address);
            expect(await base.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer 50 tokens from owner to addr1
            await base.transfer(addr1.address, 50);
            const addr1Balance = await base.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 tokens from addr1 to addr2
            await base.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await base.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await base.balanceOf(owner.address);

            // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
            // `require` will evaluate false and revert the transaction.
            await expect(
                base.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await base.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });

        it("Should update balances after transfers", async function () {
            const initialOwnerBalance = await base.balanceOf(owner.address);

            // Transfer 100 tokens from owner to addr1.
            await base.transfer(addr1.address, 100);

            // Transfer another 50 tokens from owner to addr2.
            await base.transfer(addr2.address, 50);

            // Check balances.
            // const finalOwnerBalance = await base.balanceOf(owner.address);
            // const amountToSubtract = ethers.BigNumber.from(150);
            // const newBalance = initialOwnerBalance.sub(amountToSubtract);
            // expect(finalOwnerBalance).to.equal(newBalance);

            const addr1Balance = await base.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await base.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });
    });

    // Add more tests for blacklisting, burning tokens, and setting restrictions
});

