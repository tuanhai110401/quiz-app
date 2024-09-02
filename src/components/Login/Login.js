import "./Login.scss";
import { toast } from "react-toastify";
import { PiArrowRightBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { postLogin } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserLoginSuccess } from "../../redux/actions/userAction";

function Login({ ...poprs }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    //valide
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }
    setIsLoading(true);
    //submit
    let res = await postLogin(email, password);
    console.log("api login>>", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(fetchUserLoginSuccess(res.DT));
      setIsLoading(false);
      navigate("/");
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-Wrapper">
      <div className="login-content">
        <h4 className="login-title">Sign in</h4>
        <div className="login-form">
          <label className="login-label">Email address</label>
          <input
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleLogin}
          disabled={isLoading}
        >
          Sign in
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
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Create new one.</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
