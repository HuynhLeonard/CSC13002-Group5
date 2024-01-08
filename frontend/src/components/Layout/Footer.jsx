import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import "../Css/Footer.css";

const Footer = () => {
  return (
    <div className="footer-body">
      <div className="footer-subcribe">
        <div className="footer-title">
          <h2>Subcribe us for get news events and offers</h2>
        </div>
        <div className="footer-form">
          <div className="footer-email">
            <input type="email" placeholder="Enter your email..." />
            <i class="bx bx-envelope"></i>
          </div>
          <div className="footer-submit_btn">
            <Link to="#">Submit</Link>
          </div>
        </div>
      </div>
      <div className="footer-sponsor">
        <div className="footer-info">
          <div className="footer-general">
            <div className="footer-logo"></div>
            Bring all electric devices to the customers
            <div className="footer-icon">
              <i class="bx bxl-facebook-square"></i>
              <i class="bx bxl-twitter"></i>
              <i class="bx bxl-instagram"></i>
              <i class="bx bxl-tiktok"></i>
              <i class="bx bxl-meta"></i>
            </div>
          </div>
          <div className="footer-company">
            <div className="footer-sponsor_title">Company</div>
            <span>About us</span>
            <span>Careers</span>
            <span>Store Locations</span>
            <span>Our Blog</span>
            <span>Reviews</span>
          </div>
          <div className="footer-shop">
            <div className="footer-sponsor_title">Shop</div>
            <span>Games & Videos</span>
            <span>Phones & Tablets</span>
            <span>Computers & Laptops</span>
            <span>Sport Watches</span>
            <span>Events</span>
          </div>
          <div className="footer-support">
            <div className="footer-sponsor_title">Support</div>
            <span>FAQ</span>
            <span>Reviews</span>
            <span>Contact Us</span>
            <span>Shipping</span>
            <span>Live chat</span>
          </div>
        </div>
        <div className="footer-brand">
          <span>&copy; 2023 Becodemy. All rights reversed</span>
          <span>Term Privacy</span>
          <div className="footer-brand_image">
            <i class="bx bx-credit-card"></i>
            <i class="bx bxl-stripe"></i>
            <i class="bx bxl-paypal"></i>
            <i class="bx bxl-visa"></i>
            <i class="bx bxl-mastercard"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
