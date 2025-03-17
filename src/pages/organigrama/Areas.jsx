import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import api from '../../api';
import GenericCrud from '../../components/GenericCrud';
import areaModel from '../../models/organigrama/areaModel';

const Areas = () => {
  const [gerencias, setGerencias] = useState([]);
  const [columns, setColumns] = useState(areaModel);

  const fetchGerenciasForSelect = async () => {
    try {
      const { data } = await api.get('/api/gerencia'); 
      const options = data.map(g => ({
        value: g.id,
        label: g.name,
      }));
      setGerencias(options);

      const newColumns = areaModel.map(col => {
        if (col.dataIndex === 'gerenciaId') {
          return { ...col, options };
        }
        return col;
      });
      setColumns(newColumns);

    } catch (error) {
      message.error('Error al cargar gerencias');
    }
  };

  useEffect(() => {
    fetchGerenciasForSelect();
  }, []);

  const fetchAreas = async () => {
    try {
      const { data } = await api.get('/api/area');
      return data;
    } catch (error) {
      message.error('Error al cargar áreas');
      return [];
    }
  };

  const crearArea = async (newData) => {
    try {
      const { data } = await api.post('/api/area', newData);
      return data; 
    } catch (error) {
      throw error;
    }
  };

  const actualizarArea = async (id, updatedData) => {
    try {
      await api.put(`/api/area/${id}`, updatedData);
    } catch (error) {
      throw error;
    }
  };

  const eliminarArea = async (id) => {
    try {
      await api.delete(`/api/area/${id}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <GenericCrud
      title="Gestión de Áreas"
      columns={columns} 
      fetchData={fetchAreas}
      onCreate={crearArea}
      onUpdate={actualizarArea}
      onDelete={eliminarArea}
    />
  );
};

export default Areas;
