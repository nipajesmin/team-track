import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
//import john from '../../../../public/john.jpg'
const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
    
      const testimonials = [
        {
          name: "John Doe",
          feedback:
            "TeamTrack has significantly improved the way we manage our team. The workflow tracking feature is a game-changer!",
        },
        {
          name: "Jane Smith",
          feedback:
            "The platform is intuitive and easy to use. It has streamlined our HR processes and made payroll management seamless.",
        },
        {
          name: "Michael Johnson",
          feedback:
            "I highly recommend TeamTrack to any organization looking to improve team collaboration and productivity.",
        },
        {
          name: "Emily Brown",
          feedback:
            "The support team is outstanding! They helped us get started quickly and answered all our questions.",
        },
        {
          name: "David Wilson",
          feedback:
            "TeamTrack has been a fantastic addition to our company. It’s helped us stay organized and on top of our goals.",
        },
      ];
    return (
        <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Hear what our clients have to say about us.
          </p>
        </div>

        {/* Testimonials Slider */}
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold text-gray-800">
                "{testimonial.feedback}"
              </p>
              <p className="mt-4 text-sm text-gray-600">- {testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
    );
};

export default Testimonials;