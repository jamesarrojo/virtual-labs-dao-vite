import './App.css'
import { useAddress, useMetamask } from '@thirdweb-dev/react';


function App() {

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  console.log("👋 Address:", address)

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

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  )
}

export default App
