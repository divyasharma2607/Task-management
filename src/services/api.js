const API_BASE = "http://localhost:8080";

export async function sendOtp(employee_code) {
  const res = await fetch(`${API_BASE}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_code }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send OTP");
  return data;
}

export async function verifyOtp(employee_code, otp) {
  const res = await fetch(`${API_BASE}/verifyotp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_code, otp }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "OTP verification failed");
  return data;
}
