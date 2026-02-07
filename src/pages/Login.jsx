import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loginn() {
  const [formData, setFormData] = useState({
    employee_code: "",
    password: "",
    role: "user", // ✅ added role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // role included
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Login failed");
        return;
      }

      alert("OTP sent successfully");

      navigate("/verify-otp", {
        state: {
          employee_code: formData.employee_code,
          role: formData.role, // ✅ pass role forward if needed
        },
      });

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md h-100 mt-15">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Employee Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

         {/* 🔽 Role Dropdown */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-50 p-2 border rounded  text-black"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>


        <input
          type="text"
          name="employee_code"
          placeholder="Employee Code"
          value={formData.employee_code}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />

       
        <button
          type="submit"
          className="w-full bg-red-700 text-white py-2 rounded"
        >
          Login
        </button>

        <div className="">
          <button
            type="button"
            onClick={() => navigate("/EmpCode")}
            className="text-blue-600 hover:underline "
          >
            Forget Password?
          </button>
        </div>
      </form>
    </div>
  );
}
