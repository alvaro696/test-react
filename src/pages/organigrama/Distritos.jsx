import React from 'react';
import api from '../../api';
import GenericCrud from '../../components/GenericCrud';
import distritoModel from '../../models/organigrama/distritos';

const Distritos = () => {
    const fetchDistrito = async () => {
        try {
            const { data } = await api.get('/api/distrito');
            return data;
        } catch (error) {
            return [];
        }
    };

    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    //delete ES FALLANDO EN TODOS
    const crearDistrito = async (newData) => {
        try {
            const { data } = await api.post('/api/distrito', newData);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const actualizarDistrito = async (id, updatedData) => {
        try {
            await api.put(`/api/distrito/${id}`, updatedData);
        } catch (error) {
            throw error;
        }
    };

    const eliminarDistrito = async (id) => {
        try {
            await api.delete(`/api/distrito/${id}`);
        } catch (error) {
            throw error;
        }
    };

    return (
        <GenericCrud
            title="Gestión de Distritos"
            columns={distritoModel}
            fetchData={fetchDistrito}
            onCreate={crearDistrito}
            onUpdate={actualizarDistrito}
            onDelete={eliminarDistrito}
        />
    );
};

export default Distritos;
