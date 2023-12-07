import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";
import "../Css/User-regis.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; // take the first find, which is also the recent upload
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post("http://localhost:8000/api/user/create-user", newForm, config)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setEmail("");
        setPassword("");
        setAvatar();
        setName("");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };
  return (
    <div className="body">
      <div className="wrapper">
        <div className="content">
          <div className="title">
            <h1>User register</h1>
            <div className="logo"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="name">
              <i class="bx bx-user"></i>
              <input
                type="text"
                name="text"
                autoComplete="off"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>User name</span>
            </div>

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
              <span>Email address</span>
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

            <div className="file">
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
              />
            </div>

            <div className="btn">
              <input type="submit" value="Submit" />
            </div>
          </form>
          <div className="sign-up">
            Already have an count?
            <Link to="/login"> Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
