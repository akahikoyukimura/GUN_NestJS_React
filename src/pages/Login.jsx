import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components";
import { TOAST_TYPES } from "../constants/toastTypes";
import { useLoginForm } from "../hooks/useLoginForm";
import { login } from "../api/authApi";
import { useLoading } from "../contexts/LoadingContext";
import { useToast } from "../contexts/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setLoading } = useLoading();
  const { showToast, hideToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  const HandleLogin = async (e) => {
    hideToast();
    setLoading(true);
    try {
      // API call
      const data = await login(e);
      // save token and user
      if (rememberMe) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
      // navigate to home page
      navigate("/home");
    } catch (error) {
      showToast(
        TOAST_TYPES.ERROR,
        error.message
          ? error.message
          : error.error
            ? error.error
            : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="login screen-page">
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
                <form
                  onSubmit={handleSubmit(HandleLogin)}
                  className="text-center"
                >
                  <div className="my-3">
                    <div
                      className={`input-group flex-nowrap c-input-group  ${
                        errors.email ? "c-invalid" : ""
                      }`}
                    >
                      <span className="input-group-text input-icon">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        placeholder="Email ID "
                        className="input"
                        name="text"
                        type="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <div className="text-danger text-left c-invalid-text">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="my-3">
                    <div
                      className={`input-group flex-nowrap c-input-group  ${
                        errors.pass ? "c-invalid" : ""
                      }`}
                    >
                      <span className="input-group-text input-icon">
                        <i className="bi bi-key-fill"></i>
                      </span>
                      <input
                        placeholder="Password"
                        className="input"
                        name="text"
                        type={showPassword ? "text" : "password"}
                        id="floatingPassword"
                        {...register("pass")}
                      ></input>
                      <i
                        className={`px-2 input-icon bi ${
                          showPassword ? "bi-eye-slash-fill" : "bi-eye-fill  "
                        } password-toggle`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    </div>
                    {errors.pass && (
                      <div className="text-danger text-left c-invalid-text">
                        {errors.pass.message}
                      </div>
                    )}
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
                        className="text-decoration-underline text-reset fst-italic"
                      >
                        Sign up
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      className="button "
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-3 ">or</span>
                  <hr className="flex-grow-1" />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 c-google"
                >
                  Login with Google
                </button>
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
