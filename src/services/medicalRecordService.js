// src/services/medicalRecordService.js
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const medicalRecordService = {
    getAll: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading medical records:', error);
            return [];
        }
    },

    create: (recordData) => {
        try {
            const records = medicalRecordService.getAll();
            const newRecord = {
                id: generateId(),
                ...recordData,
                createdAt: new Date().toISOString()
            };
            records.push(newRecord);
            localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(records));
            return newRecord;
        } catch (error) {
            console.error('Error creating medical record:', error);
            return null;
        }
    },

    getById: (id) => {
        const records = medicalRecordService.getAll();
        return records.find(record => record.id === id);
    },

    getByPatientId: (patientId) => {
        const records = medicalRecordService.getAll();
        return records.filter(record => record.patientId === patientId);
    },

    delete: (id) => {
        try {
            const records = medicalRecordService.getAll();
            const filtered = records.filter(record => record.id !== id);
            localStorage.setItem(STORAGE_KEYS.MEDICAL_RECORDS, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting medical record:', error);
            return false;
        }
    }
};