import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BikeContext } from "../context/bikes"; 
import { CartContext } from "../context/cart";

const BikeDetails = () => { 
  const { id } = useParams();
  const history = useHistory();
  const { bikes } = useContext(BikeContext); 
  const { addToCart } = useContext(CartContext);

  const bike = bikes.find((bike) => { 
    return bike.id === id; 
  });
  if (!bike) {
    return <h3>Loading...</h3>;
  }

  const { image: url, name, description, maker, price } = bike; 

  return (
    <section className="bike-details"> 
      <div className="detail-image">
        <img src={url} alt={name} /> 
      </div>
      <div className="detail-description">
        <h2>{name}</h2> 
        <p>{description}</p>
        <h3>{maker}</h3> 
        <h4>Price - $ {price}</h4>
        <button
          className="btn"
          onClick={() => {
            addToCart({ ...bike, id }); 
            history.push("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default BikeDetails; 
