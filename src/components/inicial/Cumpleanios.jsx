import React from 'react';
import { Row, Col } from 'antd';
import Carrusel from '../Carrusel/Carrusel';
import '../../styles/Cumpleanios.css';

const cumpleaneros = [
  { id: 1, nombre: 'Gianella Ariadna Velez Zambrana', fecha: '2025-03-12', imagen: '/images/juan.jpg' },
  { id: 2, nombre: 'María López', fecha: '2025-03-10', imagen: '/images/maria.jpg' },
  { id: 3, nombre: 'Carlos Gómez', fecha: '2025-03-10', imagen: '/images/carlos.jpg' },
  { id: 4, nombre: 'Ana Fernández', fecha: '2025-03-10', imagen: '/images/ana.jpg' },
];

const hoy = new Date().toISOString().split('T')[0];
const cumpleaniosHoy = cumpleaneros.filter(persona => persona.fecha === hoy);

const Cumpleanios = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={22} md={20} lg={18} xl={16} className="cumple-container">
        <Carrusel items={cumpleaniosHoy} />
      </Col>
    </Row>
  );
};

export default Cumpleanios;
