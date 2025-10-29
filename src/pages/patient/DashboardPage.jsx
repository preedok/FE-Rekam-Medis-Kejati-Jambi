import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import PatientDashboard from '../../components/patient/PatientDashboard';
import ControlScheduleNotifications from '../../components/patient/ControlScheduleNotifications';

const DashboardPage = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const { records } = useMedicalRecords();

  const userAppointments = appointments.filter(a => a.patientId === user.id);
  const userRecords = records.filter(r => r.patientId === user.id);

  return (
    <div className="space-y-6">
      <ControlScheduleNotifications records={userRecords} />
      <PatientDashboard 
        user={user} 
        appointments={userAppointments} 
        medicalRecords={userRecords} 
      />
    </div>
  );
};

export default DashboardPage;