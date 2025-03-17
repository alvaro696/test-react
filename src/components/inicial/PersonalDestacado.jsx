import React from 'react';
import { Carousel } from 'antd';
import '../../styles/Cumpleanios.css';

const personal = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    fecha: '2025-03-10',
    imagen: '/images/juan.jpg',
  },
  {
    id: 2,
    nombre: 'María López',
    fecha: '2025-03-11',
    imagen: '../../styles/img/maria.jpg',
  },
  {
    id: 3,
    nombre: 'Carlos Gómez',
    fecha: '2025-03-11',
    imagen: '/images/carlos.jpg',
  },
  {
    id: 4,
    nombre: 'Ana Fernández',
    fecha: '2025-03-12',
    imagen: '../../public/maria.png',
  },
];

const hoy = new Date().toISOString().split('T')[0];

const cumpleaniosHoy = personal.filter(persona => persona.fecha === hoy);

const PersonalDestacado = () => {
  return (
    <div className="cumple-container">
      <h1>🎂 <i> Cumpleañeros del Día </i> 🎉</h1>
      {cumpleaniosHoy.length > 0 ? (
        <Carousel autoplay autoplaySpeed={5000} className="cumple-carousel">
          {cumpleaniosHoy.map((persona) => (
            <div key={persona.id} className="cumple-slide">
              <img src={persona.imagen} alt={persona.nombre} className="cumple-img" />
              <p className="cumple-nombre">{persona.nombre}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="no-cumple">🎈 No hay cumpleaños hoy.</p>
      )}
    </div>
  );
};

export default PersonalDestacado;
