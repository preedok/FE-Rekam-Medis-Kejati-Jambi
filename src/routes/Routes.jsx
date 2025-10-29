// src/routes/Routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Auth Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Patient Pages
import PatientDashboardPage from '../pages/patient/DashboardPage';
import AppointmentBookingPage from '../pages/patient/AppointmentBookingPage';
import PatientAppointmentsPage from '../pages/patient/AppointmentsPage';
import PatientRecordsPage from '../pages/patient/MedicalRecordsPage';

// Doctor Pages
import DoctorDashboardPage from '../pages/doctor/DashboardPage';
import PatientsPage from '../pages/doctor/PatientsPage';
import DoctorAppointmentsPage from '../pages/doctor/AppointmentsPage';
import MedicalRecordFormPage from '../pages/doctor/MedicalRecordFormPage';
import PoliUmumPage from '../pages/doctor/PoliUmumPage';
import PoliGigiPage from '../pages/doctor/PoliGigiPage';
import DoctorRecordsPage from '../pages/doctor/MedicalRecordsPage';
import ReportPage from '../pages/doctor/ReportPage';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Layout
import Layout from '../components/common/Layout';

function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
            <Route
                path="/register"
                element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    {/* Common Routes */}
                    <Route path="/dashboard" element={
                        user?.role === 'admin' ? <DoctorDashboardPage /> : <PatientDashboardPage />
                    } />

                    {/* Patient Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={['patient']} />}>
                        <Route path="/booking" element={<AppointmentBookingPage />} />
                        <Route path="/my-appointments" element={<PatientAppointmentsPage />} />
                        <Route path="/my-records" element={<PatientRecordsPage />} />
                    </Route>

                    {/* Doctor Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/appointments" element={<DoctorAppointmentsPage />} />
                        <Route path="/medical-form" element={<MedicalRecordFormPage />} />
                        <Route path="/poli-umum" element={<PoliUmumPage />} />
                        <Route path="/poli-gigi" element={<PoliGigiPage />} />
                        <Route path="/records" element={<DoctorRecordsPage />} />
                        <Route path="/report" element={<ReportPage />} />
                    </Route>
                </Route>
            </Route>

            {/* Redirect */}
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;