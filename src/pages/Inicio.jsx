import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin, message } from 'antd';

const Inicio = () => {
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranchesData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = [
          { id: 1, name: 'Sucursal Norte', userCount: 120 },
          { id: 2, name: 'Sucursal Sur', userCount: 85 },
          { id: 3, name: 'Sucursal Este', userCount: 60 },
          { id: 4, name: 'Sucursal Oeste', userCount: 95 },
        ];
        setBranches(data);
      } catch (error) {
        message.error('Error al cargar la información de las sucursales.');
      } finally {
        setLoading(false);
      }
    };

    fetchBranchesData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20vh' }}>
        <Spin size="large" tip="Cargando sucursales..." />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {branches.map((branch) => (
          <Col key={branch.id} xs={24} sm={12} md={8} lg={6}>
            <Card bordered>
              <Statistic title={branch.name} value={branch.userCount} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Inicio;
