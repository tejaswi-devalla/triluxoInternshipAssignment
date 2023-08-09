import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

  const onSubmitRegisterForm = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/register";
    if (password === confirmPass && password !== "") {
      const userDetails = { username, password };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok === true) {
        setErrorMsg(data.message);
        setSubmitError(true);
        setUsername("");
        setPassword("");
        setConfirmPass("");
      }
    } else {
      setErrorMsg("Please Enter Correct Credentials");
      setSubmitError(true);
      setUsername("");
      setPassword("");
      setConfirmPass("");
    }
  };

  const onClickLoginBtn = () => {
    navigate("/");
  };

  return (
    <div className="bg-color">
      <button type="button" className="register-btn" onClick={onClickLoginBtn}>
        Login
      </button>
      <div className="inside-cont">
        <form
          className="login-cont"
          onSubmit={(event) => onSubmitRegisterForm(event)}
        >
          <h1 className="login">Register</h1>
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
              onChange={(event) => setUsername(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-cont">
            <label htmlFor="confirmPassword" className="text">
              Confirm Password
            </label>
            <input
              value={confirmPass}
              id="confirmPassword"
              type="password"
              placeholder="Enter Password Again"
              className="input"
              onChange={(event) => setConfirmPass(event.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Register
          </button>
          {submitError ? <p className="error">{errorMsg}</p> : ""}
        </form>
      </div>
    </div>
  );
};
export default Register;
