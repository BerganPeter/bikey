import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <h2>Bikey Bikes</h2> 
            <h3>Shift gears  <br />and ride your dreams!</h3> 
            <Link className="btn" to="/bikes">View All Bikes</Link> 
        </section>
    )
}

export default Hero
