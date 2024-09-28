import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-mluxlute3r4r.frontegg.com',
  clientId: 'e982c117-47d1-455d-9308-b15c695020de', 
  appId: 'ada83cf8-ef9a-46d8-b0a2-62b52775cfb9'
};

const authOptions = {
    keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

createRoot(document.getElementById('root')).render(
  <FronteggProvider 
  contextOptions={contextOptions} 
  hostedLoginBox={true}
  authOptions={authOptions}>
      <App />
  </FronteggProvider>,
)
