import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-white tracking-tight">
            Kin<span className="text-[#14ae5c]">bech</span>
          </span>
          <p className="text-sm text-gray-400 leading-relaxed">
            Nepal's trusted marketplace for buying and selling second-hand goods.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#14ae5c] transition-colors"
              aria-label="Facebook"
            >
              <BsFacebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#14ae5c] transition-colors"
              aria-label="Instagram"
            >
              <BsInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#14ae5c] transition-colors"
              aria-label="Twitter"
            >
              <BsTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-[#14ae5c] transition-colors"
              aria-label="LinkedIn"
            >
              <BsLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Company column */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Company
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <Link to="/aboutus" className="text-gray-400 hover:text-[#14ae5c] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="text-gray-400 hover:text-[#14ae5c] transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <span className="text-gray-500 cursor-default">Advertise With Us</span>
            </li>
          </ul>
        </div>

        {/* Categories column */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Categories
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li>Mobile Phone</li>
            <li>Laptop</li>
            <li>Motorcycle</li>
            <li>Car</li>
            <li>Gaming</li>
            <li>Home Appliance</li>
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li>
              <span className="block text-gray-500 text-xs mb-0.5">Phone</span>
              +977-9841446187
            </li>
            <li>
              <span className="block text-gray-500 text-xs mb-0.5">Email</span>
              info@pheri-kinney.com
            </li>
            <li>
              <span className="block text-gray-500 text-xs mb-0.5">Address</span>
              Kupondole, Lalitpur
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-6 py-5">
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Kinbech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
