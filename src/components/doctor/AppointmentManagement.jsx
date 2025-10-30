// src/components/doctor/AppointmentManagement.jsx
import React from 'react';
import { Bell, Check, X, Calendar, ClipboardList, Stethoscope, FileText } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const AppointmentManagement = ({ appointments, onUpdateStatus, currentDoctorId }) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === currentDoctorId);
    const pendingAppointments = doctorAppointments.filter(a => a.status === 'pending');
    const approvedAppointments = doctorAppointments.filter(a => a.status === 'approved');

    return (
        <div className="space-y-6">
            {pendingAppointments.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <Bell className="w-6 h-6 text-orange-600" />
                        </div>
                        Menunggu Approval ({pendingAppointments.length})
                    </h2>

                    <div className="space-y-4">
                        {pendingAppointments.map(apt => (
                            <div key={apt.id} className="bg-orange-50 border border-orange-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg mb-3">{apt.patientName}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <ClipboardList className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Poli</p>
                                                    <p className="font-medium">{apt.poli}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Jadwal</p>
                                                    <p className="font-medium">{formatDate(apt.date)} - {apt.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Stethoscope className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Dokter</p>
                                                    <p className="font-medium">{apt.doctorName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <FileText className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Keluhan</p>
                                                    <p className="font-medium">{apt.complaint.substring(0, 30)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => onUpdateStatus(apt.id, 'approved')}
                                            className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                                            title="Terima"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onUpdateStatus(apt.id, 'rejected')}
                                            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                                            title="Tolak"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Jadwal Approved</h2>
                {approvedAppointments.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Belum ada jadwal yang disetujui</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {approvedAppointments.map(apt => (
                            <div key={apt.id} className="bg-green-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg mb-3">{apt.patientName}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <ClipboardList className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Poli</p>
                                                    <p className="font-medium">{apt.poli}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Jadwal</p>
                                                    <p className="font-medium">{formatDate(apt.date)} - {apt.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Stethoscope className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Dokter</p>
                                                    <p className="font-medium">{apt.doctorName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <FileText className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Keluhan</p>
                                                    <p className="font-medium">{apt.complaint.substring(0, 30)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-4 py-2 bg-green-500 text-white text-sm rounded-xl font-medium shadow-md">
                                        Disetujui
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentManagement;