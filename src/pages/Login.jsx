import React, { useState } from "react";
import { Row, Col, Card, Input, Button, Spin, Form, message, Typography, Grid } from "antd";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoIntranet from "../components/LogoIntranet";
import fondoIntranet from "../assets/fondo_intranet.png";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const loginVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values.username, values.password);
    } catch (error) {
      message.error(error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={loginVariants}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: "92vh",
        backgroundImage: `url(${fondoIntranet})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Row justify="center" align="middle" style={{ minHeight: "80vh", padding: "20px" }}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ backgroundColor: "rgba(240, 242, 245, 0.8)", padding: "10px", borderRadius: "8px" }}>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <LogoIntranet size={screens} />
          </div>
          <Card style={{ textAlign: "center" }}>
            <h2>Iniciar Sesión</h2>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Usuario" name="username" rules={[{ required: true, message: "El usuario es obligatorio" }]}>
                <Input placeholder="Ingrese su usuario" />
              </Form.Item>
              <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: "La contraseña es obligatoria" }]}>
                <Input.Password placeholder="Ingrese su contraseña" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block disabled={loading}>
                  {loading ? <Spin size="small" /> : "Ingresar"}
                </Button>
              </Form.Item>
            </Form>
            <Button type="default" onClick={() => navigate("/registro")} block>
              Registrarse como Cliente
            </Button>
          </Card>
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ padding: "10px" }}>
        <Col>
          <Text type="secondary">© 2025</Text>
        </Col>
      </Row>
    </motion.div>
  );
};

export default Login;
