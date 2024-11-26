import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); // Redireciona para login se não houver token
          return;
        }

        const res = await axios.get("http://localhost:5000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data);
      } catch (err) {
        window.console.error(err);
        navigate("/"); // Redireciona para login em caso de erro
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Produtos</h2>
      {products.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Quantidade</th>
              <th style={styles.th}>Preço</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.quantity}</td>
                <td style={styles.td}>R$ {product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Não há produtos disponíveis.</p>
      )}
    </div>
  );
}

const styles = {
  th: { border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2", textAlign: "left" },
  td: { border: "1px solid #ddd", padding: "8px" },
};

export default Products;
