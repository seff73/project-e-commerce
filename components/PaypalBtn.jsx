import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js/';
import axios from 'axios';


export default function PaypalBtn() {
  return (
    <div>
        <PayPalButtons createOrder={async () => {
            try {
                const res = await axios({
                    url: "localhost:3000/api/payment",
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    }
                });
                return res.data.id;
            } catch (error) {
                console.log(error);
            }
        }}
        onCancel = {data => console.log("Canceled Order")}
        onApprove = {(data, actions) => {
            console.log(data);
            actions.order.capture();
        }}
        style={{ layout: "horizontal", color: "blue" }} />
    </div>
  )
}
