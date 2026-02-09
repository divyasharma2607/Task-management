import { useState } from "react";

export default function ResetPassword({ employeeCode, onSuccess }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!employeeCode) {
    return <p className="text-black">Invalid reset request</p>;
  }

  // 🔐 Password validation
  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!isValidPassword(password)) {
      alert(
        "Password must be 8+ chars, include uppercase, lowercase, number & special character"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employee_code: employeeCode,
          new_password: password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.error || "Reset failed");
        return;
      }

      alert("Password reset successfully");

      // ✅ Tell Home to go next (login / home screen)
      onSuccess();
    } catch (err) {
      setLoading(false);
      alert("Server error");
    }
  };

  return (
    <form
      onSubmit={resetPassword}
      className="bg-white p-8 rounded-xl shadow-md  max-w-md h-80 mt-30"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-black">
        Reset Password
      </h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border rounded border-black text-black "
      />

      <p className="text-sm text-gray-500 mb-4">
        Must be 8+ chars, include uppercase, lowercase, number & special character
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-700 text-white py-2 rounded font-semibold hover:bg-red-800 transition"
      >
        {loading ? "Updating..." : "Reset Password"}
      </button>
    </form>
  );
}
