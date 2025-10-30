import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user } = useAuth();
    const { appointments } = useAppointments();
    const navigate = useNavigate();
    const isAdmin = user?.role === 'admin';
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);

    // Filter pending appointments
    const pendingAppointments = isAdmin
        ? appointments.filter(a => a.status === 'pending' && a.doctorId === user.id)
        : appointments.filter(a => a.patientId === user.id && a.status === 'pending');

    const pendingCount = pendingAppointments.length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };

        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const handleNotificationClick = (appointment) => {
        setShowNotifications(false);
        if (isAdmin) {
            navigate('/appointments');
        } else {
            navigate('/my-appointments');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString || '-';
    };

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
                <div className="flex items-center gap-4" ref={notifRef}>
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all relative"
                        >
                            <Bell className="w-6 h-6 text-gray-600" />
                            {pendingCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                                    {pendingCount > 9 ? '9+' : pendingCount}
                                </span>
                            )}
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
                                {/* Header */}
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                                    <h3 className="font-semibold text-lg">Notifikasi</h3>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Notification List */}
                                <div className="overflow-y-auto max-h-[400px]">
                                    {pendingCount === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                            <p className="font-medium">Tidak ada notifikasi</p>
                                            <p className="text-sm mt-1">Semua janji temu sudah diproses</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-100">
                                            {pendingAppointments.map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    onClick={() => handleNotificationClick(appointment)}
                                                    className="p-4 hover:bg-teal-50 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <Calendar className="w-5 h-5 text-teal-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-gray-800 mb-1">
                                                                {isAdmin ? 'Janji Baru Menunggu' : 'Janji Menunggu Konfirmasi'}
                                                            </p>
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {isAdmin
                                                                    ? `Pasien: ${appointment.patientName || 'Nama Pasien'}`
                                                                    : `Dokter: ${appointment.doctorName || 'Nama Dokter'}`
                                                                }
                                                            </p>
                                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    <span>{formatDate(appointment.date)}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>{formatTime(appointment.time)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                                                            Pending
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                {pendingCount > 0 && (
                                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                                        <button
                                            onClick={() => {
                                                setShowNotifications(false);
                                                navigate(isAdmin ? '/appointments' : '/my-appointments');
                                            }}
                                            className="w-full text-center text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
                                        >
                                            Lihat Semua Janji
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;