import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../contexts/Auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


const Navbar = () => {
  const {isLogin,role}=useAuth()
  
  
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
        {isLogin && role=='admin' &&(
          <NavLink
          to="/add-product"
          className={({ isActive}) =>
            isActive ? "text-red-500 border-b-2 border-blue-400" : ""
          }
        >
          Add Product
        </NavLink>
        )}
        <NavLink
          to="/cart"
          className={({ isActive}) =>
            isActive ? "text-red-500 border-b-2 border-blue-400" : ""
          }
        >
          Cart
        </NavLink>
        
          {
            !isLogin && 
              <>
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
          </>
            
          }
        
        {
          isLogin && <li><button onClick={()=>signOut(auth)}>Logout</button></li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
