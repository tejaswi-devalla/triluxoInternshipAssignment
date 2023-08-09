import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

  const onLoginSuccess = (id) => {
    Cookies.set("user_id", id, { expires: 7 });
    navigate("/blog");
  };

  const onLoginFailure = (errorMsg) => {
    setSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const userID = Cookies.get("user_id");
    const url = "http://localhost:8000/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userID}`,
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onLoginSuccess(data.id);
      onChangeUsername("");
      onChangePassword("");
    } else {
      onLoginFailure(data.message);
      onChangeUsername("");
      onChangePassword("");
    }
  };

  const onClickRegisterBtn = () => {
    navigate("/register");
  };

  useEffect(() => {
    const userDetails = Cookies.get("user_id");
    if (userDetails !== undefined) {
      navigate("/blog");
    }
  });

  return (
    <div className="bg-color">
      <button
        type="button"
        className="register-btn"
        onClick={onClickRegisterBtn}
      >
        Register
      </button>
      <div className="inside-cont">
        <form
          className="login-cont"
          onSubmit={(event) => onSubmitLoginForm(event)}
        >
          <h1 className="login">Login</h1>
          <div className="input-cont">
            <label htmlFor="username" className="text">
              Username
            </label>
            <input
              value={username}
              id="username"
              type="text"
              placeholder="Enter Username"
              className="input"
              onChange={(event) => onChangeUsername(event.target.value)}
            />
          </div>
          <div className="input-cont">
            <label htmlFor="password" className="text">
              Password
            </label>
            <input
              value={password}
              id="password"
              type="password"
              placeholder="Enter Password"
              className="input"
              onChange={(event) => onChangePassword(event.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {submitError ? <p className="error">{errorMsg}</p> : ""}
        </form>
      </div>
    </div>
  );
};
export default Login;
