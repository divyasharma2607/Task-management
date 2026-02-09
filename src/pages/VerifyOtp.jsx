import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp({ employeeCode }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  if (!employeeCode) {
    return <p className="text-white">Invalid OTP request</p>;
  }

  const submitOtp = async () => {
    const res = await fetch("http://localhost:8080/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employee_code: employeeCode,
        otp,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "OTP failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    alert("Login successful");

    navigate(data.role === "admin" ? "/admin" : "/user");
  };

  return (
    <div className="bg-white p-6 shadow rounded w-80 text-black mt-40 h-50">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

      <input
        className="border p-2 w-full"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={submitOtp}
        className="mt-4 bg-red-700 text-white w-full p-2 rounded"
      >
        Verify OTP
      </button>
    </div>
  );
}
