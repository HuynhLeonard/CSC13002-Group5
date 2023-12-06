import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // create form data
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);

    axios
      .post("http://localhost:8000/api/user/getuser", newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="body">
      <div className="wrapper">
        <div className="content">
          <div className="title">
            <h1>Shop register</h1>
            <div className="logo"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="name">
              <i class="bx bx-user"></i>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span>Shop name</span>
            </div>

            <div className="phone-number">
              <i class="bx bxs-phone"></i>
              <input
                type="text"
                name="phone-number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <span>Phone number</span>
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

            <div className="address">
              <i class="bx bxs-home"></i>
              <input
                type="text"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span>Address</span>
            </div>

            <div className="code">
              <i class="bx bx-barcode-reader"></i>
              <input
                type="number"
                name="zipcode"
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <span>Zip code</span>
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
              <span>
                {avatar ? (
                  <img src={URL.createObjectURL(avatar)} alt="avatar" />
                ) : (
                  <RxAvatar />
                )}
              </span>
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
            <Link to="/shop-login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
