import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

const UserModal = ({ visible, onCancel, onSuccess, userData = null }) => {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await api.get("/api/roles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoles(response.data.data);
      } catch (error) {
        message.error("Error al obtener la lista de roles");
      }
    }
    fetchRoles();
  }, [token]);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        username: userData.username,
        roleId: userData.roleId, 
        status: userData.status,
      });
    } else {
      form.resetFields();
    }
  }, [userData, form, visible]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Datos a enviar:", values); // Verificar en consola
  
      await api.post("/api/users", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      message.success("Usuario creado correctamente");
      onSuccess();
      onCancel();
    } catch (error) {
      console.error("Error al guardar usuario:", error.response?.data || error);
      message.error("Error al guardar el usuario");
    }
  };

  return (
    <Modal
      visible={visible}
      title={userData ? "Editar Usuario" : "Crear Usuario"}
      onCancel={onCancel}
      onOk={handleOk}
      okText={userData ? "Actualizar" : "Crear"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Usuario"
          rules={[{ required: true, message: "Por favor ingrese el username" }]}
        >
          <Input placeholder="Ingrese el username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: !userData, message: "Por favor ingrese la contraseña" },
          ]}
        >
          <Input.Password placeholder={userData ? "Dejar vacío si no desea cambiar" : "Ingrese la contraseña"} />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Rol"
          rules={[{ required: true, message: "Por favor seleccione el rol" }]}
        >
          <Select placeholder="Seleccione un rol">
            {roles.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Estado"
          initialValue="1"
          rules={[{ required: true, message: "Por favor seleccione el estado" }]}
        >
          <Select placeholder="Seleccione el estado">
            <Option value="1">Activo</Option>
            <Option value="0">Inactivo</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
