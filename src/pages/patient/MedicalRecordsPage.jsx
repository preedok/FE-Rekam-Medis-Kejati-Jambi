import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import MedicalRecordsList from '../../components/doctor/MedicalRecordsList';

const MedicalRecordsPage = () => {
  const { user } = useAuth();
  const { records } = useMedicalRecords();

  const userRecords = records.filter(r => r.patientId === user.id);

  return <MedicalRecordsList records={userRecords} />;
};

export default MedicalRecordsPage;