import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51P7gygFCr6GckJajZKbCElO9fa6c1AkaWOK1IDBlGlRaWjbjmIxSC3zOOmCtJo3pS18zzbv7rkhFpK1KjZOXYJHK00UgiQAHSw');

    return (
        <section className="checkout-wrapper">
            <Authenticator signUpAttributes={['email']}> 
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
            </Authenticator> 
        </section>
    )
}

export default Checkout
