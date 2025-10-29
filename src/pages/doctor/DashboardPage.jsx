import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import AdminDashboard from '../../components/doctor/AdminDashboard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const { records } = useMedicalRecords();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <AdminDashboard 
      user={user} 
      appointments={appointments} 
      medicalRecords={records}
      onNavigate={handleNavigate}
    />
  );
};

export default DashboardPage;
