// src/components/doctor/MedicalRecordForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ClipboardList, Stethoscope, Pill, Clock, Search, X, User } from 'lucide-react';
import { formatDate, getMinDate } from '../../utils/helpers';

const MedicalRecordForm = ({ appointments, onSave, currentDoctorId, currentDoctorName }) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === currentDoctorId);
    const approvedAppointments = doctorAppointments.filter(a => a.status === 'approved');

    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState(approvedAppointments);
    const searchRef = useRef(null);

    const [formData, setFormData] = useState({
        anamnesa: '',
        objective: '',
        diagnosis: '',
        therapy: '',
        prescription: '',
        nextVisit: ''
    });

    // Filter appointments based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredAppointments(approvedAppointments);
        } else {
            const filtered = approvedAppointments.filter(apt => {
                const searchLower = searchQuery.toLowerCase();
                return (
                    apt.patientName.toLowerCase().includes(searchLower) ||
                    apt.poli.toLowerCase().includes(searchLower) ||
                    apt.date.includes(searchQuery) ||
                    (apt.time && apt.time.toLowerCase().includes(searchLower))
                );
            });
            setFilteredAppointments(filtered);
        }
    }, [searchQuery, approvedAppointments]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleSelectAppointment = (apt) => {
        setSelectedAppointment(apt.id);
        setSearchQuery(`${apt.patientName} - ${apt.poli} (${formatDate(apt.date)} - ${apt.time})`);
        setShowDropdown(false);
    };

    const handleClearSelection = () => {
        setSelectedAppointment('');
        setSearchQuery('');
        setShowDropdown(false);
    };

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

        // Reset form
        setSelectedAppointment('');
        setSearchQuery('');
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
                    {/* Autocomplete Search Patient */}
                    <div ref={searchRef} className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pilih Pasien
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowDropdown(true);
                                    if (selectedAppointment) {
                                        setSelectedAppointment('');
                                    }
                                }}
                                onFocus={() => setShowDropdown(true)}
                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                placeholder="Cari nama pasien, poli, atau tanggal..."
                                required={!selectedAppointment}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={handleClearSelection}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Dropdown Results */}
                        {showDropdown && (
                            <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
                                {filteredAppointments.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        <p>Tidak ada hasil ditemukan</p>
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        {filteredAppointments.map(apt => (
                                            <button
                                                key={apt.id}
                                                type="button"
                                                onClick={() => handleSelectAppointment(apt)}
                                                className={`w-full px-4 py-3 text-left hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 ${selectedAppointment === apt.id ? 'bg-teal-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                                        <User className="w-5 h-5 text-teal-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-800 mb-1">
                                                            {apt.patientName}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                                {apt.poli}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            {formatDate(apt.date)} • {apt.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {selectedAppointment && (
                        <>
                            {/* Selected Patient Info */}
                            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                                <p className="text-sm font-medium text-teal-800 mb-1">Pasien Terpilih:</p>
                                <p className="text-teal-900 font-semibold">
                                    {appointments.find(a => a.id === selectedAppointment)?.patientName}
                                </p>
                            </div>

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