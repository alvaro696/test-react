import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Modal, Button } from 'antd';
import '../../styles/CalendarCustom.css';

const reservationData = {
  '2025-03-15': {
    nombre: 'Juan Pérez',
    area: 'Marketing',
    horaInicio: '10:00',
    horaFin: '11:00',
    sala: 'Sala Piso 4'
  },
  '2025-03-16': {
    nombre: 'María Gómez',
    area: 'Recursos Humanos',
    horaInicio: '14:00',
    horaFin: '15:30',
    sala: 'Sala Piso 5'
  }
};

const SalaReuniones = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservation, setReservation] = useState(null);

  const onDateClick = (date) => {
    const dateString = date.toISOString().split('T')[0]; 
    setSelectedDate(date);
    if (reservationData[dateString]) {
      setReservation(reservationData[dateString]);
    } else {
      setReservation(null);
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sala de Reuniones</h2>
      <Calendar onClickDay={onDateClick} />
      <Modal
        title={`Reservas para ${selectedDate ? selectedDate.toLocaleDateString() : ''}`}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" type="primary" onClick={handleModalClose}>
            Cerrar
          </Button>,
        ]}
      >
        {reservation ? (
          <div>
            <p><strong>Nombre:</strong> {reservation.nombre}</p>
            <p><strong>Área:</strong> {reservation.area}</p>
            <p><strong>Hora de Inicio:</strong> {reservation.horaInicio}</p>
            <p><strong>Hora de Fin:</strong> {reservation.horaFin}</p>
            <p><strong>Descripción:</strong> {reservation.sala} está ocupada.</p>
          </div>
        ) : (
          <p>No hay reservas para esta fecha.</p>
        )}
      </Modal>
    </div>
  );
};

export default SalaReuniones;
