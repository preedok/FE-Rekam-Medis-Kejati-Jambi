// src/components/doctor/PoliList.jsx
import React from 'react';
import { formatDate, getStatusColor, getStatusText } from '../../utils/helpers';

const PoliList = ({ appointments, poli, icon: Icon }) => {
    const filteredAppointments = appointments.filter(a => a.poli === poli);

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="bg-teal-100 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-teal-600" />
                </div>
                {poli} - Pasien Saya
            </h2>
            {filteredAppointments.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Belum ada pasien {poli} untuk Anda</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAppointments.map(apt => (
                        <div key={apt.id} className={`border rounded-2xl p-6 ${poli === 'Poli Umum' ? 'border-purple-200 bg-purple-50' : 'border-orange-200 bg-orange-50'
                            } hover:shadow-lg transition-all`}>
                            <h3 className="font-semibold text-gray-800 text-lg">{apt.patientName}</h3>
                            <p className="text-sm text-gray-600 mt-2">{formatDate(apt.date)} - {apt.time}</p>
                            <p className="text-sm text-gray-600 mt-1">Keluhan: {apt.complaint}</p>
                            <span className={`inline-block mt-3 px-4 py-2 rounded-xl text-sm font-medium ${getStatusColor(apt.status)}`}>
                                {getStatusText(apt.status)}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PoliList;