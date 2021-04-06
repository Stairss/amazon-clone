const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51IdMqYHY8v2y8x9yiGAfhRqUWA84yt1kejJuEfNFqMDK0Bti9p9xEdKbpOOOLTr7ciTShv8iagRYRk59kJZV23le00p9ZFPnJp"
);


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
exports.api = functions.https.onRequest(app);


// http://localhost:5001/clone-ba7cf/us-central1/api/
// firebase emulators:start