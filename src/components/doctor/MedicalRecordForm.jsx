// src/components/doctor/MedicalRecordForm.jsx
import React, { useState } from 'react';
import { ClipboardList, Stethoscope, Pill, Clock } from 'lucide-react';
import { formatDate, getMinDate } from '../../utils/helpers';

const MedicalRecordForm = ({ appointments, onSave, currentDoctorId, currentDoctorName }) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === currentDoctorId);
    const approvedAppointments = doctorAppointments.filter(a => a.status === 'approved');
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [formData, setFormData] = useState({
        anamnesa: '',
        objective: '',
        diagnosis: '',
        therapy: '',
        prescription: '',
        nextVisit: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointment = appointments.find(a => a.id === selectedAppointment);

        onSave({
            appointmentId: selectedAppointment,
            patientId: appointment.patientId,
            patientName: appointment.patientName,
            poli: appointment.poli,
            date: appointment.date,
            ...formData,
            createdBy: currentDoctorName
        });

        setSelectedAppointment('');
        setFormData({
            anamnesa: '',
            objective: '',
            diagnosis: '',
            therapy: '',
            prescription: '',
            nextVisit: ''
        });
        alert('Rekam medis berhasil disimpan!');
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="bg-teal-100 p-3 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-teal-600" />
                </div>
                Input Rekam Medis
            </h2>

            {approvedAppointments.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Stethoscope className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Tidak ada pasien yang perlu diperiksa</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Pasien</label>
                        <select
                            value={selectedAppointment}
                            onChange={(e) => setSelectedAppointment(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">-- Pilih Pasien --</option>
                            {approvedAppointments.map(apt => (
                                <option key={apt.id} value={apt.id}>
                                    {apt.patientName} - {apt.poli} ({formatDate(apt.date)} - {apt.time})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedAppointment && (
                        <>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Stethoscope className="w-4 h-4" />
                                    Anamnesa (Keluhan)
                                </label>
                                <textarea
                                    value={formData.anamnesa}
                                    onChange={(e) => setFormData({ ...formData, anamnesa: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    rows="3"
                                    placeholder="Keluhan pasien..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Objektif (Pemeriksaan)
                                </label>
                                <textarea
                                    value={formData.objective}
                                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    rows="3"
                                    placeholder="Hasil pemeriksaan fisik..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                                <textarea
                                    value={formData.diagnosis}
                                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    rows="3"
                                    placeholder="Diagnosis penyakit..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Terapi & Tindakan
                                </label>
                                <textarea
                                    value={formData.therapy}
                                    onChange={(e) => setFormData({ ...formData, therapy: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    rows="3"
                                    placeholder="Terapi dan tindakan..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Pill className="w-4 h-4" />
                                    Resep Obat
                                </label>
                                <textarea
                                    value={formData.prescription}
                                    onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    rows="4"
                                    placeholder="Daftar obat dan dosis..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="w-4 h-4" />
                                    Jadwal Kontrol Selanjutnya
                                </label>
                                <input
                                    type="date"
                                    value={formData.nextVisit}
                                    onChange={(e) => setFormData({ ...formData, nextVisit: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    min={getMinDate()}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            >
                                Simpan Rekam Medis
                            </button>
                        </>
                    )}
                </form>
            )}
        </div>
    );
};

export default MedicalRecordForm;