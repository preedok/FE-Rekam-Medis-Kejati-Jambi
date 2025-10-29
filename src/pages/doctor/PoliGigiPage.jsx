import React from 'react';
import { Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import PoliList from '../../components/doctor/PoliList';
import { POLI_TYPES } from '../../utils/constants';

const PoliGigiPage = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const doctorAppointments = appointments.filter(a => a.doctorId === user.id);

  return (
    <PoliList 
      appointments={doctorAppointments}
      poli={POLI_TYPES.GIGI}
      icon={Activity}
    />
  );
};

export default PoliGigiPage;
