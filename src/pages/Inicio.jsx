import React, { useEffect, useState } from 'react';
import { Card, Statistic, Spin, message, List } from 'antd';
import api from '../api';
import { useAuth } from "../context/AuthContext";

const Inicio = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/cuentas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedCuentas = response.data.data || [];
        setCuentas(fetchedCuentas);

        const total = fetchedCuentas.reduce((acc, cuenta) => {
          return acc + parseFloat(cuenta.saldo);
        }, 0);
        setSaldoTotal(total);
      } catch (error) {
        console.error("Error al cargar las cuentas:", error);
        message.error('Error al cargar el saldo de las cuentas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20vh' }}>
        <Spin size="large" tip="Cargando saldo..." />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Card bordered style={{ marginBottom: 24, textAlign: 'center' }}>
        <Statistic title="Saldo Total" value={saldoTotal} precision={2} prefix="$" />
      </Card>
      <List
        header={<div>Detalle de Cuentas</div>}
        itemLayout="horizontal"
        dataSource={cuentas}
        renderItem={cuenta => (
          <List.Item>
            <List.Item.Meta
              title={cuenta.nombre ? `Cuenta: ${cuenta.nombre}` : `Cuenta #${cuenta.id}`}
              description={`Saldo: $${parseFloat(cuenta.saldo).toFixed(2)}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Inicio;
