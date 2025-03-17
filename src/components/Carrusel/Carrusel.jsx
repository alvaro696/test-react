import React from 'react';
import { Carousel } from 'antd';

const Carrusel = ({ items }) => {
  return (
    <div className="carrusel-container">
      {items.length > 0 ? (
        <Carousel autoplay autoplaySpeed={5000} className="carrusel">
          {items.map((item) => (
            <div key={item.id} className="carrusel-slide">
              <img src={item.imagen} alt={item.nombre} className="carrusel-img" />
              <p className="carrusel-nombre">{item.nombre}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="carrusel-vacio">🎈 No hay elementos para mostrar.</p>
      )}
    </div>
  );
};

export default Carrusel;
