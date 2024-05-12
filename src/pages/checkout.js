import React , { useContext  }from 'react'
import { Authenticator , withAuthenticator,useAuthenticator} from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../context/cart";



const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51P7gygFCr6GckJajZKbCElO9fa6c1AkaWOK1IDBlGlRaWjbjmIxSC3zOOmCtJo3pS18zzbv7rkhFpK1KjZOXYJHK00UgiQAHSw');
    const { cart, total } = useContext(CartContext); 
    const { user, signOut } = useAuthenticator((context) => [context.user]);

    return (
        <section className="checkout-wrapper">
            <Authenticator > 
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Welcome, {user.username}!
                        <button onClick={signOut}>Sign Out</button>
                        </h2>
                        <h2>Time to Checkout</h2>
                        <div className="cart-wrapper">
                            {cart.map(({ id, name, price, image, amount }) => ( 
                                <article key={id} className="cart-item">
                                    <div className="image">
                                        <img src={image} alt="cart item" />
                                    </div>
                                    <div className="details">
                                        <p>{name}</p> 
                                        <p>$ {price}</p>
                                    </div>
                                    <div className="amount">
                                        <p>{amount}</p>
                                    </div>
                                </article>
                                ))}
                            </div>
                            <div>
                                <h3>Total: $ {total}</h3>
                            </div>
                        <CheckoutForm />
                    </section>
                </Elements>
            </Authenticator> 
        </section>
    )
}

export default withAuthenticator(Checkout)
