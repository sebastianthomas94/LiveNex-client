import { useEffect } from "react";
import Body from "../components/body";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("user"))
      navigate("/login");
    else 
      navigate("/dashboard");
  },[])
  return (
    <>
      <Header />
      <Body/>
    </>
  );
}

export default Dashboard;
