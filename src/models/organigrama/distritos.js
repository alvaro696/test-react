const distritoModel = [{
        title: 'Nombre',
        dataIndex: 'name',
        formType: 'text',
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

export default distritoModel;