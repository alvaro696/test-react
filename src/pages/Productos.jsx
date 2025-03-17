import React, { useState } from 'react';
import { message } from 'antd';
import GenericCrud from '../components/GenericCrud';
import productModel from '../models/productModel';

const Productos = () => {
  const [data, setData] = useState([
    { id: 1, name: "Producto 1", price: 10, category: "A" },
    { id: 2, name: "Producto 2", price: 20, category: "B" },
    { id: 3, name: "Producto 3", price: 30, category: "A" },
  ]);

  const fetchProductos = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 500);
    });
  };

  const crearProducto = async (newData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
        const newProduct = { id: newId, ...newData };
        setData(prev => [...prev, newProduct]);
        message.success("Producto creado");
        resolve(newProduct);
      }, 500);
    });
  };

  const actualizarProducto = async (id, updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setData(prev => prev.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
        message.success("Producto actualizado");
        resolve();
      }, 500);
    });
  };

  const eliminarProducto = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setData(prev => prev.filter(item => item.id !== id));
        message.success("Producto eliminado");
        resolve();
      }, 500);
    });
  };

  return (
    <GenericCrud
      title="Gestión de Productos"
      columns={productModel}
      fetchData={fetchProductos}
      onCreate={crearProducto}
      onUpdate={actualizarProducto}
      onDelete={eliminarProducto}
    />
  );
};

export default Productos;
