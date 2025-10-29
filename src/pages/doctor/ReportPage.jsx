import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import MonthlyReport from '../../components/doctor/MonthlyReport';

const ReportPage = () => {
  const { user } = useAuth();
  const { records } = useMedicalRecords();

  const doctorRecords = records.filter(r => r.createdBy === user.name);

  return <MonthlyReport records={doctorRecords} />;
};

export default ReportPage;