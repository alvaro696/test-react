import React, { useEffect, useState } from "react";
import { Table, Input, Space, message, Spin, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import api from "../../api";
import * as XLSX from "xlsx"; 
import { saveAs } from "file-saver"; 

const { Search } = Input;

const Contactos = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); 
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    const fetchData = async (params = {}) => {
        setLoading(true);
        try {
            const response = await api.get("/api/users", {
                params: {
                    page: params.current,
                    limit: params.pageSize,
                },
            });

            setData(response.data.data);

            applySearch(response.data.data);
        } catch (error) {
            message.error("Error al obtener los datos de los contactos");
        } finally {
            setLoading(false);
        }
    };

    const applySearch = (users) => {
        if (!searchText) {
            setFilteredData(users);
            setPagination({
                current: 1,
                pageSize: pagination.pageSize,
                total: users.length,
            });
            return;
        }

        const searchedUsers = users.filter((user) => {
            const nombreCompleto = `${user.nombres} ${user.paterno} ${user.materno || ""}`.toLowerCase();
            const searchLower = searchText.toLowerCase();

            return (
                nombreCompleto.includes(searchLower) || 
                user.cargo.toLowerCase().includes(searchLower) ||
                user.gerencia.toLowerCase().includes(searchLower) ||
                user.area.toLowerCase().includes(searchLower) || 
                user.interno.includes(searchText) || 
                user.celular.includes(searchText) || 
                user.correo.toLowerCase().includes(searchLower) || 
                user.regional.toLowerCase().includes(searchLower) 
            );
        });

        setFilteredData(searchedUsers);

        setPagination({
            current: 1, 
            pageSize: pagination.pageSize,
            total: searchedUsers.length, 
        });
    };

    useEffect(() => {
        fetchData({ current: 1, pageSize: pagination.pageSize });
    }, []);

    useEffect(() => {
        applySearch(data);
    }, [searchText]);

    const handleTableChange = (pag) => {
        fetchData({
            current: pag.current,
            pageSize: pag.pageSize,
        });
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if (value === "") {
            fetchData({ current: 1, pageSize: pagination.pageSize });
        }
    };
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contactos");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(blob, "Lista de contactos.xlsx");
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: "Nombre completo",
            key: "nombreCompleto",
            render: (_, contacto) =>
                `${contacto.nombres} ${contacto.paterno} ${contacto.materno || ""}`,
            width: 200,
        },
        {
            title: "Cargo",
            dataIndex: "cargo",
            key: "cargo",
            width: 150,
        },
        {
            title: "Gerencia",
            dataIndex: "gerencia",
            key: "gerencia",
            width: 200,
        },
        {
            title: "Área",
            dataIndex: "area",
            key: "area",
            width: 150,
        },
        {
            title: "Interno",
            dataIndex: "interno",
            key: "interno",
            width: 100,
        },
        {
            title: "Celular",
            dataIndex: "celular",
            key: "celular",
            width: 120,
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
            width: 200,
        },
        {
            title: "Regional",
            dataIndex: "regional",
            key: "regional",
            width: 150,
        },
    ];

    return (
        <div style={{ padding: 5 }}>
            <h2>Contactos</h2>
            <Space style={{ marginBottom: 5 }}>
                <Search
                    placeholder="Buscar contacto..."
                    value={searchText}
                    onChange={handleInputChange}
                    onSearch={handleSearch}
                    enterButton
                    allowClear
                    style={{ width: 300 }}
                />

                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={exportToExcel}
                >
                    Descargar en Excel
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={filteredData} 
                rowKey="id"
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{ x: true }} 
                style={{ overflowX: "auto" }} 
            />
        </div>
    );
};

export default Contactos;