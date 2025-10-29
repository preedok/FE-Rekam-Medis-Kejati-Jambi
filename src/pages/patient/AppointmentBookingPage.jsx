import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import AppointmentBooking from '../../components/patient/AppointmentBooking';

const AppointmentBookingPage = () => {
  const { user } = useAuth();
  const { createAppointment } = useAppointments();

  const handleBook = (appointmentData) => {
    createAppointment(appointmentData);
  };

  return <AppointmentBooking user={user} onBook={handleBook} />;
};

export default AppointmentBookingPage;