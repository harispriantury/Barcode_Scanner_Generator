import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const ProtectedLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      <Sidebar />
      <div className="bg-gray-300 w-3/4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
