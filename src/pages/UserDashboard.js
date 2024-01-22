import React from "react";
import NavigationBar from "../components/NavigationBar";
import Transactions from "./Transactions";

function UserDashboard() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <NavigationBar/>
      <Transactions/>
    </div>
  )
}

export default UserDashboard;