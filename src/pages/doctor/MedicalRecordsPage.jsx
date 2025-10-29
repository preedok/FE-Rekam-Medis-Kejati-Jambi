import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import MedicalRecordsList from '../../components/doctor/MedicalRecordsList';

const MedicalRecordsPage = () => {
  const { user } = useAuth();
  const { records } = useMedicalRecords();

  const doctorRecords = records.filter(r => r.createdBy === user.name);

  return <MedicalRecordsList records={doctorRecords} />;
};

export default MedicalRecordsPage;
