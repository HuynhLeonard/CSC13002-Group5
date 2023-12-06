import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
// import {server} from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import "../Css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/api/user/login-user",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error("Error happen!");
      });
  };

  return (
    <div className="body">
      <div className="wrapper">
        <div className="content">
          <div className="title">
            <h1>User login</h1>
            <div className="logo"></div>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="email">
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
            <div className="password">
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
                  className="eye"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="eye"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
              <span>Password</span>
            </div>
            <div className="function">
              <div className="remember">
                <input type="checkbox" name="remember-me" id="remember-me" />
                <label for="remember-me">Remember me</label>
              </div>
              <div className="forgot">
                <a href=".forgot-password">Forgot your password?</a>
              </div>
            </div>
            <div className="submit">
              <input type="submit" value="Log in"></input>
            </div>
          </form>
          <div className="sign-up">
            <h4>Not have any account?</h4>
            <Link to="/sign-up" className="text-blue-600 pl-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
