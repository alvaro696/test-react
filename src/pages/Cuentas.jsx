// src/pages/Cuentas.jsx
import React from 'react';
import api from '../api';
import GenericCrud from '../components/GenericCrud';
import cuentasModel from '../models/cuentas';
import { useAuth } from "../context/AuthContext";

const Cuentas = () => {
  const { token } = useAuth();

  const fetchCuenta = async () => {
    try {
      const response = await api.get('/api/cuentas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response data:", response.data);
      return response.data.data ? response.data.data : response.data;
    } catch (error) {
      console.error("Error al obtener cuentas:", error);
      return [];
    }
  };

  const crearCuenta = async (newData) => {
    try {
      const { data } = await api.post('/api/cuentas', newData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      throw error;
    }
  };

  const actualizarCuenta = async (id, updatedData) => {
    try {
      await api.put(`/api/cuentas/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error al actualizar cuenta:", error);
      throw error;
    }
  };

  const eliminarCuenta = async (id) => {
    try {
      await api.delete(`/api/cuentas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      throw error;
    }
  };

  return (
    <GenericCrud
      title="Gestión de Cuentas"
      columns={cuentasModel}
      fetchData={fetchCuenta}
      onCreate={crearCuenta}
    />
  );
};

export default Cuentas;
