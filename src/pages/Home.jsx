import React, { useState } from "react";
import taskImage from "../assets/taskImage.png";
import Login from "./Login";
import EmployeeCode from "./EmployeeCode";
import VerifyOtp from "./VerifyOtp";
import VerifyEmpOtp from "./VerifyEmpOtp";  
import ResetPassword from "./ResetPassword";  

const Home = () => {
  const [screen, setScreen] = useState("login");
  const [employeeCode, setEmployeeCode] = useState("");

  return (
    <div className="bg-black text-white h-screen flex gap-8 p-10">

      <div className="h-80 w-80 rounded-lg shadow-lg mt-30">
        <img
          src={taskImage}
          alt="Task Management"
          className="w-75 h-75"
        />
      </div>

      <div className="max-w-md mt-30">
        <h1 className="text-4xl font-bold mb-4">
          Task Management System
        </h1>
        <p className="text-lg">
          Task management software helps teams stay aligned, meet deadlines, and avoid 
          dropped balls by organizing tasks in one centralized place. It solves common pain points 
          like unclear responsibilities, poor visibility into progress, and inefficient communication 
          across teams. Whether you're managing remote teammates, fast-moving projects, or a growing task 
          list, the right tool can bring structure and clarity to your workflow.
        </p>
      </div>


       

             {screen === "login" && (
          <Login
            onLoginSuccess={(empCode) => {
              setEmployeeCode(empCode);
              setScreen("verify-otp");
            }}
            onForgotClick={() => {
              setEmployeeCode("");
              setScreen("empcode");
            }}
          />
        )}

      {screen === "verify-otp" && (
  <VerifyOtp employeeCode={employeeCode} />
)}

      {screen === "EmpCode" && (
        <EmployeeCode
          onOtpClick={(data) => {
            setEmployeeCode(data.employee_code);
            setScreen("verify-emp-otp");
          }}
        />
      )}

      {screen === "verify-emp-otp" && (
        <VerifyEmpOtp employeeCode={employeeCode} 
          onVerified={() => setScreen("reset-password")}/>
      )}


      {screen === "reset-password" && (
  <ResetPassword
    employeeCode={employeeCode}
    onSuccess={() => {
      setEmployeeCode("");   
      setScreen("login");    
    }}
  />
)}

    </div>
  );
}
    
 
export default Home;
