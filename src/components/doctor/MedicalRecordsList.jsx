// src/components/doctor/MedicalRecordsList.jsx
import React from 'react';
import { FileText, Download, Clock, ClipboardList } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import jsPDF from 'jspdf';

const MedicalRecordsList = ({ records }) => {
    const downloadPDF = (record) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        const contentWidth = pageWidth - (2 * margin);
        let yPosition = 20;

        // Helper function to add text with word wrap
        const addText = (text, fontSize = 10, isBold = false, align = 'left') => {
            doc.setFontSize(fontSize);
            if (isBold) {
                doc.setFont(undefined, 'bold');
            } else {
                doc.setFont(undefined, 'normal');
            }

            const lines = doc.splitTextToSize(text, contentWidth);

            if (align === 'center') {
                lines.forEach(line => {
                    const textWidth = doc.getTextWidth(line);
                    const xPosition = (pageWidth - textWidth) / 2;
                    doc.text(line, xPosition, yPosition);
                    yPosition += 6;
                });
            } else {
                doc.text(lines, margin, yPosition);
                yPosition += (lines.length * 6);
            }
        };

        const addLine = () => {
            doc.setLineWidth(0.5);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 8;
        };

        const addSection = (title, content) => {
            // Check if we need a new page
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
            }

            // Title
            doc.setFillColor(20, 184, 166); // Teal color
            doc.rect(margin, yPosition - 5, contentWidth, 8, 'F');
            doc.setTextColor(255, 255, 255);
            addText(title, 10, true);
            doc.setTextColor(0, 0, 0);
            yPosition += 2;

            // Content
            addText(content, 10, false);
            yPosition += 5;
        };

        // Header
        doc.setFillColor(20, 184, 166);
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        addText('SURAT KETERANGAN RESEP OBAT', 16, true, 'center');
        yPosition += 2;
        addText('Kejaksaan Tinggi Jambi - Digital Health', 10, false, 'center');
        doc.setTextColor(0, 0, 0);
        yPosition += 10;

        // Document Info
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(`Tanggal: ${formatDate(record.createdAt || new Date().toISOString())}`, margin, yPosition);
        doc.text(`No. RM: ${record.id}`, pageWidth - margin - 40, yPosition);
        yPosition += 10;

        addLine();

        // Patient Identity
        addText('IDENTITAS PASIEN', 12, true);
        yPosition += 2;

        const patientInfo = [
            `Nama          : ${record.patientName}`,
            `Poli          : ${record.poli}`,
            `Tgl Periksa   : ${formatDate(record.date)}`,
        ];

        patientInfo.forEach(info => {
            addText(info, 10);
        });
        yPosition += 3;

        addLine();

        // Medical Sections
        addSection('ANAMNESA (KELUHAN)', record.anamnesa);
        addSection('OBJEKTIF (PEMERIKSAAN)', record.objective);
        addSection('DIAGNOSIS', record.diagnosis);
        addSection('TERAPI & TINDAKAN', record.therapy);
        addSection('RESEP OBAT', record.prescription);

        if (record.nextVisit) {
            addSection('JADWAL KONTROL SELANJUTNYA', formatDate(record.nextVisit));
        }

        yPosition += 5;
        addLine();

        // Doctor signature
        yPosition += 5;
        addText(`Dokter Pemeriksa: ${record.createdBy}`, 10, true);
        yPosition += 15;

        // Add signature box
        doc.setDrawColor(200, 200, 200);
        doc.rect(pageWidth - margin - 60, yPosition - 10, 60, 30);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Tanda Tangan & Stempel', pageWidth - margin - 55, yPosition + 15);

        yPosition += 35;

        // Footer
        if (yPosition > 260) {
            doc.addPage();
            yPosition = 20;
        }

        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPosition, contentWidth, 15, 'F');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        const footerText = 'Dokumen ini sah untuk ditebus di Farmasi';
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - footerWidth) / 2, yPosition + 10);

        // Save PDF
        const fileName = `Resep_${record.patientName.replace(/\s+/g, '_')}_${record.id}.pdf`;
        doc.save(fileName);
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl flex gap-2 font-bold text-gray-800 mb-6">
                <div className="bg-teal-100 p-3 rounded-xl">
                    <ClipboardList className="w-6 h-6 text-teal-600" />
                </div>
                Rekam Medis
            </h2>

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
                                    Download PDF
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