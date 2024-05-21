import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BikeContext } from "../context/bikes"; 
import { CartContext } from "../context/cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { checkout } = useContext(BikeContext); 
  const [orderDetails, setOrderDetails] = useState({ cart, total, address: null, token: null });
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  


  useEffect(() => {
    if (orderDetails.token) {
      checkout(orderDetails);
      clearCart();
      history.push("/");
    }
  }, [orderDetails,checkout,clearCart,history]);

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleAddressChange = () => {
    const fullAddress = `${country}, ${city}, ${zip}, ${address}`;
    setOrderDetails({ ...orderDetails, address: fullAddress });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      setError(result.error.message);
    } else {
      setError(null);
      const token = result.token;
      setOrderDetails({ ...orderDetails, token: token.id });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form" >
      <div className="address-container" >
        <label htmlFor="checkout-country">Country</label>
        <input
          id="checkout-country"
          type="text"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            handleAddressChange();
          }}
        />
        
        <label htmlFor="checkout-city">City</label>
        <input
          id="checkout-city"
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            handleAddressChange();
          }}
        />

        <label htmlFor="checkout-zip">ZIP</label>
        <input
          id="checkout-zip"
          type="text"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
            handleAddressChange();
          }}
        />
      </div>
      <div className="address-container" >
        <label htmlFor="checkout-address">Address</label>
        <input
          id="checkout-address"
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            handleAddressChange();
          }}
        />
        </div>
        <div className="stripe-section">
          <label htmlFor="stripe-element"> Credit or debit card </label>
          <CardElement id="stripe-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
        </div>
        <div className="card-errors" role="alert">
          {error}
        </div>
      <button  type="submit" className="btn">
        Submit Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
