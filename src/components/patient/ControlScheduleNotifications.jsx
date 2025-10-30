// src/components/patient/ControlScheduleNotifications.jsx
import React from 'react';
import { Bell, Clock } from 'lucide-react';
import { formatDate, isUpcomingDate } from '../../utils/helpers';

const ControlScheduleNotifications = ({ records }) => {
    const upcomingSchedules = records.filter(record =>
        record.nextVisit && isUpcomingDate(record.nextVisit)
    );

    if (upcomingSchedules.length === 0) return null;

    return (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-3xl p-6 mb-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                    <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Pengingat Jadwal Kontrol</h3>
            </div>

            <div className="space-y-3">
                {upcomingSchedules.map(record => {
                    const today = new Date();
                    const visitDate = new Date(record.nextVisit);
                    const diffDays = Math.ceil((visitDate - today) / (1000 * 60 * 60 * 24));

                    return (
                        <div key={record.id} className="bg-white p-5 rounded-2xl shadow-md border border-orange-100">
                            <p className="font-semibold text-gray-800 text-lg">{record.poli}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Jadwal: {formatDate(record.nextVisit)}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Dokter: {record.createdBy}
                            </p>
                            <p className="text-sm text-orange-600 font-medium mt-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {diffDays === 0 ? 'Hari ini!' : `${diffDays} hari lagi`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ControlScheduleNotifications;