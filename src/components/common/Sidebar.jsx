import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Home, Users, Calendar, FileText, Download,
    Plus, ClipboardList, Stethoscope, Activity,
    LogOut, Menu
} from 'lucide-react';
import logo from "../../assets/logo-kejaksaan.png"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const isAdmin = user?.role === 'admin';
    const [hoveredItem, setHoveredItem] = useState(null);

    const patientNavItems = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/booking', icon: Plus, label: 'Daftar Poli' },
        { path: '/my-appointments', icon: Calendar, label: 'Jadwal Saya' },
        { path: '/my-records', icon: FileText, label: 'Rekam Medis' },
    ];

    const doctorNavItems = [
        { path: '/dashboard', icon: Home, label: 'Dashboard' },
        { path: '/patients', icon: Users, label: 'Data Pasien' },
        { path: '/appointments', icon: Calendar, label: 'Kelola Janji' },
        { path: '/medical-form', icon: ClipboardList, label: 'Input Rekam Medis' },
        { path: '/poli-umum', icon: Stethoscope, label: 'Poli Umum' },
        { path: '/poli-gigi', icon: Activity, label: 'Poli Gigi' },
        { path: '/records', icon: FileText, label: 'Rekam Medis' },
        { path: '/report', icon: Download, label: 'Laporan Bulanan' },
    ];

    const navItems = isAdmin ? doctorNavItems : patientNavItems;

    return (
        <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-teal-600 to-emerald-700 text-white rounded-r-3xl transition-all duration-300 fixed h-screen shadow-2xl z-50 flex flex-col`}>
            {/* Header - Fixed */}
            <div className="p-6 flex-shrink-0">
                {/* Logo & Header */}
                <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} mb-8`}>
                    {sidebarOpen && (
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden">
                                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">Kejati Jambi</h1>
                                    <p className="text-xs text-teal-100">Digital Health</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* User Profile */}
                <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${!sidebarOpen && 'flex justify-center'}`}>
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-lg font-bold">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-teal-100">{isAdmin ? 'Dokter' : 'Pasien'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative group">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            {/* Tooltip for collapsed user profile */}
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                                {user?.name || 'User'}
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <nav className="space-y-2">
                    {navItems.map((item, index) => (
                        <div key={item.path} className="relative">
                            <NavLink
                                to={item.path}
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-white text-teal-600 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                    } ${!sidebarOpen && 'justify-center'}`
                                }
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && <span className="font-medium">{item.label}</span>}
                            </NavLink>

                            {/* Tooltip for collapsed menu */}
                            {!sidebarOpen && hoveredItem === index && (
                                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50 pointer-events-none">
                                    {item.label}
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="relative mt-4">
                        <button
                            onClick={logout}
                            onMouseEnter={() => setHoveredItem('logout')}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/20 transition-all ${!sidebarOpen && 'justify-center'}`}
                        >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && <span className="font-medium">Keluar</span>}
                        </button>

                        {/* Tooltip for logout button */}
                        {!sidebarOpen && hoveredItem === 'logout' && (
                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50 pointer-events-none">
                                Keluar
                                <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 3px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </aside>
    );
};

export default Sidebar;