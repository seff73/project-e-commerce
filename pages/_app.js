import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Layout } from '../components';
import { StateContext } from '../context/StateContext';



function MyApp({ Component, pageProps }) {
  return (
    <PayPalScriptProvider options={{ "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}` }}>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </PayPalScriptProvider>
  )
}

export default MyApp
