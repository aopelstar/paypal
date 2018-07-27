const express = require('express');
const bodyParser = require('body-parser'),
    cors = require('cors'),
    paypal = require('paypal-rest-sdk');
    require('dotenv').config()

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET
      });
    const app = express();
    app.use( bodyParser.json() );
    app.use( cors() );

      app.post('/api/pay', (req, res) =>{
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "8.00",
                        "currency": "USD",
                        "quantity": 2
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                },
                "description": "whatevs."
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
                res.send('success')
            }
        });
      })


    const port = 3333;
    app.listen(port, ()=>{
        console.log('listening on port 3333')
    })