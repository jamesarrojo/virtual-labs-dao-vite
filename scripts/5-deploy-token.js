import { AddressZero } from "@ethersproject/constants"
import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        // deploy a standard ERC-20 contract
        const tokenAddress = await sdk.deployer.deployToken({
            // token name
            name: "VirtualLabsDAO Governance Token",
            // token symbol
            symbol: "VLT",
            // address to receive proceeds in case we want to sell tokens
            // because we don't want to sell it, we set it to AddressZero
            primary_sale_recipient: AddressZero,
        })
        console.log(
            "✅ Successfully deployed token module, address:",
            tokenAddress,
        )
    } catch (error) {
        console.error("Failed to deploy token module", error)
    }
})();