import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const { token, user } = useAuth();
  const [form] = Form.useForm();

  const canCreate = user?.permissions?.includes("create_permission") || user?.permissions?.includes("manage_permissions");
  const canUpdate = user?.permissions?.includes("update_permission") || user?.permissions?.includes("manage_permissions");
  const canDelete = user?.permissions?.includes("delete_permission") || user?.permissions?.includes("manage_permissions");

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/permissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermissions(response.data.data);
    } catch (error) {
      message.error("Error al obtener los permisos");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPermissions();
  }, [token]);

  const handleDeletePermission = (id) => {
    Modal.confirm({
      title: "¿Está seguro que desea eliminar este permiso?",
      content: "Esta acción no se puede deshacer.",
      onOk: async () => {
        try {
          await api.delete(`/api/permissions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          message.success("Permiso eliminado correctamente");
          fetchPermissions();
        } catch (error) {
          message.error("Error al eliminar el permiso");
        }
      },
    });
  };

  const openModalForEdit = (permission) => {
    setEditingPermission(permission);
    form.setFieldsValue({
      name: permission.name,
      description: permission.description,
    });
    setModalVisible(true);
  };

  const openModalForCreate = () => {
    setEditingPermission(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPermission) {
        await api.put(`/api/permissions/${editingPermission.id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Permiso actualizado correctamente");
      } else {
        await api.post("/api/permissions", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Permiso creado correctamente");
      }
      setModalVisible(false);
      fetchPermissions();
    } catch (error) {
      message.error("Error al guardar el permiso");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Descripción", dataIndex: "description", key: "description" },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space>
          {canUpdate && (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => openModalForEdit(record)}
              style={{ color: "yellow" }}
            />
          )}
          {canDelete && (
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDeletePermission(record.id)}
              style={{ color: "red" }}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestión de Permisos</h1>
      {canCreate && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openModalForCreate}
          style={{ marginBottom: 16 }}
        >
          Crear Permiso
        </Button>
      )}
      <Table columns={columns} dataSource={permissions} rowKey="id" loading={loading} />
      <Modal
        visible={modalVisible}
        title={editingPermission ? "Editar Permiso" : "Crear Permiso"}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText={editingPermission ? "Actualizar" : "Crear"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Por favor ingrese el nombre del permiso" }]}
          >
            <Input placeholder="Ingrese el nombre del permiso" />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input placeholder="Ingrese una descripción (opcional)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
