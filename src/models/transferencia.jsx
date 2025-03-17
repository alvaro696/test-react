import React from 'react';

const transferenciaModel = [
  {
    title: 'Tipo de Transacción',
    dataIndex: 'tipo',
    formType: 'select',
    options: [
      { value: '1', label: 'DEPOSITO' },
      { value: '2', label: 'RETIRO' },
      { value: '3', label: 'TRANSFERENCIA' },
    ],
    render: (value) => {
      const option = [
        { value: '1', label: 'DEPOSITO' },
        { value: '2', label: 'RETIRO' },
        { value: '3', label: 'TRANSFERENCIA' },
      ].find(opt => opt.value === value);
      return option ? option.label : value;
    },
  },
  {
    title: 'monto',
    dataIndex: 'monto',
    formType: 'number',
  },
  {
    title: 'Origen',
    dataIndex: 'origen',
    formType: 'number',
  },
  {
    title: 'Destino',
    dataIndex: 'destino',
    formType: 'number',
  },
];

export default transferenciaModel;
