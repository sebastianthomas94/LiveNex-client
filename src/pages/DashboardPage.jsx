import { useEffect } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar";
import Dashboard from "../components/Dashboard";
import Body from "../components/body";

function DashboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) navigate("/login");
    else navigate("/dashboard");
  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="flex-grow m-12">
          <Dashboard />
        </div>
      </div>
      <Body />
    </>
  );
}

export default DashboardPage;
