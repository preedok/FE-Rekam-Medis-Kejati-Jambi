// src/components/doctor/MedicalRecordsList.jsx
import React from 'react';
import { FileText, Download, Clock } from 'lucide-react';
import { formatDate, downloadTextFile } from '../../utils/helpers';

const MedicalRecordsList = ({ records }) => {
    const downloadPDF = (record) => {
        const pdfContent = `
===========================================
      SURAT KETERANGAN RESEP OBAT
===========================================

Tanggal: ${formatDate(record.createdAt)}
No. Rekam Medis: ${record.id}

IDENTITAS PASIEN
Nama       : ${record.patientName}
Poli       : ${record.poli}
Tgl Periksa: ${formatDate(record.date)}

-------------------------------------------
ANAMNESA (KELUHAN):
${record.anamnesa}

-------------------------------------------
OBJEKTIF (PEMERIKSAAN):
${record.objective}

-------------------------------------------
DIAGNOSIS:
${record.diagnosis}

-------------------------------------------
TERAPI & TINDAKAN:
${record.therapy}

-------------------------------------------
RESEP OBAT:
${record.prescription}

-------------------------------------------
JADWAL KONTROL:
${record.nextVisit ? formatDate(record.nextVisit) : 'Tidak ada jadwal kontrol'}

-------------------------------------------
Dokter Pemeriksa: ${record.createdBy}

===========================================
Dokumen ini sah untuk ditebus di Farmasi
===========================================
    `;

        downloadTextFile(pdfContent, `resep_${record.patientName}_${record.id}.txt`);
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Rekam Medis</h2>

            {records.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Belum ada rekam medis</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {records.map(record => (
                        <div key={record.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-gradient-to-br from-white to-gray-50">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-lg">{record.patientName}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{record.poli} - {formatDate(record.date)}</p>
                                    <p className="text-xs text-gray-500 mt-1">Dokter: {record.createdBy}</p>
                                </div>
                                <button
                                    onClick={() => downloadPDF(record)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all text-sm font-medium"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Resep
                                </button>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <p className="font-medium text-blue-900 mb-2">Diagnosis:</p>
                                    <p className="text-gray-700">{record.diagnosis}</p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                    <p className="font-medium text-green-900 mb-2">Resep Obat:</p>
                                    <p className="text-gray-700 whitespace-pre-line">{record.prescription}</p>
                                </div>

                                {record.nextVisit && (
                                    <div className="bg-orange-50 p-4 rounded-xl flex items-center gap-3 border border-orange-100">
                                        <div className="bg-orange-500 p-2 rounded-lg">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-orange-900">Kontrol Selanjutnya:</p>
                                            <p className="text-gray-700">{formatDate(record.nextVisit)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MedicalRecordsList;