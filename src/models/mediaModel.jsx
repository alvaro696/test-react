import React from 'react';
import {
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileUnknownOutlined,
} from '@ant-design/icons';

const renderFileIcon = (fileUrl) => {
    if (!fileUrl) return null;
    const extension = fileUrl.split('.').pop().toLowerCase();
    switch (extension) {
        case 'pdf':
            return <FilePdfOutlined style = {
                { fontSize: '24px', color: '#f5222d' }
            }
            />;
        case 'doc':
        case 'docx':
            return <FileWordOutlined style = {
                { fontSize: '24px', color: '#1890ff' }
            }
            />;
        case 'xls':
        case 'xlsx':
            return <FileExcelOutlined style = {
                { fontSize: '24px', color: '#52c41a' }
            }
            />;
        default:
            return <FileUnknownOutlined style = {
                { fontSize: '24px' }
            }
            />;
    }
};

const mediaModel = [{
        title: 'Título',
        dataIndex: 'title',
        formType: 'text',
    },
    {
        title: 'Imagen',
        dataIndex: 'imageUrl',
        formType: 'file',
        accept: 'image/*',
        render: (text) =>
            text ? ( <
                img src = { text }
                alt = "Imagen"
                style = {
                    { width: '50px', height: 'auto', objectFit: 'cover' }
                }
                />
            ) : null,
    },
    {
        title: 'Archivo Multimedia',
        dataIndex: 'mediaUrl',
        formType: 'file',
        accept: '.pdf,.doc,.docx,.xls,.xlsx',
        required: false,
        render: (text) => renderFileIcon(text),
    },
];

export default mediaModel;