import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <h2>Wisdom Bikes</h2> 
            <h3>A room without bikes is like a <br />body without a soul</h3> 
            <Link className="btn" to="/bikes">View All Bikes</Link> 
        </section>
    )
}

export default Hero
