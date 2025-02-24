import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "./Provider";

const SignUp = () => {
  const [match, setMatch] = useState(true);
  const { createUser, notifySuccess, notifyError } =
    useContext(ContextProvider);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    const RePassword = form.repassword.value;

    if (password == RePassword) {
      setMatch(true);
      createUser(email, password)
        .then((userCredential) => {
          console.log(userCredential.user); 
          notifySuccess("Account Create Successfully");
          navigate(location.state);
          form.reset();
        })
        .catch((error) => {
          const errorMessage = error.message;
          notifyError(errorMessage);
        });
    } else {
      setMatch(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/more/11.png')] bg-cover bg-white py-5">
      <div className="w-10/12 mx-auto py-5">
        <div>
          <h1 className="text-center text-4xl text-black font-bold pb-4">
            Sign-Up Here
          </h1>
        </div>

        <div className="bg-[#e6e5e4] py-5 flex justify-center items-center">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
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
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Re-Password</span>
                </label>
                <input
                  type="password"
                  name="repassword"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />

                <div className="flex justify-between items-center">
                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt link link-hover text-red-500"
                    >
                      {match ? "" : "Password missmatch.!"}
                    </a>
                  </label>
                  <label className="label">
                    <Link to={"/sign-in"}>
                      <a
                        href="#"
                        className="label-text-alt link link-hover text-green-500"
                      >
                        Already Have An Account!
                      </a>
                    </Link>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
