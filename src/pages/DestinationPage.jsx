import { useEffect } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import Destinations from "../components/Destinations";

function DestinationPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
    else navigate("/destinations");
  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-grow m-12">
          <Destinations/>
        </div>
      </div>
    </>
  );
}

export default DestinationPage;
