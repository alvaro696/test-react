import React, { useState } from 'react';
import { message } from 'antd';
import GenericCrud from '../components/GenericCrud';
import mediaModel from '../models/mediaModel.jsx';

const Medios = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Documento de ejemplo',
      imageUrl: 'https://via.placeholder.com/150',
      mediaUrl: 'https://example.com/document.pdf',
    },
    {
      id: 2,
      title: 'Imagen promocional',
      imageUrl: 'https://via.placeholder.com/150',
      mediaUrl: '',
    },
  ]);

  const fetchMedios = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 500);
    });
  };

  const crearMedio = async (newData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
        const newMedio = { id: newId, ...newData };
        setData((prev) => [...prev, newMedio]);
        message.success("Medio creado");
        resolve(newMedio);
      }, 500);
    });
  };

  const actualizarMedio = async (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setData((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
        );
        message.success("Medio actualizado");
        resolve();
      }, 500);
    });
  };

  const eliminarMedio = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setData((prev) => prev.filter((item) => item.id !== id));
        message.success("Medio eliminado");
        resolve();
      }, 500);
    });
  };

  return (
    <GenericCrud
      title="Gestión de Medios"
      columns={mediaModel}
      fetchData={fetchMedios}
      onCreate={crearMedio}
      onUpdate={actualizarMedio}
      onDelete={eliminarMedio}
    />
  );
};

export default Medios;
