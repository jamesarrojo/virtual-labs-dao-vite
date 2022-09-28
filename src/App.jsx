import './App.css'
import { useAddress, useMetamask, useEditionDrop, useToken } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from "react";



function App() {

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  console.log("👋 Address:", address)

  // initialize editionDrop contract
  const editionDrop = useEditionDrop("0xcdC29385f3E39f9C6E3c752fD06bAaaceeAac611")

  // initialize token contract
  const token = useToken("0x04ECc2353EbAD9bdE351496E2B5B05811Ea6a9b5");

  // state variable to know if user has our NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)

  // isClaiming lets us easily keep a loading state while NFT is minting
  const [isClaiming, setIsClaiming] = useState(false)

  // holds the amount of token each member has in state
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);

  // the array holding all of our member address
  const [memberAddresses, setMemberAddresses] = useState([]);

  // truncating the wallet address
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4)
  }

  // this useEffect grabs all the addresses of our members holding our nft
  useEffect(() => {
    if (!hasClaimedNFT) {
      return
    }

    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0)
        setMemberAddresses(memberAddresses);
        console.log("🚀 Members addresses", memberAddresses)
      } catch (error) {
        console.error("Failed to get member list", error)
      }
    }
    getAllAddresses()
  }, [hasClaimedNFT, editionDrop.history])

  // this useEffect grabs the # of token each member holds
  useEffect(() => {
    if (!hasClaimedNFT) {
      return
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances()
        setMemberTokenAmounts(amounts)
        console.log("👜 Amounts", amounts)
      } catch (error) {
        console.error("Failed to get member balances", error)
      }
    }
    getAllBalances()
  }, [hasClaimedNFT, token.history])

  // combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      // We are checking if we are finding the address in the memberTokenAmounts array
      // If we are, we'll return the amount of the token the user has
      // Otherwise. return 0
      const member = memberTokenAmounts?.find(({ holder }) => holder === address)

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      }
    })
  }, [memberAddresses, memberTokenAmounts])

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
        <div>
          <div>
            <h2>Member List</h2>
            <table className='card'>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
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
