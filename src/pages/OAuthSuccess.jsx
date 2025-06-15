import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function OAuthSuccess() {
  const { setToken, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  useEffect(() => {
    if (!token) { toast.error("Login failed"); navigate("/login"); return; }

    localStorage.setItem("userToken", token);
    setToken(token);

    axios.get(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        setUserData(data.user);
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        toast.success("Logged in!");
        navigate(`/users/${data.user._id}`);
      })
      .catch(() => { toast.error("Fetch user failed"); navigate("/login"); });
  }, [token]);

  return <div className="text-center py-20">Logging you in…</div>;
}
