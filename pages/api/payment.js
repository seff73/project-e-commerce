const paypal = require('@paypal/checkout-server-sdk');
  
// Creating an environment
let clientId = `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
let clientSecret = `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);




// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if(req.method === "POST") {
    const request = new paypal.orders.OrdersCreateRequest();
    //console.log(process.env)
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: req.body.amount,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: req.body.amount,
              }
            }
          },
          items: [
            {
              name: "Digital order",
              description: "web service payment",
              unit_amount: {
                currency_code: "USD",
                value: req.body.amount,
              },
              quantity: "1",
            }

          ]
        },
      ],
      application_context: {
        brand_name: "Smart and Sapiens",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        //return_url: "http://localhost:3000",
        //cancel_url: "http://localhost:3000"
      }
    })
    const response = await client.execute(request);
    //console.log(response.result)
    return res.json({id: response.result.id});
  }
}
