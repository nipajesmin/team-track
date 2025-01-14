import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-4">
      <div className="container mx-auto px-4">

        {/* Website Name and Tagline */}
        <div className="text-center mb-6">
          <h3 className="text-lg md:text-2xl font-bold">
            TeamTrack
          </h3>
          <p className="text-sm md:text-base mt-2">
            Streamline workflows, empower teams, and achieve more together.
          </p>
        </div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          {/* Contact Information */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-base md:text-lg font-semibold">Contact Us</h4>
            <p className="text-sm mt-2">Email: support@teamtrack.com</p>
            <p className="text-sm">Phone: +1 800 987 6543</p>
            <p className="text-sm">Address: 456 Productivity Lane, WorkCity</p>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h4 className="text-base md:text-lg font-semibold">Follow Us</h4>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition text-xl"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition text-xl"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="text-center mt-6">
          <h4 className="text-base md:text-lg font-semibold">Support Hours</h4>
          <p className="text-sm mt-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p className="text-sm">Saturday: 10:00 AM - 4:00 PM</p>
          <p className="text-sm">Sunday: Closed</p>
        </div>

        {/* Copyright Information */}
        <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
          <p>© {new Date().getFullYear()} TeamTrack. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
