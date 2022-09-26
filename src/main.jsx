import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import thirdweb provider and Goerli ChainId
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

// This is the chainId your dApp will work on
const activeChainId = ChainId.Goerli;



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
)
