import React, { useEffect, useState } from "react";
import { Table, Input, Space, message, Button, Modal } from "antd";
import { UserAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../api";
import UserModal from "../components/UserModal";
import { useAuth } from "../context/AuthContext";

const { Search } = Input;

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { token, user } = useAuth();

  const canRead = user?.permissions?.includes("read_user");
  const canCreate = user?.permissions?.includes("create_user");
  const canUpdate = user?.permissions?.includes("update_user");
  const canDelete = user?.permissions?.includes("delete_user");

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await api.get("/api/users", {
        params: {
          page: params.current,
          limit: params.pageSize,
          search: searchText,
        },
      });
      setData(response.data.data);
      setPagination({
        current: params.current,
        pageSize: params.pageSize,
        total: response.data.total,
      });
    } catch (error) {
      message.error("Error al obtener los datos de los usuarios");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData({ current: 1, pageSize: pagination.pageSize });
  }, [searchText]);

  const handleTableChange = (pag, filters, sorter) => {
    fetchData({
      current: pag.current,
      pageSize: pag.pageSize,
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Está seguro que desea eliminar este usuario?",
      content: "Esta acción no se puede deshacer.",
      centered: true,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await api.delete(`/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          message.success("Usuario eliminado correctamente");
          fetchData({
            current: pagination.current,
            pageSize: pagination.pageSize,
          });
        } catch (error) {
          message.error("Error al eliminar el usuario");
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Rol",
      dataIndex: "role", 
      key: "role",
      render: (role) => role || "No asignado",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status.toUpperCase() === "ACTIVE" ? "Activo" : "Inactivo",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space>
          {canUpdate && (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingUser(record);
                setModalVisible(true);
              }}
              style={{ color: "orange" }}
            />
          )}
          {canDelete && (
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              style={{ color: "red" }}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar usuario"
          onSearch={handleSearch}
          enterButton
          allowClear
        />
        {canCreate && (
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => {
              setEditingUser(null);
              setModalVisible(true);
            }}
          >
            Crear Usuario
          </Button>
        )}
      </Space>

      {canRead && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      )}
      <UserModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() =>
          fetchData({ current: 1, pageSize: pagination.pageSize })
        }
        userData={editingUser}
      />
    </div>
  );
};

export default AdminPanel;
