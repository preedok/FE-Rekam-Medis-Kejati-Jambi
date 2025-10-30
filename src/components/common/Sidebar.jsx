import React from 'react';
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
        <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-teal-600 to-emerald-700 text-white rounded-r-3xl transition-all duration-300 fixed h-screen overflow-y-auto shadow-2xl z-50`}>
            <div className="p-6">
                {/* Logo & Header */}
                <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} mb-8`}>
                    {sidebarOpen && (
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <img src={logo} alt="" />
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
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                {/* User Profile */}
                <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 ${!sidebarOpen && 'flex justify-center'}`}>
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-lg font-bold">{user?.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold truncate">{user?.name}</p>
                                <p className="text-xs text-teal-100">{isAdmin ? 'Dokter' : 'Pasien'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{user?.name.charAt(0)}</span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-white text-teal-600 shadow-lg'
                                    : 'text-white hover:bg-white/10'
                                } ${!sidebarOpen && 'justify-center'}`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {sidebarOpen && <span className="font-medium">{item.label}</span>}
                        </NavLink>
                    ))}

                    <button
                        onClick={logout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/20 transition-all mt-4 ${!sidebarOpen && 'justify-center'}`}
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && <span className="font-medium">Keluar</span>}
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;