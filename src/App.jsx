import './App.css'
import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from "react";



function App() {

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  console.log("👋 Address:", address)

  // initialize editionDrop contract
  const editionDrop = useEditionDrop("0xcdC29385f3E39f9C6E3c752fD06bAaaceeAac611")

  // state variable to know if user has our NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)

  // isClaiming lets us easily keep a loading state while NFT is minting
  const [isClaiming, setIsClaiming] = useState(false)

  useEffect(() => {
    // if they don't have connected wallet yet, then exit
    if (!address) {
      return;
    }
    
    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0)
        if (balance.gt(0)) {
          // why does this have a setter function? Shouldn't useEffect change a state variable?
          setHasClaimedNFT(true)
          console.log("🌟 this user has a membership NFT!")
        } else {
          setHasClaimedNFT(false)
          console.log("😭 this user doesn't have a membership NFT.")
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error)
      }
    }

    checkBalance()

  }, [address, editionDrop])

  const mintNFT = async () => {
    try {
      setIsClaiming(true)
      await editionDrop.claim("0", 1)
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/goerli/${editionDrop.getAddress()}/0`)
      setHasClaimedNFT(true)
    } catch (error) {
      setHasClaimedNFT(false)
      console.error("Failed to mint NFT", error)
    } finally {
      setIsClaiming(false)
    }
  }

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to VirtualLabsDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div>
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    )
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={mintNFT}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  )
}

export default App
