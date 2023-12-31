import { React, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";
import "../Css/Shop-login.css";

const ShopLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:8000/api/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="shop-log-body">
      <div className="shop-log-wrapper">
        <div className="shop-log-content">
          <div className="shop-log-title">
            <h1>Shop login</h1>
            <div className="shop-log-logo"></div>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="shop-log-email">
              <i class="bx bx-envelope"></i>
              <input
                type="email"
                name="email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
            </div>
            <div className="shop-log-password">
              <i class="bx bx-lock-open-alt"></i>
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {visible ? (
                <AiOutlineEye
                  className="shop-log-eye"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="shop-log-eye"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
              <span>Password</span>
            </div>
            <div className="shop-log-function">
              <div className="shop-log-remember">
                <input type="checkbox" name="remember-me" id="remember-me" />
                <label for="remember-me">Remember me</label>
              </div>
              <div className="shop-log-forgot">
                <a href=".forgot-password">Forgot your password?</a>
              </div>
            </div>
            <div className="shop-log-submit">
              <input type="submit" value="Log in"></input>
            </div>
          </form>
          <div className="shop-log-sign-up">
            <h4>Not have any account?</h4>
            <Link to="/shop-create" className="text-blue-600 pl-2">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;