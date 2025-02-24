import { useContext } from "react";
import { ContextProvider } from "./Provider";
import { Link } from "react-router-dom";

const Headers = () => {
  const { signOutUser, userAcount } = useContext(ContextProvider);

  const link = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/add-schedule"}>Add Schedule</Link>
      </li>
      <li>
        <Link to={"/all-schedule"}>All Schedule</Link>
      </li>
      <li>
        <Link to={"/sign-in"}>Sign-In</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 w-10/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100  rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            {link}
          </ul>
        </div>
        <Link to={"/"}>
          <a className="btn btn-ghost text-xl">My-Gym</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1  ">{link}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn text-green-500 font-bold mr-2">
          Login With : <span>{userAcount ? userAcount.email : "N/A"}</span>
        </a>
        {userAcount ? (
          <button
            onClick={() => signOutUser()}
            className="btn btn-circle btn-accent"
          >
            Logout
          </button>
        ) : (
          <Link className="btn btn-circle btn-warning" to={"/sign-in"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Headers;
