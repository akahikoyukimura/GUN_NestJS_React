import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components";
import Alert from "../components/Alert";
import Toast from "../components/Toast";
import { TOAST_TYPES } from "../constants/toastTypes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          pass,
        }),
      });

      const data = await response.json();

      console.log("td--------------", data);
      console.log("t--------------", response);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("access_token", data.access_token);

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/about");
    } catch (error) {
      // setError("Server error");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="login">
        <Toast type={TOAST_TYPES.ERROR} message={error} />

        <div className="pt-5 pb-5">
          <div className="container box col-md-6 col-lg-5 col-sm-8 pt-3 pb-3 custom-bb">
            <h1 className="text-center title">Welcome</h1>
            <p className=" text-center">Please log in to continue</p>
            <div className="text-center">
              <img
                src="./assets/logo.png"
                alt="Logo"
                className="img-fluid logo"
              />
            </div>
            <div className="row my-4">
              <div className="col-md-8 col-lg-8 col-sm-8 mx-auto">
                <form onSubmit={HandleLogin} className="text-center">
                  <div className="my-3">
                    <div className="input-group flex-nowrap c-input-group">
                      <span className="input-group-text input-icon">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        placeholder="Email ID "
                        className="input"
                        name="text"
                        type="text"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="floatingInput"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="input-group flex-nowrap c-input-group">
                      <span className="input-group-text input-icon">
                        <i className="bi bi-key-fill"></i>
                      </span>
                      <input
                        placeholder="Password"
                        className="input"
                        name="text"
                        type={showPassword ? "text" : "password"}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        id="floatingPassword"
                      ></input>
                      <i
                        className={`px-2 input-icon bi ${
                          showPassword ? "bi-eye-slash-fill" : "bi-eye-fill  "
                        } password-toggle`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        name="rememberMe"
                        className="c-checkbox"
                      />

                      <label htmlFor="rememberMe" className="ms-1 mt-2">
                        Remember me
                      </label>
                    </div>

                    <a
                      className="text-decoration-none text-reset fst-italic"
                      href="/term.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="my-3">
                    <p>
                      Don't have an account yet?{" "}
                      <Link
                        to="/register"
                        className="text-decoration-underline text-info"
                      >
                        Sign up
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="text-center">
                    <button className="my-2 mx-auto btn btn-dark" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="custom-text-italic text-center ">
              By continuing, you agree to our Terms of Use and acknowledge that
              :
            </p>
            <p className="custom-text-italic text-center mx-5">
              You are responsible for keeping your account credentials secure.
              All purchases must comply with our regulations. Product
              availability, prices, and information may change without notice.
              You agree to use this website.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
