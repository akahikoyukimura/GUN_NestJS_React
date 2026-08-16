import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
//import { loginImg } from "./assets/1.png";


 


const Login = () => {

    const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
   const navigate = useNavigate();

  
const HandleLogin =async (e)=>{
    e.preventDefault();
try {
     const response = await fetch(
        "http://localhost:3001/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            pass,
          }),
        }
      );

      const data = await response.json();

      // if (!response.ok) {
      //   setError(data.message || "Login failed");
      //   return;
      // }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/about");

    } catch (error) {
      // setError("Server error");

    } finally {
      // setLoading(false);
    }
}


  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="text-center">
          <img
            src="./assets/1.png"
            alt="Logo"
            className="img-fluid logo"
          />
        </div>
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={HandleLogin}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                                    value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
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
                <button
                  class="my-2 mx-auto btn btn-dark"
                  type="submit"
                  
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
