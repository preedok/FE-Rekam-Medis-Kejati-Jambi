// src/components/doctor/PatientList.jsx
import React from 'react';
import { Users, ClipboardList, } from 'lucide-react';
import { authService } from '../../services/authService';

const PatientList = () => {
    const patients = authService.getAllPatients();

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl flex gap-2 font-bold text-gray-800 mb-6">
                <div className="bg-teal-100 p-3 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-teal-600" />
                </div>
                Data Pasien</h2>
            {patients.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Belum ada data pasien</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {patients.map(patient => (
                        <div key={patient.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 text-lg">{patient.name}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                                        <div>
                                            <p className="text-gray-500">Email</p>
                                            <p className="text-gray-700 font-medium">{patient.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Telepon</p>
                                            <p className="text-gray-700 font-medium">{patient.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Gol. Darah</p>
                                            <p className="text-gray-700 font-medium">{patient.bloodType}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Jenis Kelamin</p>
                                            <p className="text-gray-700 font-medium">{patient.gender}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientList;