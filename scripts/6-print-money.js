import sdk from "./1-initialize-sdk.js";

// $VLT token address
const token = sdk.getToken("0x04ECc2353EbAD9bdE351496E2B5B05811Ea6a9b5");

(async () => {
    try {
        // max supply
        const amount = 1_000_000
        // interact with deployed ERC-20 contract and mint tokens
        await token.mint(amount);
        const totalSupply = await token.totalSupply()

        // print out how many of our tokens are out there now
        console.log("✅ There now is", totalSupply.displayValue, "$VLT in circulation")
    } catch (error) {
        console.error("Failed to print money", error)
    }
})();