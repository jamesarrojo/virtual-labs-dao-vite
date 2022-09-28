import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

import dotenv from "dotenv"
dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const QUICKNODE_API_URL = process.env.QUICKNODE_API_URL
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL

// check if .env is working
if (!PRIVATE_KEY || PRIVATE_KEY === "") {
    console.log("🛑 Private key not found.")
}

if (!ALCHEMY_API_URL || ALCHEMY_API_URL === "") {
    console.log("🛑 QuickNode API URL not found.")
}

if (!WALLET_ADDRESS || WALLET_ADDRESS === "") {
    console.log("🛑 Wallet Address not found.")
}

// RPC url
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_URL)
// wallet private keys
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
const sdk = new ThirdwebSDK(wallet);

(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log("SDK initialized by address:", address)
    } catch (err) {
        console.error("Failed to get apps from the sdk", err)
        process.exit(1)
    }
})();

export default sdk