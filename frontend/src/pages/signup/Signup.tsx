import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignup = async () => {
    try {
      // Make a POST request to the signup API endpoint
      const response = await fetch("http://localhost:8800/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log("User registered successfully!");
        // Add your logic here after successful registration
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        console.error("Error registering user:", response.statusText);
        // Handle the error accordingly
      }
    } catch (error) {
      console.error("Error registering user");
      // Handle the error accordingly
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="home show">
        <div className="form_container active">
          <form action="#">
            <h2>Signup</h2>
            <div className="input_box">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="uil uil-envelope-alt email"></i>
            </div>
            <div className="input_box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="uil uil-lock password"></i>
              <i
                className="uil uil-eye-slash pw_hide"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <div className="input_box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i className="uil uil-lock password"></i>
              <i
                className="uil uil-eye-slash pw_hide"
                onClick={handleTogglePassword}
              ></i>
            </div>
            {/* role  */}
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
            <button className="button" onClick={handleSignup}>
              Signup Now
            </button>
            <div className="login_signup">
              Already have an account?{" "}
              <a href="#" id="login" onClick={handleLogin}>
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
