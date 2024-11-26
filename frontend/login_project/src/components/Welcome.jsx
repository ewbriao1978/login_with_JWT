import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Welcome() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/welcome", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (err) {
        navigate("/");
      }
    };

    fetchMessage();
  }, [navigate]);

  return (
    <div>
      <h2>{message}</h2>
      <Link to="/products">Ver Produtos</Link>
    </div>
  );
}

export default Welcome;