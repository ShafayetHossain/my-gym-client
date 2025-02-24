import React, { useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "./Provider";
import deleteCard from "../utils/deleteCard";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const url = location?.state ? location.state : "/";
  const {
    signInUser,
    resetPassword,
    notifySuccess,
    notifyError,
    notifyWarning,
  } = useContext(ContextProvider);

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((userCredential) => {
        notifySuccess("Login Successfully");
        if (location.state?.cardId) {
          deleteCard(location.state.cardId, () => {
            navigate("/");
          });
        } else {
          navigate(url);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        notifyError(errorMessage);
      });
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    resetPassword(email)
      .then(() => {
        notifyWarning("Password sent to your mail");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        notifyError(errorCode);
      });
  };

  return (
    <div>
      <h1 className="text-center text-4xl text-white font-bold pb-4">
        Login Here
      </h1>
      <div className="bg-[#e6e5e4] py-5 flex justify-center items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                ref={emailRef}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div className="flex justify-between items-center">
                <label className="label">
                  <button
                    onClick={handleResetPassword}
                    href="#"
                    className="label-text-alt link link-hover text-red-500"
                  >
                    Forgot password?
                  </button>
                </label>
                <label className="label">
                  <Link to={"/sign-up"} state={url}>
                    <a
                      href="#"
                      className="label-text-alt link link-hover text-green-500"
                    >
                      Create New Account!
                    </a>
                  </Link>
                </label>
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
