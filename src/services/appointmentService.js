// src/services/appointmentService.js
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const appointmentService = {
    getAll: () => {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading appointments:', error);
            return [];
        }
    },

    create: (appointmentData) => {
        try {
            const appointments = appointmentService.getAll();
            const newAppointment = {
                id: generateId(),
                ...appointmentData,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            appointments.push(newAppointment);
            localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
            return newAppointment;
        } catch (error) {
            console.error('Error creating appointment:', error);
            return null;
        }
    },

    updateStatus: (id, status) => {
        try {
            const appointments = appointmentService.getAll();
            const updatedAppointments = appointments.map(apt =>
                apt.id === id ? { ...apt, status } : apt
            );
            localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updatedAppointments));
            return true;
        } catch (error) {
            console.error('Error updating appointment status:', error);
            return false;
        }
    },

    getById: (id) => {
        const appointments = appointmentService.getAll();
        return appointments.find(apt => apt.id === id);
    },

    delete: (id) => {
        try {
            const appointments = appointmentService.getAll();
            const filtered = appointments.filter(apt => apt.id !== id);
            localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting appointment:', error);
            return false;
        }
    }
};