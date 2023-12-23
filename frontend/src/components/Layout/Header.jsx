import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./Dropdown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import "../Css/Header.css";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div classNameName="header-body">
      <div className="header-searching">
        <Link to="/">
          <div className="header-logo"></div>
        </Link>
        <div className="header-search_bar">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i class="bx bx-search-alt-2"></i>
          {searchData && searchData.length !== 0 && searchTerm.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-300 shadow-sm-2 z-[9] p-3 left-80 right-96 rounded-2xl">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;

                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`}>
                      <div className="w-100 flex mb-2">
                        <img
                          src={i.image_Url[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[20px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
        <div className="header-become_btn">
          <Link to="/shop-create">Become seller</Link>
        </div>
      </div>
      <div className="header-header">
        <div className="header-category">
          <div className="header-dropdown_select">
            <i class="bx bx-menu-alt-left"></i>
            <span>All Categories</span>
            <i class="bx bxs-down-arrow"></i>
          </div>
          <ul className="header-dropdown_list">
            <Link to="/products?category=Laptop">
              <li className="header-dropdown_item first-child">
                <span className="header-dropdown_text">Laptop</span>
                <i class="bx bx-laptop"></i>
              </li>
            </Link>
            <Link to="/products?category=PC">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">Personal Computer</span>
                <i class="bx bx-desktop"></i>
              </li>
            </Link>
            <Link to="/products?category=Mobile-Phone">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">Mobile Phone</span>
                <i class="bx bx-mobile-alt"></i>
              </li>
            </Link>
            <Link to="/products?category=Ipad-Tablets">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">Ipad and Tablet</span>
                <i class="bx bx-tab"></i>
              </li>
            </Link>
            <Link to="/products?category=LCD-Screen">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">LCD Screen</span>
                <i class="bx bx-devices"></i>
              </li>
            </Link>
            <Link to="/products?category=Headphones-Speaker">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">
                  Headphone and Speaker
                </span>
                <i class="bx bx-headphone"></i>
              </li>
            </Link>
            <Link to="/products?category=Keyboard">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">Keyboard</span>
                <i class="bx bxs-keyboard"></i>
              </li>
            </Link>
            <Link to="/products?category=Mouse">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">Mouse</span>
                <i class="bx bx-mouse-alt"></i>
              </li>
            </Link>
            <Link to="/products?category=Tables-Chairs">
              <li className="header-dropdown_item">
                <span className="header-dropdown_text">Table and chair</span>
                <i class="bx bx-chair"></i>
              </li>
            </Link>
            <Link to="/products?category=Others">
              <li className="header-dropdown_item last-child">
                <span className="header-dropdown_text">Others</span>
                <i class="bx bxs-dashboard"></i>
              </li>
            </Link>
          </ul>
        </div>

        {/* <div className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/best-selling">Best Sellings</Link>
          <Link to="/products">Products</Link>
          <Link to="/events">Events</Link>
          <Link to="/faq">FAQ</Link>
          <div className="header-animation header-start_home"></div>
        </div> */}
        <Navbar active={activeHeading}/>

        <div className="header-icon">
          <div className="header-wishlist">
            <div onClick={() => setOpenWishlist(true)}></div>
            <i class="bx bx-heart"></i>
          </div>

          <div className="header-cart">
            <div onClick={() => setOpenCart(true)}>
              <i class="bx bx-cart"></i>
            </div>
          </div>

          <div className="header-login">
            {isAuthenticated ? (
              <Link to="/profile">
                <img src={`http://localhost:8000/${user.avatar}`} className="w-[35px] h-[35px] rounded-full" alt="" />
              </Link>
            ) : (
              <Link to="/login">
                <i class="bx bx-log-in-circle"></i>
              </Link>
            )}
          </div>

          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
