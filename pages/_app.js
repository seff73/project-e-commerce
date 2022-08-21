import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Layout } from '../components';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <PayPalScriptProvider options={{ "client-id": "AZ9T7Kt9-snBWcstuinejrsrizouOLoVgwvEDPqSDykkc6EPzg9Bpu9AzgYncZ313v1QqAWCh5-Q5Fo9" }}>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </PayPalScriptProvider>
  )
}

export default MyApp
