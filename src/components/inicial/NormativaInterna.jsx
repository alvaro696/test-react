import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import TablaDescargas from "../TablaDescargas/TablaDescargas";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import "../../styles/NormativaInterna.css";

import documentosNormativosData from "../../data/documentosNormativos.json";
import peiPoaData from "../../data/peiPoa.json";
import organigramaData from "../../data/organigrama.json";
import manualPuestosData from "../../data/manualPuestos.json";

const NormativaInterna = () => {
  const [dataDocumentos, setDataDocumentos] = useState([]);
  const [dataPeiPoa, setDataPeiPoa] = useState([]);
  const [dataOrganigrama, setDataOrganigrama] = useState([]);
  const [dataManual, setDataManual] = useState([]);

  useEffect(() => {
    setDataDocumentos(
      documentosNormativosData.map((item, index) => ({
        ...item,
        key: index,
        nro: index + 1,
      }))
    );
    setDataPeiPoa(
      peiPoaData.map((item, index) => ({
        ...item,
        key: index,
        nro: index + 1,
      }))
    );
    setDataOrganigrama(
      organigramaData.map((item, index) => ({
        ...item,
        key: index,
        nro: index + 1,
      }))
    );
    setDataManual(
      manualPuestosData.map((item, index) => ({
        ...item,
        key: index,
        nro: index + 1,
      }))
    );
  }, []);

  const columnasDocumentos = [
    { title: "Gerencia", dataIndex: "gerencia", key: "gerencia" },
    { title: "Área", dataIndex: "area", key: "area" },
    { title: "Nombre de Archivo", dataIndex: "nombreArchivo", key: "nombreArchivo" },
    {
      title: "Vista de Documento",
      dataIndex: "vistaDocumento",
      key: "vistaDocumento",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <EyeOutlined style={{ fontSize: "18px", color: "#008251" }} />
        </a>
      ),
    },
    {
      title: "Vista Formulario",
      dataIndex: "vistaFormulario",
      key: "vistaFormulario",
      render: (url) => (
        <a href={url} download>
            <DownloadOutlined style={{ fontSize: "18px", color: "#0F426B" }} />
        </a>
      ),
    },
  ];

  const columnasPeiPoa = [
    { title: "Gerencia", dataIndex: "gerencia", key: "gerencia" },
    { title: "Área", dataIndex: "area", key: "area" },
    { title: "Nombre de Archivo", dataIndex: "nombreArchivo", key: "nombreArchivo" },
    {
      title: "Vista de Documento",
      dataIndex: "vistaDocumento",
      key: "vistaDocumento",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <EyeOutlined style={{ fontSize: "18px", color: "#008251" }} />
        </a>
      ),
    },
    {
      title: "Formulario para Descargar",
      dataIndex: "formulario",
      key: "formulario",
      render: (url) => (
        <a href={url} download>
           <DownloadOutlined style={{ fontSize: "18px", color: "#0F426B" }} />
        </a>
      ),
    },
  ];

  const columnasOrganigrama = [
    { title: "Gerencia", dataIndex: "gerencia", key: "gerencia" },
    { title: "Área", dataIndex: "area", key: "area" },
    { title: "Nombre de Archivo", dataIndex: "nombreArchivo", key: "nombreArchivo" },
    {
      title: "Vista del Documento",
      dataIndex: "vistaDocumento",
      key: "vistaDocumento",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
           <EyeOutlined style={{ fontSize: "18px", color: "#008251" }} />
        </a>
      ),
    },
  ];

  const columnasManual = [
    { title: "Gerencia", dataIndex: "gerencia", key: "gerencia" },
    { title: "Área", dataIndex: "area", key: "area" },
    { title: "Título del Manual", dataIndex: "titulo", key: "titulo" },
    {
      title: "Ver Manual",
      dataIndex: "verManual",
      key: "verManual",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
           <EyeOutlined style={{ fontSize: "18px", color: "#008251" }} />
        </a>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "Documentos Normativos",
      children: <TablaDescargas data={dataDocumentos} columnas={columnasDocumentos} showIndex={true} />,
    },
    {
      key: "2",
      label: "PEI-POA",
      children: <TablaDescargas data={dataPeiPoa} columnas={columnasPeiPoa} showIndex={true} />,
    },
    {
      key: "3",
      label: "Organigrama",
      children: <TablaDescargas data={dataOrganigrama} columnas={columnasOrganigrama} showIndex={true} />,
    },
    {
      key: "4",
      label: "Manual de Puestos, Cargos y Funciones",
      children: <TablaDescargas data={dataManual} columnas={columnasManual} showIndex={true} />,
    },
  ];

  return (
    <div className="normativa-interna-container">
      <h2>Normativa Interna</h2>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default NormativaInterna;