import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
//import { loginImg } from "./assets/1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

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

      // if (!response.ok) {
      //   setError(data.message || "Login failed");
      //   return;
      // }

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
        <div className="container box">
          <div className="">
            <h1 className="text-center title">Welcome</h1>
            <p className=" text-center">Please log in to continue</p>
          </div>
          <hr />
          <div className="text-center">
            <img
              src="./assets/logo.png"
              alt="Logo"
              className="img-fluid logo"
            />
          </div>
          <div class="row my-4 h-100">
            <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
              <form onSubmit={HandleLogin} className="text-center">
                <div class="my-3">
                  <input
                    placeholder="Email ID"
                    class="input"
                    name="text"
                    type="text"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="floatingInput"
                  ></input>
                </div>
                <div class="my-3">
                  <input
                    placeholder="Password"
                    class="input"
                    name="text"
                    type="text"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    id="floatingPassword"
                  ></input>
                </div>
                <div className="my-3">
                  <p>
                    New Here?{" "}
                    <Link
                      to="/register"
                      className="text-decoration-underline text-info"
                    >
                      Register
                    </Link>{" "}
                  </p>
                </div>
                <div className="text-center">
                  <button class="my-2 mx-auto btn btn-dark" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="custom-text-italic text-center ">
            By continuing, you agree to our Terms of Use and acknowledge that :
          </p>
          <p className="custom-text-italic text-center mx-5">
            You are responsible for keeping your account credentials secure. All
            purchases must comply with our regulations. Product availability,
            prices, and information may change without notice. You agree to use
            this website.
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
