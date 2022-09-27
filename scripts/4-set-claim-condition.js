import sdk from "./1-initialize-sdk.js"
import { MaxUint256 } from "@ethersproject/constants"

const editionDrop = sdk.getEditionDrop("0xcdC29385f3E39f9C6E3c752fD06bAaaceeAac611");

(async () => {
    try {
        const claimConditions = [{
            // when people can claim NFTs, which is now
            startTime: new Date(),
            // max no. of NFTs that can be claimed
            maxQuantity: 50_000,
            // the price of our NFT (free)
            price: 0,
            // amount of NFTs people can claim in one transaction
            quantityLimitPerTransaction: 1,
            // we set the wait between transactions to MaxUint256, w/c means
            // people are only allowed to claim once
            waitInSeconds: MaxUint256,

        }]

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!")
    } catch (error) {
        console.log("Failed to set claim condition", error)
    }
})();
