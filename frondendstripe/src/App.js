import {react, useState} from "react"
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"



function App() {

const [product, setProduct] = useState({
  name: "Buy React Course",
  price: 100,
  owner: "Facebook"
}) 

const makePayment = token => {
    const body = {
      token, product
    }
    const headers = {
      "Content-Type": "application/json"
    }


    return  fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      console.log("Response", response)
      const {status} = response;
      console.log("STATUS", status)
    })
    .catch( error => console.log(error))
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
         {/* will get the token data from stripe itself */}
        <StripeCheckout token={makePayment}
         stripeKey="pk_test_51KCl35LQEQiazbNKozAwfKs6iGKRQlxqi6Xors3k7tF7o6qfdHqjXoKQBk0M2llh2e24dtu5Tmi9M44wBn1MLZC900yMuEp2DO"
         name={product.name} shippingAddress billingAddress  >
          <button className="btn btn-md blue">Buy now in {product.price}$</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
