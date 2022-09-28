import sdk from "./1-initialize-sdk.js";

// address of our ERC-1155 membership NFT contract
const editionDrop = sdk.getEditionDrop("0xcdC29385f3E39f9C6E3c752fD06bAaaceeAac611");

// address of our ERC-20 token contract
const token = sdk.getToken("0x04ECc2353EbAD9bdE351496E2B5B05811Ea6a9b5");

(async () => {
    try {
        // grab all addresses that own the membership NFT,
        // which has a tokenId of 0
        console.log("HERE")
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
        
        if (walletAddresses.length === 0) {
            console.log(
                "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
            );
            process.exit(0);
        }

        // loop through the array of address
        const airdropTargets = walletAddresses.map((address) => {
            // pick a random # between 1000 and 10000
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // set up the target
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };

            return airdropTarget;
        })

        // call transferBatch on all our airdrop targets
        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();