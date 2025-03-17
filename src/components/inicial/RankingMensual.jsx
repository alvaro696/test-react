import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import "../../styles/RankingMensual.css";
import rankingData from "../../data/rankingMensual.json"; 

const { Meta } = Card;

const RankingMensual = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(rankingData);
  }, []);

  return (
    <div className="ranking-mensual-container">
      <h1>Ganador del Mes</h1>
      <div className="image-container">
        <Card
          cover={<img alt="Ganador del Mes" src={data.imagen} />}
          className="image-card"
        >
          <Meta
            title={data.nombre}
            description={`${data.puesto} - Puntaje: ${data.puntaje}`}
          />
        </Card>
      </div>
    </div>
  );
};

export default RankingMensual;