import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Lo sentimos, no tienes acceso a esta página."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Volver al inicio
        </Button>
      }
    />
  );
};

export default Unauthorized;
