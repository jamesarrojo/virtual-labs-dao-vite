import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x04ECc2353EbAD9bdE351496E2B5B05811Ea6a9b5");

(async () => {
    try {
        // log the current roles
        const allRoles = await token.roles.getAll()

        console.log("👀 Roles that exist right now:", allRoles)

        // revoke all the superpowers your wallet had over the ERC-20 contract
        await token.roles.setAll({ admin: [], minter: [] })
        console.log(
            "🎉 Roles after revoking ourselves",
            await token.roles.getAll()
        )
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract")

    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasury", error)
    }
})();