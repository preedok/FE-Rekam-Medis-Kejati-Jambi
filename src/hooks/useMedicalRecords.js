// src/hooks/useMedicalRecords.js
import { useState, useEffect } from 'react';
import { medicalRecordService } from '../services/medicalRecordService';

export const useMedicalRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = () => {
        setLoading(true);
        const data = medicalRecordService.getAll();
        setRecords(data);
        setLoading(false);
    };

    const createRecord = (recordData) => {
        const newRecord = medicalRecordService.create(recordData);
        setRecords(prev => [...prev, newRecord]);
        return newRecord;
    };

    const getRecordsByPatient = (patientId) => {
        return records.filter(record => record.patientId === patientId);
    };

    const getRecordsByDoctor = (doctorName) => {
        return records.filter(record => record.createdBy === doctorName);
    };

    const getRecordsByMonth = (month) => {
        return records.filter(record =>
            record.createdAt.slice(0, 7) === month
        );
    };

    const getRecordsByPoli = (poli) => {
        return records.filter(record => record.poli === poli);
    };

    return {
        records,
        loading,
        createRecord,
        getRecordsByPatient,
        getRecordsByDoctor,
        getRecordsByMonth,
        getRecordsByPoli,
        refreshRecords: loadRecords
    };
};