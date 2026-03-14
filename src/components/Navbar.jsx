import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center bg-[#FFFFFF] py-4">
      <ul className="flex items-center gap-6">
        
        <NavLink
          to="/"
          className={({ isActive}) =>
            isActive ? "text-red-500 border-b-2 border-blue-400" : ""
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive}) =>
            isActive ? "text-red-500 border-b-2 border-blue-400" : ""
          }
        >
          Login
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
