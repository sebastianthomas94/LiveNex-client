import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      navigate("/login");
      localStorage.clear();
      toast.success("logout successfully");
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <header className="flex items-center justify-between bg-blue-600 p-4">
      <div className="flex items-center space-x-2">
        <span
          className="text-white font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          LiveNex
        </span>
      </div>
      <div className="flex space-x-4">
        <Link to="/pro">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Upgrade
          </button>
        </Link>

        <button className="text-white font-medium" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </header> 
    
  );
};

export default Header;