import React from 'react';
import Header from './Header';
import Service from './Service';
import Testimonials from './Testimonials';
import Features from './Features';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Service></Service>
            <Features></Features>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;