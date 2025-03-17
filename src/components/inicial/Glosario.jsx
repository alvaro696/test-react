import React from "react";
import TablaDescargas from "../TablaDescargas/TablaDescargas";
import glosarioData from "../../data/glosario.json";
import "../../styles/Glosario.css";

const Glosario = () => {
  const columnas = [
    {
      title: "Letra",
      dataIndex: "letra",
      key: "letra",
    },
    {
      title: "Palabra",
      dataIndex: "palabra",
      key: "palabra",
    },
    {
      title: "Definición",
      dataIndex: "definicion",
      key: "definicion",
    },
  ];

  return (
    <div className="glosario-container">
      <h1>Glosario</h1>
      <TablaDescargas data={glosarioData} columnas={columnas} showIndex={true} />
    </div>
  );
};

export default Glosario;