import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      // Make a POST request to the login API endpoint
      const response = await fetch("http://localhost:3006/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log("Login successful!");
        // Add your logic here after successful login
        onLogin();
        navigate("/dashboard"); // Redirect to the dashboard or home page after successful login
      } else {
        console.error("Error logging in:", response.statusText);
        // Handle the error accordingly
      }
    } catch (error) {
      console.error("Error logging in");
      // Handle the error accordingly
    }
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
  );
};

export default Login;
