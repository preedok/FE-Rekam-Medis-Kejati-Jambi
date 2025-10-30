// src/components/doctor/MonthlyReport.jsx
import React, { useState } from 'react';
import { Download, Calendar, ClipboardList, TrendingUp, Users } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const MonthlyReport = ({ records }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const downloadMonthlyReport = () => {
        const monthRecords = records.filter(r => r.createdAt.slice(0, 7) === selectedMonth);
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPosition = 20;

        // Helper function
        const addText = (text, fontSize = 10, isBold = false, align = 'left') => {
            doc.setFontSize(fontSize);
            doc.setFont(undefined, isBold ? 'bold' : 'normal');
            
            if (align === 'center') {
                const textWidth = doc.getTextWidth(text);
                const xPosition = (pageWidth - textWidth) / 2;
                doc.text(text, xPosition, yPosition);
            } else {
                doc.text(text, margin, yPosition);
            }
            yPosition += fontSize / 2 + 2;
        };

        const addLine = () => {
            doc.setLineWidth(0.5);
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 8;
        };

        // Header with background
        doc.setFillColor(20, 184, 166);
        doc.rect(0, 0, pageWidth, 50, 'F');
        
        doc.setTextColor(255, 255, 255);
        yPosition = 20;
        addText('LAPORAN REKAM MEDIS BULANAN', 18, true, 'center');
        addText('Kejaksaan Tinggi Jambi - Digital Health', 11, false, 'center');
        
        doc.setTextColor(0, 0, 0);
        yPosition += 10;

        // Period Info
        const monthName = new Date(selectedMonth + '-01').toLocaleDateString('id-ID', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        doc.setFillColor(240, 253, 250);
        doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 20, 3, 3, 'F');
        yPosition += 8;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text(`Periode: ${monthName}`, margin + 5, yPosition);
        doc.text(`Total Kunjungan: ${monthRecords.length}`, pageWidth - margin - 60, yPosition);
        yPosition += 20;

        addLine();

        // Statistics Section
        const poliUmum = monthRecords.filter(r => r.poli === 'Poli Umum').length;
        const poliGigi = monthRecords.filter(r => r.poli === 'Poli Gigi').length;

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('STATISTIK KUNJUNGAN', margin, yPosition);
        yPosition += 10;

        // Statistics boxes
        const boxWidth = (pageWidth - 3 * margin) / 2;
        const boxHeight = 30;
        const startY = yPosition;

        // Poli Umum Box
        doc.setFillColor(243, 232, 255);
        doc.roundedRect(margin, startY, boxWidth, boxHeight, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Poli Umum', margin + 5, startY + 10);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(124, 58, 237);
        doc.text(poliUmum.toString(), margin + 5, startY + 25);

        // Poli Gigi Box
        doc.setFillColor(255, 237, 213);
        doc.roundedRect(margin + boxWidth + 10, startY, boxWidth, boxHeight, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Poli Gigi', margin + boxWidth + 15, startY + 10);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(249, 115, 22);
        doc.text(poliGigi.toString(), margin + boxWidth + 15, startY + 25);

        yPosition = startY + boxHeight + 15;
        doc.setTextColor(0, 0, 0);

        addLine();

        // Check if we need new page for table
        if (yPosition > pageHeight - 100) {
            doc.addPage();
            yPosition = 20;
        }

        // Detail Kunjungan Table
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('DETAIL KUNJUNGAN', margin, yPosition);
        yPosition += 10;

        if (monthRecords.length === 0) {
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(150, 150, 150);
            doc.text('Tidak ada data untuk bulan ini', pageWidth / 2, yPosition, { align: 'center' });
        } else {
            // Prepare table data
            const tableData = monthRecords.map((record, index) => [
                (index + 1).toString(),
                record.patientName,
                formatDate(record.date),
                record.poli,
                record.diagnosis.length > 40 ? record.diagnosis.substring(0, 40) + '...' : record.diagnosis,
                record.createdBy
            ]);

            // Add table using autoTable - FIXED
            autoTable(doc, {
                startY: yPosition,
                head: [['No', 'Nama Pasien', 'Tanggal', 'Poli', 'Diagnosis', 'Dokter']],
                body: tableData,
                theme: 'striped',
                headStyles: {
                    fillColor: [20, 184, 166],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    fontSize: 9
                },
                bodyStyles: {
                    fontSize: 8,
                    textColor: [50, 50, 50]
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                },
                columnStyles: {
                    0: { cellWidth: 10 },
                    1: { cellWidth: 35 },
                    2: { cellWidth: 25 },
                    3: { cellWidth: 25 },
                    4: { cellWidth: 45 },
                    5: { cellWidth: 30 }
                },
                margin: { left: margin, right: margin }
            });

            yPosition = doc.lastAutoTable.finalY + 15;
        }

        // Footer
        const footerY = pageHeight - 30;
        doc.setFillColor(240, 240, 240);
        doc.rect(0, footerY, pageWidth, 30, 'F');
        
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.setFont(undefined, 'normal');
        const footerText = `Dokumen ini dibuat secara otomatis pada ${formatDate(new Date())}`;
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - footerWidth) / 2, footerY + 15);

        // Add page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Halaman ${i} dari ${pageCount}`, pageWidth - margin - 20, footerY + 20);
        }

        // Save PDF
        const fileName = `Laporan_Bulanan_${monthName.replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);
    };

    const monthRecords = records.filter(r => r.createdAt.slice(0, 7) === selectedMonth);
    const poliUmum = monthRecords.filter(r => r.poli === 'Poli Umum').length;
    const poliGigi = monthRecords.filter(r => r.poli === 'Poli Gigi').length;

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl flex gap-2 font-bold text-gray-800 mb-6">
                <div className="bg-teal-100 p-3 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-teal-600" />
                </div>
                Laporan Bulanan
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                </div>
                <button
                    onClick={downloadMonthlyReport}
                    disabled={monthRecords.length === 0}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        monthRecords.length === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl transform hover:-translate-y-0.5'
                    }`}
                >
                    <Download className="w-5 h-5" />
                    Download PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-teal-500 p-2 rounded-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm text-teal-700 font-medium">Total Kunjungan</p>
                    </div>
                    <p className="text-4xl font-bold text-teal-800">{monthRecords.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-purple-500 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm text-purple-700 font-medium">Poli Umum</p>
                    </div>
                    <p className="text-4xl font-bold text-purple-800">{poliUmum}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm text-orange-700 font-medium">Poli Gigi</p>
                    </div>
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
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-teal-50 border-b-2 border-teal-200">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">No</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">Nama Pasien</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">Tanggal</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">Poli</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">Diagnosis</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-teal-800">Dokter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthRecords.map((record, index) => (
                                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{record.patientName}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{formatDate(record.date)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                record.poli === 'Poli Umum'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-orange-100 text-orange-700'
                                            }`}>
                                                {record.poli}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{record.diagnosis}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{record.createdBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MonthlyReport;