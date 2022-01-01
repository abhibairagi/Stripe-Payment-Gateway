const cors = require("cors")
const express = require("express")
//SECRET KEY ALL Goes to Backend 
const stripe = require("stripe")("sk_test_51KCl35LQEQiazbNKjAe1jl8JywV034gEsv6vx6sYAaiChvcwpT6hYbrj1NCnINsJ9hjlro3jCTiOgxupVaZVDy2000DHgWpGiZ")
const uuid  = require("uuid")
const app = express();

///Middlewares
app.use(express.json())
app.use(cors());


//Routes
app.get("/", (req,res)=> {
    res.send("It works at LEarn code online ")
})


app.post("/payment", (req, res) => {
    const {product, token} = req.body 
    console.log("Product", product)
    console.log("PRICE", product.price)

    //we create this key we really don't need to charge the customer twice for same product 
    const idempontencyKey = uuid()

        // Creating a Customer
    return stripe.customers.create({
        email: token.email,
        source: token.id 
        //If we get  the customer will grab all the details  
    }).then( customer => {
        stripe.charges.create({
            // Getting the price in cents i.e multiply with dollars 
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address.country,
                }
            }
        }, {idempontencyKey})
    })
    // will get the result 
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

//Port 

app.listen(8282, () => {
    console.log("Port is up and running") 
})


 
