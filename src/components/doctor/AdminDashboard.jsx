// src/components/doctor/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, ClipboardList, Stethoscope, Activity, Calendar, Download } from 'lucide-react';
import { DOCTORS } from '../../utils/constants';
import { authService } from '../../services/authService';

const AdminDashboard = ({ user, appointments, medicalRecords }) => {
    const navigate = useNavigate();
    const doctorAppointments = appointments.filter(a => a.doctorId === user.id);
    const pendingAppointments = doctorAppointments.filter(a => a.status === 'pending').length;
    const todayAppointments = doctorAppointments.filter(a => {
        const today = new Date().toISOString().split('T')[0];
        return a.date === today;
    }).length;

    const patients = authService.getAllPatients();
    const totalPatients = patients.length;
    const doctorRecords = medicalRecords.filter(r => r.createdBy === user.name);
    const totalRecords = doctorRecords.length;
    const currentDoctor = DOCTORS.find(d => d.id === user.id);

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-6 h-6" />
                            <p className="text-sm opacity-90">
                                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Selamat Pagi, {user.name}! 👋</h1>
                        <p className="text-lg opacity-90">Semoga hari Anda menyenangkan dalam melayani pasien</p>
                        <p className="text-sm opacity-90 mt-2 font-medium">📅 Jadwal Praktik: {currentDoctor?.schedule}</p>
                    </div>
                    <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-center">
                            <p className="text-sm opacity-90 mb-1">Hari Ini</p>
                            <p className="text-3xl font-bold mb-1">{todayAppointments}</p>
                            <p className="text-sm">Pasien Baru</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-3xl font-bold mb-1">{pendingAppointments}</p>
                            <p className="text-sm">Menunggu Approval</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Users className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{totalPatients}</span>
                    </div>
                    <p className="text-sm opacity-90">Total Pasien</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FileText className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{totalRecords}</span>
                    </div>
                    <p className="text-sm opacity-90">Rekam Medis Saya</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <ClipboardList className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{doctorAppointments.filter(a => a.poli === 'Poli Umum').length}</span>
                    </div>
                    <p className="text-sm opacity-90">Pasien Poli Umum</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Stethoscope className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{doctorAppointments.filter(a => a.poli === 'Poli Gigi').length}</span>
                    </div>
                    <p className="text-sm opacity-90">Pasien Poli Gigi</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Users, title: 'Data Pasien', desc: 'Lihat semua data pasien', color: 'teal', path: '/patients' },
                        { icon: FileText, title: 'Rekam Medis', desc: 'Input rekam medis baru', color: 'blue', path: '/medical-form' },
                        { icon: Calendar, title: 'Jadwal Hari Ini', desc: 'Lihat jadwal pemeriksaan', color: 'purple', path: '/appointments' },
                        { icon: Download, title: 'Export Data', desc: 'Unduh laporan', color: 'orange', path: '/report' }
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate(item.path)}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-teal-500 group"
                        >
                            <div className={`bg-${item.color}-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${item.color}-500 transition-all`}>
                                <item.icon className={`w-7 h-7 text-${item.color}-600 group-hover:text-white transition-all`} />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;