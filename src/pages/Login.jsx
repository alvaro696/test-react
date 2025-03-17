import React, { useState } from "react";
import { Row, Col, Card, Input, Button, Spin, Form, message, Menu, Typography, Grid } from "antd";
import { keyframes, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  BookOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  RocketOutlined,
  FileProtectOutlined,
  BarChartOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  FileMarkdownOutlined,
  FileExclamationOutlined,
  CalendarOutlined,
  ContactsOutlined,
} from "@ant-design/icons"; 
import LogoIntranet from "../components/LogoIntranet";
import fondoIntranet from "../assets/fondo_intranet.png"; 

import Instructivos from "../components/inicial/Instructivos";
import Contactos from "../components/inicial/Contactos";
import Videos from "../components/inicial/Videos";
import SalaReuniones from "../components/inicial/SalaReuniones";
import Cumpleanios from "../components/inicial/Cumpleanios";
import PersonalDestacado from "../components/inicial/PersonalDestacado";
import HistorialComunicados from "../components/inicial/HistorialComunicados";
import QuienesSomos from "../components/inicial/QuienesSomos";
import Glosario from "../components/inicial/Glosario";
import NormativaInterna from "../components/inicial/NormativaInterna";
import RankingMensual from "../components/inicial/RankingMensual";
import MemoriasUnbienes from "../components/inicial/MemoriasUnbienes";
import PaginaWebUnbienes from "../components/inicial/PaginaWebUnbienes";

const loginVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const menuItemVariants = {
  rest: { scale: 1, color: "#000000" },
  hover: { scale: 1.05, color: "#1890ff" },
  selected: { scale: 1.1, color: "#1890ff", fontWeight: "bold" }
};

const { Title, Text } = Typography; 
const { useBreakpoint } = Grid;

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [centralContent, setCentralContent] = useState("default");
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values.username, values.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Error al iniciar sesión. Verifica tus credenciales.");
      }
    }
  };

  const handleMenuClick = (key) => {
    setCentralContent(key);
  };

  const renderCentralContent = () => {
    switch (centralContent) {
      case "instructivos":
        return <Instructivos />;
      case "contactos":
        return <Contactos />;
      case "videos":
        return <Videos />;
      case "sala_reuniones":
        return <SalaReuniones />;
      case "cumpleanios":
        return <Cumpleanios />;
      case "personal":
        return <PersonalDestacado />;
      case "historial":
        return <HistorialComunicados />;
      case "somos":
        return <QuienesSomos />;
      case "glosario":
        return <Glosario />;
      case "normativa":
        return <NormativaInterna />;
      case "ranking":
        return <RankingMensual />;
      case "memorias":
        return <MemoriasUnbienes />;
      case "pagina":
        return <PaginaWebUnbienes />;
      default:
        return <div>Contenido por defecto</div>;
    }
  };

  return (
    <>
      <Row
        justify="center"
        align="middle"
      >
        <Col style={{ width: "100%", textAlign: "center", overflow: "hidden" }}>
          <motion.div
            animate={{ x: ["100%", "-100%"] }} 
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear", 
            }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }} 
          >
            <Title level={5} style={{ margin: 0 }}>
              La Paz - Cochabamba - Santa Cruz - Tarija - Sucre - Potosi - Oruro - Bolivia UNIBIENES S.A. Seguros y Reaseguros Patrimoniales Fecha: 2025-03-10 Dólar Venta: 6.96 BOB Dólar Compra: 6.86 BOB Euro Venta: 7.39782 BOB UFV: 2.48063 BOB Lineas Gratuitas 800 17 1010 - 800 10 3006 Siniestros ocurridos La Paz, Oruro y Potosi 77227175 Cochabamba, Chuquisaca y Tarija 73098857 Santa Cruz, Beni y Pando 76771855
            </Title>
          </motion.div>
        </Col>
      </Row>

      <motion.div
        variants={loginVariants}
        initial="hidden"
        animate="visible"
        style={{
          minHeight: "92vh",
          backgroundImage: `url(${fondoIntranet})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",
        }}
      >
        <Row
          justify="center"
          align="top"
          style={{ minHeight: "80vh", padding: "20px" }}
        >
          <Col xs={24} sm={24} md={6} lg={4} xl={4} style={{ backgroundColor: "rgba(240, 242, 245, 0.8)", padding: "10px", borderRadius: "8px" }}>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <LogoIntranet collapsed={collapsed} size={screens}/>
            </div>

            <Card style={{ textAlign: "center", marginBottom: "10px" }}>
              <h2>Iniciar Sesión</h2>
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ username: "", password: "" }}
              >
                <Form.Item
                  label="Usuario"
                  name="username"
                  rules={[
                    { required: true, message: "El usuario es obligatorio" }
                  ]}
                >
                  <Input placeholder="Ingrese su usuario" />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    { required: true, message: "La contraseña es obligatoria" }
                  ]}
                >
                  <Input.Password placeholder="Ingrese su contraseña" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block disabled={loading}>
                    {loading ? <Spin size="small" /> : "Ingresar"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Menu mode="vertical" selectedKeys={[centralContent]} >
              {[
                { key: "sala_reuniones", icon: <CalendarOutlined />, label: "Sala de Reuniones" },
                { key: "instructivos", icon: <FileExclamationOutlined />, label: "Instructivos" },
                { key: "contactos", icon: <FileTextOutlined />, label: "Contactos" },
                { key: "videos", icon: <PlayCircleOutlined />, label: "Videos" },
                { key: "cumpleanios", icon: <ContactsOutlined />, label: "Cumpleaños" },
                { key: "personal", icon: <UserOutlined />, label: "Personal Destacado" },
                { key: "historial", icon: <RocketOutlined />, label: "Historial Comunicados" },
              ].map((item) => (
                <Menu.Item key={item.key} onClick={() => handleMenuClick(item.key)} style={{ marginBottom: "10px" }}>
                  <motion.div
                    variants={menuItemVariants}
                    initial="rest"
                    whileHover="hover"
                    animate={centralContent === item.key ? "selected" : "rest"}
                    style={{ padding: "8px 0", display: "flex", alignItems: "center" }}
                  >
                    {item.icon} 
                    <span style={{ marginLeft: "8px" }}>{item.label}</span> 
                  </motion.div>
                </Menu.Item>
              ))}
            </Menu>
          </Col>

          <Col xs={24} sm={24} md={12} lg={16} xl={16}>
            <Card
              style={{
                width: "100%",
                maxWidth: "1000px",
                margin: "0 auto",
                minHeight: "600px",
                padding: "5px",
                backgroundColor: "rgba(255, 255, 255, 0.8)", 
                borderRadius: "8px" 
              }}
            >
              {renderCentralContent()}
            </Card>
          </Col>

          <Col xs={24} sm={24} md={6} lg={4} xl={4} style={{ backgroundColor: "rgba(240, 242, 245, 0.8)", padding: "20px", borderRadius: "8px" }}>
            <Menu mode="vertical" selectedKeys={[centralContent]}>
              {[
                { key: "somos", icon: <FileProtectOutlined />, label: "Quienes Somos" },
                { key: "glosario", icon: <FileProtectOutlined />, label: "Glosario" },
                { key: "normativa", icon: <FileProtectOutlined />, label: "Normativa Interna" },
                { key: "ranking", icon: <BarChartOutlined />, label: "Ranking Mensual" },
                { key: "memorias", icon: <FileDoneOutlined />, label: "Memorias Unbienes" },
                { key: "pagina", icon: <GlobalOutlined />, label: "Página Web Unbienes" },
              ].map((item) => (
                <Menu.Item key={item.key} onClick={() => handleMenuClick(item.key)} style={{ marginBottom: "40px" }}>
                  <motion.div
                    variants={menuItemVariants}
                    initial="rest"
                    whileHover="hover"
                    animate={centralContent === item.key ? "selected" : "rest"}
                    style={{ padding: "8px 0", display: "flex", alignItems: "center" }}
                  >
                    {item.icon}
                    <span style={{ marginLeft: "8px" }}>{item.label}</span>
                  </motion.div>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
        </Row>

      </motion.div>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "10px", 
        }}
      >
        <Col>
          <Text type="secondary">© 2025 Intranet Unbienes. Central Telefónica: 2121920 - 2150031 - 2151537 - 2121920</Text>
        </Col>
      </Row>
    </>
  );
};

export default Login;