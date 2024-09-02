import "./Login.scss";
import { toast } from "react-toastify";
import { PiArrowRightBold } from "react-icons/pi";
import { ImSpinner2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";

function Register({ ...poprs }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
    //valide
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    setIsLoading(true);

    //submit
    let res = await postRegister(email, userName, password);
    console.log("api register>>", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setEmail("");
      setPassword("");
      setUserName("");
      setIsLoading(false);

      navigate("/login");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-Wrapper">
      <div className="login-content register">
        <h4 className="login-title">Sign up</h4>
        <div className="login-form">
          <label className="login-label">Email address</label>
          <input
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-label">Username</label>
          <input
            className="login-input"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="login-label">Set password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="login-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="checkbox"
            className="login-check"
            onChange={() => setShowPassword(!showPassword)}
          />
          <span>Show password</span>
        </div>
        <button
          className="login-btn btn btn-success"
          onClick={handleRegister}
          disabled={isLoading}
        >
          Sign up{" "}
          {!isLoading ? (
            <PiArrowRightBold className="icon-style" />
          ) : (
            <ImSpinner2 className="spinner icon-style" />
          )}
        </button>
        <div className="text-center login-sub">or</div>
        <button className="btn btn-outline-success login-btn">
          <FcGoogle className="icon-style" />
          Continue with google
        </button>
        <p className="login-desc">
          Already have an account?
          <span onClick={() => navigate("/login")}> Sign in.</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
