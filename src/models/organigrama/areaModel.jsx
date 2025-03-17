import React from 'react';

const areaModel = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    formType: 'text',
  },
  {
    title: 'Código',
    dataIndex: 'codigo',
    formType: 'text',
  },
  {
    title: 'Gerencia',
    dataIndex: 'gerenciaId',
    formType: 'select',
    options: [],
    render: (_, record) => {
      return record.gerencia ? record.gerencia.name : 'Sin gerencia';
    },
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    formType: 'select',
    options: [
      { value: '1', label: 'Activo' },
      { value: '0', label: 'Inactivo' },
    ],
    render: (value) => (value === '1' ? 'Activo' : 'Inactivo'),
  },
];

export default areaModel;
