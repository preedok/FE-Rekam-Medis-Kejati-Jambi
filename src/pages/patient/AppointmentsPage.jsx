import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentList from '../../components/patient/AppointmentList';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const userAppointments = appointments.filter(a => a.patientId === user.id);

  return <AppointmentList appointments={userAppointments} />;
};

export default AppointmentsPage;