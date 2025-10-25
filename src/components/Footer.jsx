import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdWork, MdEmail } from "react-icons/md";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="jb-footer"
    >
      <div className="jb-footer-container">
        {/* Brand */}
        <div className="jb-footer-section">
          <h2 className="jb-footer-logo">JobBuddy</h2>
          <p className="jb-footer-text">
            Connecting you with the best opportunities across the globe. <br />
            Empower your career with smart job recommendations and growth insights.
          </p>
        </div>

        {/* Quick Links */}
        <div className="jb-footer-section">
          <h3 className="jb-footer-title">Quick Links</h3>
          <ul className="jb-footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/jobs">Browse Jobs</a></li>
            <li><a href="/companies">Companies</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="jb-footer-section">
          <h3 className="jb-footer-title">Contact</h3>
          <ul className="jb-footer-contact">
            <li><MdEmail className="jb-footer-icon" /> support@jobbuddy.com</li>
            <li><MdWork className="jb-footer-icon" /> Careers: hr@jobbuddy.com</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="jb-footer-section">
          <h3 className="jb-footer-title">Follow Us</h3>
          <div className="jb-footer-socials">
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaGithub /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="jb-footer-bottom">
        © {new Date().getFullYear()} JobBuddy. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
