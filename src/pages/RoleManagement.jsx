import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Checkbox,
  message,
  Tag,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const { token } = useAuth();
  const [form] = Form.useForm();

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(response.data.data);
    } catch (error) {
      message.error("Error al obtener los roles");
    }
    setLoading(false);
  };

  const fetchPermissions = async () => {
    try {
      const response = await api.get("/api/permissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const permsOptions = response.data.data.map((perm) => ({
        label: perm.name,
        value: perm.name,
      }));
      setAvailablePermissions(permsOptions);
    } catch (error) {
      message.error("Error al obtener la lista de permisos");
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, [token]);

  const handleDeleteRole = (roleId) => {
    Modal.confirm({
      title: "¿Está seguro que desea eliminar este rol?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await api.delete(`/api/roles/${roleId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          message.success("Rol eliminado correctamente");
          fetchRoles();
        } catch (error) {
          message.error("Error al eliminar el rol");
        }
      },
    });
  };

  const openModalForEdit = (role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      permissions: role.permissions, 
    });
    setModalVisible(true);
  };

  const openModalForCreate = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        await api.put(`/api/roles/${editingRole.id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Rol actualizado correctamente");
      } else {
        await api.post("/api/roles", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Rol creado correctamente");
      }
      setModalVisible(false);
      fetchRoles();
    } catch (error) {
      message.error("Error al guardar el rol");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Nombre", dataIndex: "name", key: "name" },
    {
      title: "Permisos",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions) =>
        Array.isArray(permissions) ? (
          <>
            {permissions.map((perm) => (
              <Tag color="blue" key={perm}>
                {perm}
              </Tag>
            ))}
          </>
        ) : (
          "No asignado"
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModalForEdit(record)}
            style={{ color: "yellow" }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRole(record.id)}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestión de Roles</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={openModalForCreate}
        style={{ marginBottom: 16 }}
      >
        Crear Rol
      </Button>
      <Table columns={columns} dataSource={roles} rowKey="id" loading={loading} />
      <Modal
        visible={modalVisible}
        title={editingRole ? "Editar Rol" : "Crear Rol"}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText={editingRole ? "Actualizar" : "Crear"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre del Rol"
            rules={[{ required: true, message: "Por favor ingrese el nombre del rol" }]}
          >
            <Input placeholder="Ingrese el nombre del rol" />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="Permisos"
            rules={[{ required: true, message: "Por favor seleccione al menos un permiso" }]}
          >
            <Checkbox.Group options={availablePermissions} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
