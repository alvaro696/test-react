const productModel = [
    { title: 'Nombre', dataIndex: 'name', formType: 'text' },
    { title: 'Precio', dataIndex: 'price', formType: 'decimal' },
    {
        title: 'Categoría',
        dataIndex: 'category',
        formType: 'select',
        options: [
            { value: 'A', label: 'Categoría A' },
            { value: 'B', label: 'Categoría B' },
            { value: 'C', label: 'Categoría C' },
        ],
    },
];

export default productModel;