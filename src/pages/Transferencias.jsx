// src/pages/Transferencias.jsx
import React from 'react';
import api from '../api';
import GenericCrud from '../components/GenericCrud';
import transferenciaModel from '../models/transferencia';
import { useAuth } from "../context/AuthContext";

const Transferencias = () => {
  const { token } = useAuth();
  const fetchTransacciones = async () => {
    try {
      const response = await api.get('/api/transaccion', {
        headers: { Authorization: `Bearer ${token}` },
    });
      console.log("Respuesta GET:", response.data);

      if (response.data.data) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      return [];
    }
  };

  const crearTransaccion = async (newData) => {
    try {
      const { data } = await api.post('/api/transaccion', newData);
      return data;
    } catch (error) {
      console.error("Error al crear transacción:", error);
      throw error;
    }
  };

  const actualizarTransaccion = async (id, updatedData) => {
    try {
      await api.put(`/api/transaccion/${id}`, updatedData);
    } catch (error) {
      console.error("Error al actualizar transacción:", error);
      throw error;
    }
  };

  const eliminarTransaccion = async (id) => {
    try {
      await api.delete(`/api/transaccion/${id}`);
    } catch (error) {
      console.error("Error al eliminar transacción:", error);
      throw error;
    }
  };

  return (
    <GenericCrud
      title="Transacciones"
      columns={transferenciaModel}
      fetchData={fetchTransacciones}
      onCreate={crearTransaccion}
      onUpdate={actualizarTransaccion}
      onDelete={eliminarTransaccion}
    />
  );
};

export default Transferencias;
