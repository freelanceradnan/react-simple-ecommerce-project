import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center bg-[#FFFFFF] py-2">
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
          to="/cart"
          className={({ isActive}) =>
            isActive ? "text-red-500 border-b-2 border-blue-400" : ""
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive}) =>
            isActive ? "text-red-500 border-b-2 border-blue-400" : ""
          }
        >
          Signup
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
