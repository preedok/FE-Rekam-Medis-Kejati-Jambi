import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import MedicalRecordForm from '../../components/doctor/MedicalRecordForm';

const MedicalRecordFormPage = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const { createRecord } = useMedicalRecords();

  const handleSave = (recordData) => {
    createRecord(recordData);
  };

  return (
    <MedicalRecordForm 
      appointments={appointments}
      onSave={handleSave}
      currentDoctorId={user.id}
      currentDoctorName={user.name}
    />
  );
};

export default MedicalRecordFormPage;