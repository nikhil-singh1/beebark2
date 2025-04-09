import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } else {
      alert(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#221912]">
      <div className="w-96 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-yellow-300 text-center">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-yellow-300 text-black font-bold py-2 rounded-md hover:bg-yellow-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
