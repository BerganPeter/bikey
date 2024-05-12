import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { BikeContext } from '../context/bikes'; 

const Bikes = () => { 
    const { bikes } = useContext(BikeContext); 

    if (!bikes.length) { 
        return <h3>No Bikes Available</h3> 
    }

    return (
        <section className="bikes"> 
            {bikes.map(({ image, id, name }) => ( 
                <article key={id} className="bike"> 
                    <div className="bike-image"> 
                        <img src={image} alt={name} /> 
                    </div>
                    <Link to={`bikes/${id}`} className="btn bike-link">details</Link> 
                </article>
            ))}
        </section>
    )
}

export default Bikes 
