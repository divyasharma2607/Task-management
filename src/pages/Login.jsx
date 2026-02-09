import React, { useState } from "react";

export default function Login({ onForgotClick, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    employee_code: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Login failed");
        return;
      }

      alert("OTP sent successfully");

      // ✅ OPEN VERIFY OTP SCREEN (HOME PAGE)
      onLoginSuccess(formData.employee_code);

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md p-8 bg-white rounded-xl shadow-md h-100 mt-15">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Employee Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-50 p-2 border rounded text-black"
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

        <button
          type="button"
          onClick={onForgotClick}
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}
