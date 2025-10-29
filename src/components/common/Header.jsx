import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';

const Header = () => {
    const { user } = useAuth();
    const { appointments } = useAppointments();
    const isAdmin = user?.role === 'admin';

    const pendingCount = isAdmin
        ? appointments.filter(a => a.status === 'pending' && a.doctorId === user.id).length
        : 0;

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isAdmin ? 'Dashboard Dokter' : 'Dashboard Pasien'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {new Date().toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all relative">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {pendingCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {pendingCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;