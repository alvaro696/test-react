import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Bienvenido</h1>
      <p>Para acceder al sistema, inicie sesión.</p>
      <Button type="primary" onClick={() => navigate("/login")}>
        Ir al Login
      </Button>
    </div>
  );
};

export default Welcome;
