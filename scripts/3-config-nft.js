import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xcdC29385f3E39f9C6E3c752fD06bAaaceeAac611");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Virtual Labs Badge",
        description: "This NFT will give you access to VirtualLabsDAO!",
        image: readFileSync("scripts/assets/virtual-labs-logo.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();