import React, { useEffect, useState } from "react";
import { Table, Input, Space, message, Button, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../api";
import UserModal from "../components/UserModal";
import { useAuth } from "../context/AuthContext";

const { Search } = Input;

const Activity = () => {
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

  const { token } = useAuth();

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
    console.log("Intentando eliminar usuario con id:", id);
    Modal.confirm({
      title: "¿Está seguro que desea eliminar este usuario?",
      content: "Esta acción no se puede deshacer.",
      centered: true,
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        console.log("Confirmación aceptada, se procede a eliminar");
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
          console.error("Error en delete:", error);
          message.error("Error al eliminar el usuario");
        }
      },
      onCancel: () => {
        console.log("Eliminación cancelada por el usuario");
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
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUser(record);
              setModalVisible(true);
            }}
            style={{ color: "yellow" }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
     {/*  <Button
        onClick={() =>
          Modal.confirm({
            title: "Prueba Modal",
            content: "Este es un modal de confirmación de prueba.",
            centered: true,
            okText: "Ok",
            cancelText: "Cancelar",
            onOk: () => console.log("Modal de prueba confirmado"),
            onCancel: () => console.log("Modal de prueba cancelado"),
          })
        }
      >
        Probar Modal
      </Button> */}

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar usuario"
          onSearch={handleSearch}
          enterButton
          allowClear
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUser(null);
            setModalVisible(true);
          }}
        >
          Crear Usuario
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
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

export default Activity;
