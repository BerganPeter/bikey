import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

import { BikeContext } from "../context/bikes"; 

const Home = () => {
    const { featured } = useContext(BikeContext); 
    if (!featured.length) {
        return <h3>No Featured Bikes</h3> 
    }
    return (
        <>
            <Hero />
            <section className="featured">
                <header className="featured-head">
                    <h3>Featured Collection</h3>
                </header>
                <div className="bikes featured-list"> 
                    {featured.map(({ id, image, title }) => (
                        <article key={id} className="bike featured-bike"> 
                            <div className="bike-image"> 
                                <img src={image} alt={title} />
                            </div>
                            <Link to={`bikes/${id}`} className="btn bike-link">details</Link> 
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home;
