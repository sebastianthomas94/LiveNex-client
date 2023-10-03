import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
 
  const youtube = () => {
    try {
      const authWindow = window.open("http://localhost:8000/user/auth/youtubeAuth");

      const messageListener = (event) => {
        if (event.origin === "http://localhost:8000") {
          console.log(event.data);
          localStorage.setItem("rtmp",event.data );
          authWindow.close();
          window.removeEventListener("message", messageListener);
        }
      };
      window.addEventListener("message", messageListener);
    } catch (error) {
      if (error) throw error;
    }
  };

  return (
    <div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 p-2">
        <Link to="/stream">Create Live</Link>
      </button>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 p-2"
        onClick={youtube}
      >
        youtube
      </button>
    </div>
  );
};

export default Body;