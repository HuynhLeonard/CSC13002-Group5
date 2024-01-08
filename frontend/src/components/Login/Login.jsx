import React, { useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../Css/User-login.css";

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
    <div className="user-log-body">
      <div className="user-log-wrapper">
        <div className="user-log-content">
          <div className="user-log-title">
            <h1>User login</h1>
            <div className="user-log-logo"></div>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="user-log-email">
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
            <div className="user-log-password">
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
                  className="user-log-eye"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="user-log-eye"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
              <span>Password</span>
            </div>
            <div className="user-log-function">
              <div className="user-log-remember">
                <input type="checkbox" name="remember-me" id="remember-me" />
                <label for="remember-me">Remember me</label>
              </div>
              <div className="user-log-forgot">
                <a href=".forgot-password">Forgot your password?</a>
              </div>
            </div>
            <div className="user-log-submit">
              <input type="submit" value="Log in"></input>
            </div>
          </form>
          <div className="user-log-sign-up">
            <h4>Not have any account?</h4>
            <Link to="/sign-up"> Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
