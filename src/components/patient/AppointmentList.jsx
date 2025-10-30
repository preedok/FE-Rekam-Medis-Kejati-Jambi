// src/components/patient/AppointmentList.jsx
import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate, getStatusColor, getStatusText } from '../../utils/helpers';

const AppointmentList = ({ appointments }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Jadwal Saya</h2>
            {appointments.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Belum ada jadwal</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map(apt => (
                        <div key={apt.id} className={`border rounded-2xl p-6 ${apt.status === 'approved' ? 'border-green-200 bg-green-50' :
                                apt.status === 'pending' ? 'border-orange-200 bg-orange-50' :
                                    'border-red-200 bg-red-50'
                            } hover:shadow-lg transition-all`}>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-gray-800 text-lg">{apt.poli}</h3>
                                        <span className="text-xs bg-white/50 px-2 py-1 rounded-lg">
                                            {apt.doctorName}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {formatDate(apt.date)} - {apt.time}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">{apt.complaint}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(apt.status)}`}>
                                    {getStatusText(apt.status)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppointmentList;