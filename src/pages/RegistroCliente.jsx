import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../api';
const { Option } = Select;

const RegistroCliente = () => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  const CLIENT_ROLE_ID = 3; 

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await api.get('/api/distrito');
        const data = response.data.data || response.data;
        setDistricts(data);
      } catch (error) {
        message.error('Error al cargar distritos');
      }
    };
    fetchDistricts();
  }, []);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        roleId: CLIENT_ROLE_ID, 
        fecha_nacimiento: values.fecha_nacimiento ? values.fecha_nacimiento.format('YYYY-MM-DD') : null,
      };
      await api.post('/api/users', payload);
      message.success('Registro exitoso. Ahora puede iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Error en el registro.');
      }
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Col xs={22} sm={18} md={12} lg={8}>
        <Card title="Registro como Cliente">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[{ required: true, message: 'El usuario es obligatorio' }]}
            >
              <Input placeholder="Ingrese su usuario" />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'La contraseña es obligatoria' }]}
            >
              <Input.Password placeholder="Ingrese su contraseña" />
            </Form.Item>
            <Form.Item
              label="Nombres"
              name="nombres"
              rules={[{ required: true, message: 'Los nombres son obligatorios' }]}
            >
              <Input placeholder="Ingrese sus nombres" />
            </Form.Item>
            <Form.Item
              label="Apellido Paterno"
              name="paterno"
              rules={[{ required: true, message: 'El apellido paterno es obligatorio' }]}
            >
              <Input placeholder="Ingrese su apellido paterno" />
            </Form.Item>
            <Form.Item
              label="Apellido Materno"
              name="materno"
            >
              <Input placeholder="Ingrese su apellido materno (opcional)" />
            </Form.Item>
            <Form.Item
              label="Fecha de Nacimiento"
              name="fecha_nacimiento"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Distrito"
              name="distritoId"
              rules={[{ required: true, message: 'El distrito es obligatorio' }]}
            >
              <Select placeholder="Seleccione su distrito">
                {districts.map(distrito => (
                  <Option key={distrito.id} value={distrito.id}>
                    {distrito.name || `Distrito ${distrito.id}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Registrarse
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegistroCliente;
