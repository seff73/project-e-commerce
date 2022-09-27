import React, { useEffect, useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js/';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/router';


export default function PaypalBtn({amount}) {
    const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();
    //let totalAmount = totalPrice
    const [ monto, setMonto ] = useState(totalPrice);

    const router = useRouter();


    const templateParams = {
        user_name: "",
        user_surname: "",
        user_email: "",
        user_item_list: "",
        user_quantity: "",
        user_amount: "",
    }

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
                        amount: monto,
                        quantity: totalQuantities,
                    },
                });

                return res.data.id;

            } catch (error) {
                //router.push('/success');
                console.log(error);
            }
        }}
        onCancel = {data => console.log("Canceled Order")}
        onApprove = {(data, actions) => {
            //console.log(data.payer.email_address);
            actions.order.capture()
            .then(function(orderData) {
                // Successful capture! For dev/demo purposes:
                
                //console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee your email for all available details`);


                templateParams.user_name = orderData.payer.name.given_name;
                templateParams.user_surname = orderData.payer.name.surname;
                templateParams.user_email = orderData.payer.email_address;
                templateParams.user_item_list = JSON.stringify(cartItems.map((item) => item.name + " x " + item.quantity));
                templateParams.user_amount = totalPrice;
                templateParams.user_transaction_status = transaction.status;
                templateParams.user_transaction_id = transaction.id
                templateParams.user_quantity = totalQuantities;

                emailjs.send('service_zilmxnm', 'template_mdmmlhg', templateParams, 'k-w62nZD0xoIwA9Qn')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    console.log('FAILED...', error);
                });
                //actions.redirect('http://localhost:3000/success');
                setShowCart(false);
                router.push('/success');
            });
        }}
        style={{ layout: "horizontal", color: "blue" }} />
    :false}
    </div>
  )
}
