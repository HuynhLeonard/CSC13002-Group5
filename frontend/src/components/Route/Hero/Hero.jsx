import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          // "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
          // "url(https://mac-repairs-service.uk/wp-content/uploads/2015/08/MacBook-repais-banner.jpg)"
          "url(https://my-files.apjonlinecdn.com/landingpages/family-pages/z-by-hp/images/w100_grahics.png)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] ml-40`}>
        <h1
          className={`text-[30px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> Technology Devices
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba] w-[50%]">
          Get the chance to approach all the latest technology devices with the
          cheapest price which ever existed
          <br />
          Don't be late and add new items to your cart now !!!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
