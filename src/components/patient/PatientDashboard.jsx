// src/components/patient/PatientDashboard.jsx
import React from 'react';
import { Calendar, Activity, FileText } from 'lucide-react';

const PatientDashboard = ({ user, appointments, medicalRecords }) => {
    const upcomingAppointments = appointments.filter(a =>
        a.status === 'approved' && new Date(a.date) >= new Date()
    ).length;

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-90 mb-2">Selamat Datang Kembali</p>
                        <h1 className="text-4xl font-bold mb-2">{user.name}! 👋</h1>
                        <p className="text-lg opacity-90">Semoga Anda selalu sehat</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold mb-1">{upcomingAppointments}</p>
                                <p className="text-sm opacity-90">Janji Mendatang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Calendar className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{upcomingAppointments}</span>
                    </div>
                    <p className="text-sm opacity-90">Janji Mendatang</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Activity className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{appointments.length}</span>
                    </div>
                    <p className="text-sm opacity-90">Total Kunjungan</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FileText className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{medicalRecords.length}</span>
                    </div>
                    <p className="text-sm opacity-90">Rekam Medis</p>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;