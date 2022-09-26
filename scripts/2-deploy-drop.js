import { AddressZero } from "@ethersproject/constants"
import sdk from "./1-initialize-sdk.js"
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            // collection's name
            name: "VirtualLabsDAO Membership",
            // description for the collection
            description: "A DAO for Virtual Labs employees",
            // image to be held on our NFT
            image: readFileSync("scripts/assets/virtual-labs.png"),
            // address that will receive the proceeds of the nft sale. we're gonna set this to 0x0 because we don't wanna charge for it. however, should I want to charge for it, then I can put my address.
            primary_sale_recipient: AddressZero,
        });

        // returns address of our contract
        const editionDrop = sdk.getEditionDrop(editionDropAddress);

        // get metadata of our contract
        const metadata = await (await editionDrop).metadata.get()

        console.log(
            "✅ Successfully deployed editionDrop contract, address:",
            editionDropAddress,
        )

        console.log("✅ editionDrop metadata:", metadata)
    } catch (error) {
        console.log("failed to deploy editionDrop contract", error)
    }
})();