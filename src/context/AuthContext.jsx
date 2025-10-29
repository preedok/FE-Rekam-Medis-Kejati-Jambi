// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { DOCTORS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (from localStorage)
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password, role) => {
        if (role === 'admin') {
            const doctor = DOCTORS.find(d => d.email === email && d.password === password);
            if (doctor) {
                const userData = { ...doctor, role: 'admin' };
                setUser(userData);
                localStorage.setItem('currentUser', JSON.stringify(userData));
                return { success: true };
            } else {
                return { success: false, message: 'Email atau password dokter salah!' };
            }
        } else {
            const patients = JSON.parse(localStorage.getItem('patients') || '[]');
            const patient = patients.find(p => p.email === email && p.password === password);
            if (patient) {
                const userData = { ...patient, role: 'patient' };
                setUser(userData);
                localStorage.setItem('currentUser', JSON.stringify(userData));
                return { success: true };
            } else {
                return { success: false, message: 'Email atau password pasien salah!' };
            }
        }
    };

    const register = (formData) => {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');

        if (patients.some(p => p.email === formData.email)) {
            return { success: false, message: 'Email sudah terdaftar!' };
        }

        const newPatient = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            registeredDate: new Date().toISOString(),
            role: 'patient'
        };

        patients.push(newPatient);
        localStorage.setItem('patients', JSON.stringify(patients));
        return { success: true, message: 'Registrasi berhasil! Silakan login.' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};