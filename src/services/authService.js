// src/services/authService.js
import { STORAGE_KEYS, DOCTORS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const authService = {
    login: (email, password, role) => {
        if (role === 'admin') {
            const doctor = DOCTORS.find(d => d.email === email && d.password === password);
            if (doctor) {
                const userData = { ...doctor, role: 'admin' };
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
                return { success: true, user: userData };
            }
            return { success: false, message: 'Email atau password dokter salah!' };
        } else {
            const patients = authService.getAllPatients();
            const patient = patients.find(p => p.email === email && p.password === password);
            if (patient) {
                const userData = { ...patient, role: 'patient' };
                localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
                return { success: true, user: userData };
            }
            return { success: false, message: 'Email atau password pasien salah!' };
        }
    },

    register: (formData) => {
        const patients = authService.getAllPatients();

        if (patients.some(p => p.email === formData.email)) {
            return { success: false, message: 'Email sudah terdaftar!' };
        }

        const newPatient = {
            id: generateId(),
            ...formData,
            registeredDate: new Date().toISOString(),
            role: 'patient'
        };

        patients.push(newPatient);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
        return { success: true, message: 'Registrasi berhasil! Silakan login.' };
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    getCurrentUser: () => {
        try {
            const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    },

    getAllPatients: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading patients:', error);
            return [];
        }
    }
};