// src/components/doctor/MonthlyReport.jsx
import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import { formatDate, downloadTextFile } from '../../utils/helpers';

const MonthlyReport = ({ records }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const downloadMonthlyReport = () => {
        const monthRecords = records.filter(r => r.createdAt.slice(0, 7) === selectedMonth);

        const reportContent = `
===========================================
      LAPORAN REKAM MEDIS BULANAN
===========================================

Periode: ${new Date(selectedMonth + '-01').toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
Total Kunjungan: ${monthRecords.length}

-------------------------------------------
DETAIL KUNJUNGAN:
-------------------------------------------

${monthRecords.map((record, index) => `
${index + 1}. ${record.patientName}
   Tanggal: ${formatDate(record.date)}
   Poli: ${record.poli}
   Dokter: ${record.createdBy}
   Diagnosis: ${record.diagnosis}
   Terapi: ${record.therapy}
   Obat: ${record.prescription}
   ---
`).join('\n')}

-------------------------------------------
STATISTIK:
- Poli Umum: ${monthRecords.filter(r => r.poli === 'Poli Umum').length}
- Poli Gigi: ${monthRecords.filter(r => r.poli === 'Poli Gigi').length}

===========================================
Dibuat oleh: ${records[0]?.createdBy || 'Dokter'}
Tanggal: ${formatDate(new Date())}
===========================================
    `;

        downloadTextFile(reportContent, `laporan_bulanan_${selectedMonth}.txt`);
    };

    const monthRecords = records.filter(r => r.createdAt.slice(0, 7) === selectedMonth);
    const poliUmum = monthRecords.filter(r => r.poli === 'Poli Umum').length;
    const poliGigi = monthRecords.filter(r => r.poli === 'Poli Gigi').length;

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Laporan Bulanan</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
                <button
                    onClick={downloadMonthlyReport}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all font-semibold"
                >
                    <Download className="w-5 h-5" />
                    Download Laporan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200">
                    <p className="text-sm text-teal-700 font-medium mb-1">Total Kunjungan</p>
                    <p className="text-4xl font-bold text-teal-800">{monthRecords.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <p className="text-sm text-purple-700 font-medium mb-1">Poli Umum</p>
                    <p className="text-4xl font-bold text-purple-800">{poliUmum}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                    <p className="text-sm text-orange-700 font-medium mb-1">Poli Gigi</p>
                    <p className="text-4xl font-bold text-orange-800">{poliGigi}</p>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg">Detail Kunjungan</h3>
                {monthRecords.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Tidak ada data untuk bulan ini</p>
                    </div>
                ) : (
                    monthRecords.map(record => (
                        <div key={record.id} className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-lg">{record.patientName}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{record.poli} - {formatDate(record.date)}</p>
                                    <p className="text-sm text-gray-600 mt-2">Diagnosis: {record.diagnosis}</p>
                                    <p className="text-xs text-gray-500 mt-1">Dokter: {record.createdBy}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-xl text-xs font-medium ${record.poli === 'Poli Umum'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-orange-100 text-orange-700'
                                    }`}>
                                    {record.poli}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MonthlyReport;