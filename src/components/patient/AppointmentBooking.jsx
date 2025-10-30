// src/components/patient/AppointmentBooking.jsx
import React, { useState, useEffect } from 'react';
import { DOCTORS, POLI_TYPES } from '../../utils/constants';
import { getMinDate } from '../../utils/helpers';

const AppointmentBooking = ({ user, onBook }) => {
    const [formData, setFormData] = useState({
        poli: POLI_TYPES.UMUM,
        doctorId: '',
        date: '',
        time: '',
        complaint: ''
    });
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        if (formData.doctorId) {
            const doctor = DOCTORS.find(d => d.id === formData.doctorId);
            setAvailableTimes(doctor ? doctor.availableTimes : []);
            setFormData(prev => ({ ...prev, time: '' }));
        }
    }, [formData.doctorId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDoctor = DOCTORS.find(d => d.id === formData.doctorId);

        onBook({
            patientId: user.id,
            patientName: user.name,
            doctorId: formData.doctorId,
            doctorName: selectedDoctor.name,
            poli: formData.poli,
            date: formData.date,
            time: formData.time,
            complaint: formData.complaint
        });

        setFormData({ poli: POLI_TYPES.UMUM, doctorId: '', date: '', time: '', complaint: '' });
        setAvailableTimes([]);
        alert('Pendaftaran berhasil! Menunggu konfirmasi dari dokter.');
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Poli</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Poli</label>
                    <select
                        value={formData.poli}
                        onChange={(e) => setFormData({ ...formData, poli: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                        <option>{POLI_TYPES.UMUM}</option>
                        <option>{POLI_TYPES.GIGI}</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Dokter</label>
                    <select
                        value={formData.doctorId}
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                    >
                        <option value="">-- Pilih Dokter --</option>
                        {DOCTORS.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name} ({doctor.schedule})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            min={getMinDate()}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jam</label>
                        <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                            disabled={!formData.doctorId}
                        >
                            <option value="">Pilih Jam</option>
                            {availableTimes.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        {!formData.doctorId && (
                            <p className="text-xs text-gray-500 mt-1">Pilih dokter terlebih dahulu</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keluhan</label>
                    <textarea
                        value={formData.complaint}
                        onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        rows="4"
                        placeholder="Deskripsikan keluhan Anda..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    Daftar Sekarang
                </button>
            </form>
        </div>
    );
};

export default AppointmentBooking;