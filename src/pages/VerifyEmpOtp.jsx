import { useState } from "react";

export default function VerifyEmpOtp({
  employeeCode,
  onVerified = () => {}
}) {
  const [otp, setOtp] = useState("");

  if (!employeeCode) {
    return <p className="text-white">Invalid OTP request</p>;
  }

  const verifyOtp = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/verify-emp-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employee_code: employeeCode,
        otp,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "OTP verification failed");
      return;
    }

    alert("OTP verified");
    onVerified(); // ✅ switch screen in Home
  };

  return (
    <form
      onSubmit={verifyOtp}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md h-100 mt-25"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Verify OTP
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-1">
          Employee Code
        </label>
        <input
          type="text"
          value={employeeCode}
          disabled
          className="w-full px-4 py-2 border border-black rounded-lg bg-gray-100 text-black"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-black mb-1">
          OTP
        </label>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full px-4 py-2 border border-black rounded-lg text-black"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-700 text-white py-2 rounded-lg font-semibold hover:bg-red-800"
      >
        Verify OTP
      </button>
    </form>
  );
}
