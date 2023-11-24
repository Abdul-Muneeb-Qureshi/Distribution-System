import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    // Add your login logic here
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    //new code
    <div className="home show">
      <div className="form_container active">
        <form action="#">
          <h2>Login</h2>
          <div className="input_box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <i className="uil uil-envelope-alt email"></i>
          </div>
          <div className="input_box">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <i className="uil uil-lock password"></i>
            <i className="uil uil-eye-slash pw_hide"></i>
          </div>
          {/* //role */}
          {/* New input field for role */}
          <div className="input_box">
            <i className="uil uil-user role"></i>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter your role"
              required
            />
          </div>
          <div className="option_field">
            <span className="checkbox">
              <input type="checkbox" id="check" />
              <label htmlFor="check">Remember me</label>
            </span>
            <a href="#" className="forgot_pw" onClick={handleForgotPassword}>
              Forgot password?
            </a>
          </div>
          <button className="button" onClick={handleLogin}>
            Login Now
          </button>
          <div className="login_signup">
            Don't have an account?{" "}
            <a href="#" id="signup" onClick={handleSignup}>
              Signup
            </a>
          </div>
        </form>
      </div>
    </div>
    //old cpde
    // <div className="login-container mt-5 pt-5 ">

    //   <h1>Login</h1>
    //   <div className="input-group mt-5 flex items-center">
    //     <i className="fas fa-envelope  text-primary"></i>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Enter your email"
    //       className="custom-input "
    //     />
    //   </div>
    //   <div className="input-group">
    //     <div className="password-input mt-5 flex items-center">
    //       <i className="fas fa-lock  text-primary"></i>
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="Enter your password"
    //         className="custom-input"
    //       />
    //       <i
    //         className={`eye-icon ${showPassword ? "visible" : "hidden"}`}
    //         onClick={handleTogglePassword}
    //       />
    //     </div>
    //   </div>

    //   <div className="forgot-password" onClick={handleForgotPassword}>
    //     Forgot Password?
    //   </div>
    //   <button className="login-button" onClick={handleLogin}>
    //     Login
    //   </button>
    //   <div className="signup-link mt-5" onClick={handleSignup}>
    //     <span style={{ color: "black" }}>Don't have an account?</span> Sign Up
    //   </div>
    // </div>
  );
};

export default Login;
