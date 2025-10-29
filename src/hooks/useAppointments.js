// src/hooks/useAppointments.js
import { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = () => {
        setLoading(true);
        const data = appointmentService.getAll();
        setAppointments(data);
        setLoading(false);
    };

    const createAppointment = (appointmentData) => {
        const newAppointment = appointmentService.create(appointmentData);
        setAppointments(prev => [...prev, newAppointment]);
        return newAppointment;
    };

    const updateAppointmentStatus = (id, status) => {
        const updated = appointmentService.updateStatus(id, status);
        if (updated) {
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? { ...apt, status } : apt)
            );
        }
        return updated;
    };

    const getAppointmentsByPatient = (patientId) => {
        return appointments.filter(apt => apt.patientId === patientId);
    };

    const getAppointmentsByDoctor = (doctorId) => {
        return appointments.filter(apt => apt.doctorId === doctorId);
    };

    const getPendingAppointments = (doctorId) => {
        return appointments.filter(
            apt => apt.doctorId === doctorId && apt.status === 'pending'
        );
    };

    const getApprovedAppointments = (doctorId) => {
        return appointments.filter(
            apt => apt.doctorId === doctorId && apt.status === 'approved'
        );
    };

    return {
        appointments,
        loading,
        createAppointment,
        updateAppointmentStatus,
        getAppointmentsByPatient,
        getAppointmentsByDoctor,
        getPendingAppointments,
        getApprovedAppointments,
        refreshAppointments: loadAppointments
    };
};