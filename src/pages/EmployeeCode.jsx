import { useState } from "react";
import { sendOtp } from "../services/api";


export default function ForgotPassword({onOtpClick}) {
  const [emp, setEmp] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const submit = async () => {
    if (!emp.trim()) {
      setError("Employee code is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await sendOtp(emp);

      // ✅ show success alert
      setSuccess("OTP sent successfully ✅");

       setTimeout(() => {
        onOtpClick({ employee_code: emp });

      }, 1000);

    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="bg-white p-6 rounded shadow  max-w-md h-50 mt-40">
        <h2 className="text-xl font-semibold text-center mb-4 text-black">
          Forgot Password
        </h2>

        <input
          className="border p-2 w-full rounded mb-3 focus:outline-none focus:ring-2 border-black text-black focus:ring-blue-500"
          placeholder="Employee Code"
          onChange={(e) => setEmp(e.target.value)}
        />

        {/* ✅ Success Alert */}
        {success && (
          <div className="mb-3 text-green-700 bg-green-100 border border-green-300 p-2 rounded text-sm">
            {success}
          </div>
        )}

        {/* ❌ Error Alert */}
        {error && (
          <div className="mb-3 text-red-700 bg-red-100 border border-red-300 p-2 rounded text-sm">
            {error}
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="mt-2 bg-red-700 text-white w-full p-2 rounded hover:bg-red-800 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
   
  );
}
