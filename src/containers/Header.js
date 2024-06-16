import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link } from "react-router-dom";
import { removeuser } from "../features/common/userSlice";

function Header() {
  const dispatch = useDispatch();
  const { pageTitle } = useSelector((state) => state.header);
  const { currentUser } = useSelector((state) => state.userdata);

  function logoutUser() {
    localStorage.clear();
    // dispatch(removeuser());
    window.location.href = "/login";
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-accent drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="order-last">
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost">
              {currentUser.fname}
              <div className="avatar ml-2">
                <div className="w-10 rounded-full">
                  <img
                    src={`https://www.studifysuccess.com/${currentUser.image}`}
                    alt="."
                  />
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>Profile</Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
