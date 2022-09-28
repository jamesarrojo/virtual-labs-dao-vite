import sdk from "./1-initialize-sdk.js"

// governance contract
const vote = sdk.getVote("0x96Fea157A35478dd81432b9298D350cF420cBAc0");

// ERC-20 contract
const token = sdk.getToken("0x04ECc2353EbAD9bdE351496E2B5B05811Ea6a9b5");

(async () => {
    try {
        // give our treasury the power to mint additional token if needed
        await token.roles.grant("minter", vote.getAddress())

        console.log(
            "Successfully gave vote contract permissions to act on token contract"
        )
    } catch (error) {
        console.error(
            "Failed to grant vote contract permissions on token contract",
            error
        )
        process.exit(1)
    }

    try {
        // grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await token.balanceOf(
            process.env.WALLET_ADDRESS
        )

        // grab 90% of the supply that we hold
        const ownedAmount = ownedTokenBalance.displayValue
        const percent90 = Number(ownedAmount) / 100 * 90;

        // transfer 90% of the supply to our voting contract
        await token.transfer(
            vote.getAddress(),
            percent90
        )

        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract")
    } catch (error) {
        console.error("Failed to transfer tokens to vote contract", err)
    }
})();