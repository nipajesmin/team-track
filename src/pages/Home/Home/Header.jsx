import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import slide1 from '../../../../public/slide1.jpg'
import slide2 from '../../../../public/slide2.jpg'
import slide3 from '../../../../public/slide3.jpg'

const Header = () => {
    // Slideshow settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <header className="bg-violet-900 text-white py-12 px-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Left Side: Slideshow */}
                <div className="w-full md:w-1/2">
                    <Slider {...settings}>
                        <div>
                            <img
                                src={slide1}
                                alt="Slide 1"
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <img
                                src={slide2}
                                alt="Slide 2"
                                className="rounded-lg"
                            />
                        </div>
                        <div>
                            <img
                                src={slide3}
                                alt="Slide 3"
                                className="rounded-lg"
                            />
                        </div>
                    </Slider>
                </div>

                {/* Right Side: Website Information */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Organize Your Team with <span className="text-yellow-400">TeamTrack</span>
                    </h1>
                    <p className="text-lg mt-4">
                        Manage all your workflows, track employee productivity, and handle HR tasks
                        efficiently—all in one place.
                    </p>
                    {/* <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md mt-6 hover:bg-yellow-500 transition">
                        Live Demo
                    </button> */}
                </div>
            </div>
        </header>
    );
};

export default Header;