// src/pages/Transferencias.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, InputNumber, Select, Spin, message } from 'antd';
import api from '../api';
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

const Transferencias = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOperationType, setSelectedOperationType] = useState("1");
  const [form] = Form.useForm();

  // Función para obtener las cuentas del usuario
  const fetchUserAccounts = async () => {
    try {
      const response = await api.get('/api/cuentas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const accounts = response.data.data || response.data;
      setAvailableAccounts(accounts);
    } catch (error) {
      console.error("Error al obtener cuentas:", error);
      message.error("Error al cargar cuentas.");
    }
  };

  // Función para obtener las transacciones
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/transaccion', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data || response.data;
      setTransactions(data);
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      message.error("Error al cargar transacciones.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserAccounts();
    fetchTransactions();
  }, [token]);

  // Handler para crear una nueva transacción
  const handleFormSubmit = async (values) => {
    try {
      console.log("Valores de la transacción:", values);
      await api.post('/api/transaccion', values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Transacción realizada correctamente.");
      setModalVisible(false);
      form.resetFields();
      fetchTransactions();
    } catch (error) {
      console.error("Error al crear transacción:", error);
      message.error("Error al realizar la transacción.");
    }
  };

  // Columnas para la tabla de transacciones
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
      render: (tipo) => {
        switch (tipo) {
          case "1":
            return "Depósito";
          case "2":
            return "Retiro";
          case "3":
            return "Transferencia";
          default:
            return tipo;
        }
      },
    },
    {
      title: "Cuenta Origen",
      dataIndex: "origen",
      key: "origen",
      render: (origen) => {
        const account = availableAccounts.find(acc => acc.id === origen);
        return account ? (account.nombre || `Cuenta #${account.id}`) : origen;
      },
    },
    {
      title: "Cuenta Destino",
      dataIndex: "destino",
      key: "destino",
      render: (destino) => {
        if (!destino) return "-";
        const account = availableAccounts.find(acc => acc.id === destino);
        return account ? (account.nombre || `Cuenta #${account.id}`) : destino;
      },
    },
    {
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      render: (monto) => `$ ${parseFloat(monto).toFixed(2)}`,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Botón para abrir el modal de operación */}
      <Button 
        type="primary" 
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Realizar Operación
      </Button>

      {/* Tabla de transacciones */}
      {loading ? (
        <Spin size="large" tip="Cargando transacciones..." />
      ) : (
        <Table 
          dataSource={transactions} 
          columns={columns} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {/* Modal para crear una transacción */}
      <Modal
        visible={modalVisible}
        title="Realizar Operación"
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText="Confirmar"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{ tipo: "1", monto: 0 }}
          onValuesChange={(changedValues) => {
            if (changedValues.tipo) {
              setSelectedOperationType(changedValues.tipo);
            }
          }}
        >
          {/* Selección de la cuenta de origen */}
          <Form.Item
            name="origen"
            label="Cuenta Origen"
            rules={[{ required: true, message: "Seleccione la cuenta de origen" }]}
          >
            <Select placeholder="Seleccione la cuenta de origen">
              {availableAccounts.map(account => (
                <Option key={account.id} value={account.id}>
                  {account.nombre || `Cuenta #${account.id}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Selección del tipo de operación */}
          <Form.Item
            name="tipo"
            label="Tipo de Operación"
            rules={[{ required: true, message: "Seleccione el tipo de operación" }]}
          >
            <Select placeholder="Seleccione el tipo de operación">
              <Option value="1">Depósito</Option>
              <Option value="2">Retiro</Option>
              <Option value="3">Transferencia</Option>
            </Select>
          </Form.Item>

          {/* Ingreso del monto */}
          <Form.Item
            name="monto"
            label="Monto"
            rules={[{ required: true, message: "Ingrese el monto" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              formatter={(value) => `$ ${value}`}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          {/* Campo de selección para la cuenta destino solo si es transferencia */}
          {selectedOperationType === "3" && (
            <Form.Item
              name="destino"
              label="Cuenta Destino"
              rules={[{ required: true, message: "Seleccione la cuenta destino" }]}
            >
              <Select placeholder="Seleccione la cuenta destino">
                {availableAccounts.map(account => (
                  <Option key={account.id} value={account.id}>
                    {account.nombre || `Cuenta #${account.id}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Transferencias;
