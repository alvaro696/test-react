import React from 'react';
import { message } from 'antd';
import api from '../../api';
import GenericCrud from '../../components/GenericCrud';
import gerenciaModel from '../../models/organigrama/gerenciaModel';

const Gerencias = () => {
  const fetchGerencias = async () => {
    try {
      const { data } = await api.get('/api/gerencia');
      return data;
    } catch (error) {
      message.error('Error al cargar gerencias');
      return []; 
    }
  };
  const crearGerencia = async (newData) => {
    try {
      const { data } = await api.post('/api/gerencia', newData);
      message.success('Gerencia creada');
      return data;
    } catch (error) {
      message.error('Error al crear gerencia');
      throw error; 
    }
  };

  const actualizarGerencia = async (id, updatedData) => {
    try {
      await api.put(`/api/gerencia/${id}`, updatedData);
      message.success('Gerencia actualizada');
    } catch (error) {
      message.error('Error al actualizar gerencia');
      throw error;
    }
  };

  const eliminarGerencia = async (id) => {
    try {
      await api.delete(`/api/gerencia/${id}`);
      message.success('Gerencia eliminada');
    } catch (error) {
      message.error('Error al eliminar gerencia');
      throw error;
    }
  };

  return (
    <GenericCrud
      title="Gestión de Gerencias"
      columns={gerenciaModel}
      fetchData={fetchGerencias}
      onCreate={crearGerencia}
      onUpdate={actualizarGerencia}
      onDelete={eliminarGerencia}
    />
  );
};

export default Gerencias;
