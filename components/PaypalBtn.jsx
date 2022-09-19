import React, { useEffect, useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js/';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';


export default function PaypalBtn({amount}) {
    const { totalPrice } = useStateContext();
    //let totalAmount = totalPrice
    const [ monto, setMonto ] = useState(totalPrice)
    useEffect(() => {
        if(totalPrice !== monto) {
            setMonto(totalPrice);
        }
    },[totalPrice, monto])
    
  return (
    <div>
    { monto === totalPrice ? 
        <PayPalButtons createOrder={async () => {
            try {
                const res = await axios({
                    url: "http://localhost:3000/api/payment",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        amount: monto
                    },
                });

                return res.data.id;

            } catch (error) {
                console.log(error);
            }
        }}
        onCancel = {data => console.log("Canceled Order")}
        onApprove = {(data, actions) => {
            //console.log(data.payer.email_address);
            actions.order.capture()
            .then(function(orderData) {
                // Successful capture! For dev/demo purposes:
                console.log(orderData.payer.email_address)
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            });
            //actions.redirect('http://localhost:3000/successPage');
        }}
        style={{ layout: "horizontal", color: "blue" }} />
    :false}
    </div>
  )
}
