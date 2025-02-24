import React from 'react';
import Header from './Header';
import Service from './Service';
import Testimonials from './Testimonials';
import Features from './Features';
import WhyChooseUs from './WhyChooseUs';
import SuccessStories from './SuccessStories';
import PricingPlans from './PricingPlans';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Service></Service>
            <Features></Features>
            <WhyChooseUs></WhyChooseUs>
            <SuccessStories></SuccessStories>
            <PricingPlans></PricingPlans>
            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;