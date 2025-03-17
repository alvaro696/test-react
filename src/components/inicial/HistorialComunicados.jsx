import React, { useState, useEffect } from "react";
import TablaDescargas from "../TablaDescargas/TablaDescargas";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import comunicadosData from "../../data/historialComunicados.json";

const HistorialComunicados = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataConKey = comunicadosData.map((item, index) => ({
      ...item,
      key: index,
    }));
    setData(dataConKey);
  }, []);

  const columnas = [
    { title: "Gerencia", dataIndex: "gerencia", key: "gerencia" },
    { title: "Área", dataIndex: "area", key: "area" },
    { title: "Nombre del Comunicado", dataIndex: "nombreComunicado", key: "nombreComunicado" },
    { title: "Fecha de Publicación", dataIndex: "fechaPublicacion", key: "fechaPublicacion" },
    {
      title: "Fecha Límite de Publicación",
      dataIndex: "fechaLimite",
      key: "fechaLimite",
      render: (text) => (text ? text : "Sin dato"),
    },
    {
      title: "Visualizar",
      dataIndex: "visualizar",
      key: "visualizar",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <EyeOutlined style={{ fontSize: "18px", color: "#008251" }} />
        </a>
      ),
    },
    {
      title: "Formulario",
      dataIndex: "formulario",
      key: "formulario",
      render: (url) => (
        <a href={url} download>
          <DownloadOutlined style={{ fontSize: "18px", color: "#0F426B" }} />
        </a>
      ),
    },
  ];

  return (
    <div className="historial-comunicados-container">
      <h2>Historial de Comunicados</h2>
      <TablaDescargas data={data} columnas={columnas} showIndex={true} />
    </div>
  );
};

export default HistorialComunicados;
