import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentManagement from '../../components/doctor/AppointmentManagement';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus } = useAppointments();

  const handleUpdateStatus = (id, status) => {
    updateAppointmentStatus(id, status);
  };

  return (
    <AppointmentManagement 
      appointments={appointments}
      onUpdateStatus={handleUpdateStatus}
      currentDoctorId={user.id}
    />
  );
};

export default AppointmentsPage;