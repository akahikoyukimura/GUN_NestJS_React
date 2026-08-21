import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components";
import { TOAST_TYPES } from "../constants/toastTypes";
import { registerUser } from "../api/authApi";
import { useLoading } from "../contexts/LoadingContext";
import { useToast } from "../contexts/ToastContext";
import { useRegisterForm } from "../hooks/useRegisterForm";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setLoading } = useLoading();
  const { showToast, hideToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useRegisterForm();

  const HandleRegister = async (e) => {
    hideToast();
    setLoading(true);
    try {
      // call api
      const { ConfirmPass, ...requestData } = e;
      const data = await registerUser(requestData);
      // show success toast
      showToast(TOAST_TYPES.SUCCESS, data.message ? data.message : "Success");
      // redirect to login
      navigate("/login");
    } catch (error) {
      showToast(
        TOAST_TYPES.ERROR,
        error.message
          ? error.message
          : error.error
            ? error.error
            : "Registration failed",
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
            <p className=" text-center ">
              Begin your mission by telling us who you are.Your informations are
              TOP secret
            </p>
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
                  onSubmit={handleSubmit(HandleRegister)}
                  className="text-center"
                >
                  <div className="my-3">
                    <div
                      className={`input-group flex-nowrap c-input-group  ${
                        errors.name ? "c-invalid" : ""
                      }`}
                    >
                      <span className="input-group-text input-icon">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        placeholder="Full name"
                        className="input"
                        name="name"
                        type="text"
                        {...register("name")}
                      />
                    </div>
                    {errors.name && (
                      <div className="text-danger text-left c-invalid-text">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
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
                        name="email"
                        type="email"
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
                        name="pass"
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
                  <div className="my-3">
                    <div
                      className={`input-group flex-nowrap c-input-group  ${
                        errors.ConfirmPass ? "c-invalid" : ""
                      }`}
                    >
                      <span className="input-group-text input-icon">
                        <i className="bi bi-key-fill"></i>
                      </span>
                      <input
                        placeholder="Confirm password"
                        className="input"
                        name="ConfirmPass"
                        type={showConfirmPassword ? "text" : "password"}
                        id="floatingConfirmPassword"
                        {...register("ConfirmPass")}
                      ></input>
                      <i
                        className={`px-2 input-icon bi ${
                          showConfirmPassword
                            ? "bi-eye-slash-fill"
                            : "bi-eye-fill  "
                        } password-toggle`}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      ></i>
                    </div>
                    {errors.ConfirmPass && (
                      <div className="text-danger text-left c-invalid-text">
                        {errors.ConfirmPass.message}
                      </div>
                    )}
                  </div>
                  <div className="my-3">
                    <p>
                      Already has an account?{" "}
                      <Link
                        to="/login"
                        className="text-decoration-underline text-reset fst-italic"
                      >
                        Login
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      className="button "
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Register
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
                  Sign up with Google
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

export default Register;
