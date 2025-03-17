
import React from "react";
import { Grid } from "antd";
const { useBreakpoint } = Grid;

const Perfil = () => {
    const screens = useBreakpoint();
    return (
        <div style={{ padding: 20 }}>
          {screens.md ? (
            <p>Estás en una pantalla mediana o mayor.</p>
          ) : (
            <p>Estás en una pantalla pequeña.</p>
          )}
        </div>
      );
  };
  export default Perfil;
  