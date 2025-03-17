import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Upload, Popconfirm, message } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const GenericCrud = ({ title, columns, fetchData, onCreate, onUpdate, onDelete }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const loadData = async () => {
        setLoading(true);
        try {
            const result = await fetchData();
            setData(result);
        } catch (error) {
            message.error("Error al cargar los datos");
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        const initialValues = record.gerencia ? { ...record, gerenciaId: record.gerencia.id } : record;
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await onDelete(id);
            message.success("Registro eliminado");
            loadData();
        } catch (error) {
            message.error("Error al eliminar registro");
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingRecord) {
                await onUpdate(editingRecord.id, values);
                message.success("Registro actualizado");
            } else {
                await onCreate(values);
                message.success("Registro creado");
            }
            setIsModalVisible(false);
            loadData();
        } catch (error) {
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const editIconStyle = { color: '#ffc107' };  
    const deleteIconStyle = { color: '#ff4d4f' }; 

    const operationColumn = {
        title: "Acciones",
        key: "actions",
        render: (_, record) => (
            <>
                <Button
                    onClick={() => handleEdit(record)}
                    type="link"
                    icon={<EditOutlined style={editIconStyle} />}
                    title="Editar"
                />
                <Popconfirm
                    title="¿Seguro que deseas eliminar este registro?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Sí"
                    cancelText="No"
                >
                    <Button
                        type="link"
                        icon={<DeleteOutlined style={deleteIconStyle} />}
                        title="Eliminar"
                    />
                </Popconfirm>
            </>
        ),
    };

    const extendedColumns = [...columns, operationColumn];

    const renderFormItem = (col) => {
        switch (col.formType) {
            case 'select':
                return (
                    <Select>
                        {col.options?.map(opt => (
                            <Select.Option key={opt.value} value={opt.value}>
                                {opt.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case 'number':
                return <InputNumber style={{ width: '100%' }} />;
            case 'decimal':
                return <InputNumber step={0.01} style={{ width: '100%' }} />;
            case 'file':
                return (
                    <Upload
                        accept={col.accept || '*'}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="text"
                        maxCount={1}
                        onChange={(info) => {
                            if (info.file.status === 'done') {
                                form.setFieldsValue({ [col.dataIndex]: info.file.response?.url || 'https://via.placeholder.com/150' });
                            }
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                    </Upload>
                );
            default:
                return <Input />;
        }
    };

    return (
        <div>
            <h2>{title}</h2>
            <Button type="primary" onClick={handleCreate} style={{ marginBottom: 16 }}>
                Nuevo Registro
            </Button>
            <div style={{ overflowX: 'auto' }}>
                <Table
                    columns={extendedColumns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            <Modal
                title={editingRecord ? "Editar Registro" : "Nuevo Registro"}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} layout="vertical">
                    {columns.map((col) => (
                        <Form.Item
                            key={col.dataIndex}
                            name={col.dataIndex}
                            label={col.title}
                            rules={[{ required: col.required !== false, message: `Por favor ingresa ${col.title}` }]}
                        >
                            {renderFormItem(col)}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    );
};

export default GenericCrud;
