import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Activity, Bell, Download, Home, UserPlus, LogIn, LogOut, Plus, Check, X, Clock, Stethoscope, Pill, ClipboardList, Menu, TrendingUp } from 'lucide-react';
import logo from './assets/logo-kejaksaan.png'
// Data Dokter
const DOCTORS = [
    {
        id: 'doctor1',
        name: 'dr. Romadhani Nadri',
        email: 'romadhani@klinik.com',
        password: 'doctor123',
        schedule: '08:00-12:00',
        availableTimes: ['08:00', '09:00', '10:00', '11:00']
    },
    {
        id: 'doctor2',
        name: 'dr. Maudina HF Diantoro',
        email: 'maudina@klinik.com',
        password: 'doctor123',
        schedule: '12:00-16:00',
        availableTimes: ['12:00', '13:00', '14:00', '15:00']
    }
];

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(20px, -50px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(50px, 50px) scale(1.05); }
  }
  
  .animate-blob {
    animation: blob 20s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes floatReverse {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(20px) rotate(-5deg); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  
  @keyframes draw-line {
    0% { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }
  
  @keyframes move-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-reverse {
    animation: floatReverse 8s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
  
  .animate-draw-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw-line 3s ease-in-out infinite;
  }
  
  .animate-move-line {
    animation: move-line 4s linear infinite;
  }
`;
document.head.appendChild(style);


const LoginPage = ({ onLogin, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');

    const handleLogin = (e) => {
        e.preventDefault();
        if (role === 'admin') {
            const doctor = DOCTORS.find(d => d.email === email && d.password === password);
            if (doctor) {
                onLogin({ ...doctor, role: 'admin' });
            } else {
                alert('Email atau password dokter salah!');
            }
        } else {
            const patients = JSON.parse(localStorage.getItem('patients') || '[]');
            const patient = patients.find(p => p.email === email && p.password === password);
            if (patient) {
                onLogin({ ...patient, role: 'patient' });
            } else {
                alert('Email atau password pasien salah!');
            }
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-950">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                {/* Floating Medical Icons */}
                <div className="absolute top-20 left-10 text-teal-400 opacity-20 animate-float">
                    <Activity className="w-12 h-12" />
                </div>
                <div className="absolute top-40 right-20 text-emerald-400 opacity-20 animate-float-reverse">
                    <Activity className="w-16 h-16" />
                </div>
                <div className="absolute bottom-32 left-1/4 text-teal-300 opacity-20 animate-float">
                    <Activity className="w-10 h-10" />
                </div>
                <div className="absolute bottom-20 right-1/3 text-emerald-300 opacity-20 animate-float-reverse">
                    <Activity className="w-14 h-14" />
                </div>

                {/* Animated Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="20%" x2="90%" y2="30%" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="2" className="animate-draw-line" style={{ animationDelay: '0s' }} />
                    <line x1="80%" y1="40%" x2="20%" y2="60%" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" className="animate-draw-line" style={{ animationDelay: '1s' }} />
                    <line x1="30%" y1="70%" x2="70%" y2="80%" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="2" className="animate-draw-line" style={{ animationDelay: '2s' }} />

                    {/* Pulsing Circles */}
                    <circle cx="15%" cy="25%" r="30" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" className="animate-pulse-slow" />
                    <circle cx="85%" cy="60%" r="40" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                    <circle cx="50%" cy="85%" r="35" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '3s' }} />
                </svg>

                {/* Moving Lines */}
                <div className="absolute top-1/4 left-0 w-full h-px overflow-hidden">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-move-line"></div>
                </div>
                <div className="absolute top-2/3 left-0 w-full h-px overflow-hidden" style={{ animationDelay: '2s' }}>
                    <div className="w-40 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-move-line"></div>
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                        <img src={logo} alt="" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Kejati Jambi</h1>
                    <p className="text-gray-500">Digital Health System</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Login Sebagai</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setRole('patient')}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${role === 'patient'
                                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                Pasien
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${role === 'admin'
                                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                Dokter
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="email@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                        Masuk
                    </button>
                </div>

                {role === 'patient' && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Belum punya akun?{' '}
                            <button
                                className="text-teal-600 font-semibold hover:underline"
                                onClick={onSwitchToRegister}
                            >
                                Daftar Sekarang
                            </button>
                        </p>
                    </div>
                )}

                {role === 'admin' && (
                    <div className="mt-4 p-4 bg-teal-50 rounded-xl text-xs text-gray-600">
                        <p className="font-semibold mb-2">Demo Login Dokter:</p>
                        <div className="space-y-2">
                            <div className="bg-white p-2 rounded-lg">
                                <p className="font-medium text-teal-700">dr. Romadhani Nadri</p>
                                <p className="text-xs text-gray-500">Jadwal: 08:00-12:00</p>
                                <p className="mt-1">Email: romadhani@klinik.com</p>
                                <p>Password: doctor123</p>
                            </div>
                            <div className="bg-white p-2 rounded-lg">
                                <p className="font-medium text-teal-700">dr. Maudina HF Diantoro</p>
                                <p className="text-xs text-gray-500">Jadwal: 12:00-16:00</p>
                                <p className="mt-1">Email: maudina@klinik.com</p>
                                <p>Password: doctor123</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Komponen Registrasi Pasien
const RegisterPage = ({ onRegister, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: 'Laki-laki',
        bloodType: 'A'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');

        if (patients.some(p => p.email === formData.email)) {
            alert('Email sudah terdaftar!');
            return;
        }

        const newPatient = {
            id: generateId(),
            ...formData,
            registeredDate: new Date().toISOString(),
            role: 'patient'
        };

        patients.push(newPatient);
        localStorage.setItem('patients', JSON.stringify(patients));
        alert('Registrasi berhasil! Silakan login.');
        onSwitchToLogin();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-950">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                {/* Floating Medical Icons */}
                <div className="absolute top-20 left-10 text-teal-400 opacity-20 animate-float">
                    <Activity className="w-12 h-12" />
                </div>
                <div className="absolute top-40 right-20 text-emerald-400 opacity-20 animate-float-reverse">
                    <Activity className="w-16 h-16" />
                </div>
                <div className="absolute bottom-32 left-1/4 text-teal-300 opacity-20 animate-float">
                    <Activity className="w-10 h-10" />
                </div>
                <div className="absolute bottom-20 right-1/3 text-emerald-300 opacity-20 animate-float-reverse">
                    <Activity className="w-14 h-14" />
                </div>

                {/* Animated Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10%" y1="20%" x2="90%" y2="30%" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="2" className="animate-draw-line" style={{ animationDelay: '0s' }} />
                    <line x1="80%" y1="40%" x2="20%" y2="60%" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" className="animate-draw-line" style={{ animationDelay: '1s' }} />
                    <line x1="30%" y1="70%" x2="70%" y2="80%" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="2" className="animate-draw-line" style={{ animationDelay: '2s' }} />

                    {/* Pulsing Circles */}
                    <circle cx="15%" cy="25%" r="30" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" className="animate-pulse-slow" />
                    <circle cx="85%" cy="60%" r="40" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                    <circle cx="50%" cy="85%" r="35" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" className="animate-pulse-slow" style={{ animationDelay: '3s' }} />
                </svg>

                {/* Moving Lines */}
                <div className="absolute top-1/4 left-0 w-full h-px overflow-hidden">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-move-line"></div>
                </div>
                <div className="absolute top-2/3 left-0 w-full h-px overflow-hidden" style={{ animationDelay: '2s' }}>
                    <div className="w-40 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-move-line"></div>
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
            </div>

            <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Daftar Pasien Baru</h1>
                    <p className="text-gray-500">Lengkapi data diri Anda</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>Laki-laki</option>
                                <option>Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Golongan Darah</label>
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option>A</option>
                                <option>B</option>
                                <option>AB</option>
                                <option>O</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                rows="3"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                        Daftar
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Sudah punya akun?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="text-teal-600 font-semibold hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Dashboard Admin/Dokter
const AdminDashboard = ({ user, appointments, medicalRecords, setActiveTab }) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === user.id);
    const pendingAppointments = doctorAppointments.filter(a => a.status === 'pending').length;
    const todayAppointments = doctorAppointments.filter(a => {
        const today = new Date().toISOString().split('T')[0];
        return a.date === today;
    }).length;

    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    const totalPatients = patients.length;
    const doctorRecords = medicalRecords.filter(r => r.createdBy === user.name);
    const totalRecords = doctorRecords.length;

    const currentDoctor = DOCTORS.find(d => d.id === user.id);

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-6 h-6" />
                            <p className="text-sm opacity-90">
                                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Selamat Pagi, {user.name}! 👋</h1>
                        <p className="text-lg opacity-90">Semoga hari Anda menyenangkan dalam melayani pasien</p>
                        <p className="text-sm opacity-90 mt-2 font-medium">📅 Jadwal Praktik: {currentDoctor?.schedule}</p>
                    </div>
                    <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                        <div className="text-center">
                            <p className="text-sm opacity-90 mb-1">Hari Ini</p>
                            <p className="text-3xl font-bold mb-1">{todayAppointments}</p>
                            <p className="text-sm">Pasien Baru</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-3xl font-bold mb-1">{pendingAppointments}</p>
                            <p className="text-sm">Menunggu Approval</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Users className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{totalPatients}</span>
                    </div>
                    <p className="text-sm opacity-90">Total Pasien</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FileText className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{totalRecords}</span>
                    </div>
                    <p className="text-sm opacity-90">Rekam Medis Saya</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <ClipboardList className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{doctorAppointments.filter(a => a.poli === 'Poli Umum').length}</span>
                    </div>
                    <p className="text-sm opacity-90">Pasien Poli Umum</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Stethoscope className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{doctorAppointments.filter(a => a.poli === 'Poli Gigi').length}</span>
                    </div>
                    <p className="text-sm opacity-90">Pasien Poli Gigi</p>
                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                        onClick={() => setActiveTab('patients')}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-teal-500 group"
                    >
                        <div className="bg-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-500 transition-all">
                            <Users className="w-7 h-7 text-teal-600 group-hover:text-white transition-all" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Data Pasien</h3>
                        <p className="text-sm text-gray-500">Lihat semua data pasien</p>
                    </div>

                    <div
                        onClick={() => setActiveTab('medical-form')}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-blue-500 group"
                    >
                        <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-all">
                            <FileText className="w-7 h-7 text-blue-600 group-hover:text-white transition-all" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Rekam Medis</h3>
                        <p className="text-sm text-gray-500">Input rekam medis baru</p>
                    </div>

                    <div
                        onClick={() => setActiveTab('appointments')}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-purple-500 group"
                    >
                        <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-all">
                            <Calendar className="w-7 h-7 text-purple-600 group-hover:text-white transition-all" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Jadwal Hari Ini</h3>
                        <p className="text-sm text-gray-500">Lihat jadwal pemeriksaan</p>
                    </div>

                    <div
                        onClick={() => setActiveTab('report')}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-orange-500 group"
                    >
                        <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all">
                            <Download className="w-7 h-7 text-orange-600 group-hover:text-white transition-all" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Export Data</h3>
                        <p className="text-sm text-gray-500">Unduh laporan</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Dashboard Pasien
const PatientDashboard = ({ user, appointments, medicalRecords }) => {
    const userAppointments = appointments.filter(a => a.patientId === user.id);
    const upcomingAppointments = userAppointments.filter(a =>
        a.status === 'approved' && new Date(a.date) >= new Date()
    ).length;
    const userRecords = medicalRecords.filter(r => r.patientId === user.id).length;

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-90 mb-2">Selamat Datang Kembali</p>
                        <h1 className="text-4xl font-bold mb-2">{user.name}! 👋</h1>
                        <p className="text-lg opacity-90">Semoga Anda selalu sehat</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold mb-1">{upcomingAppointments}</p>
                                <p className="text-sm opacity-90">Janji Mendatang</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Calendar className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{upcomingAppointments}</span>
                    </div>
                    <p className="text-sm opacity-90">Janji Mendatang</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Activity className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{userAppointments.length}</span>
                    </div>
                    <p className="text-sm opacity-90">Total Kunjungan</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <FileText className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-bold">{userRecords}</span>
                    </div>
                    <p className="text-sm opacity-90">Rekam Medis</p>
                </div>
            </div>
        </div>
    );
};

// Komponen untuk Daftar Poli (Pasien)
const AppointmentBooking = ({ user, onBook }) => {
    const [formData, setFormData] = useState({
        poli: 'Poli Umum',
        doctorId: '',
        date: '',
        time: '',
        complaint: ''
    });

    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        if (formData.doctorId) {
            const doctor = DOCTORS.find(d => d.id === formData.doctorId);
            setAvailableTimes(doctor ? doctor.availableTimes : []);
            setFormData(prev => ({ ...prev, time: '' }));
        }
    }, [formData.doctorId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDoctor = DOCTORS.find(d => d.id === formData.doctorId);

        const appointment = {
            id: generateId(),
            patientId: user.id,
            patientName: user.name,
            doctorId: formData.doctorId,
            doctorName: selectedDoctor.name,
            poli: formData.poli,
            date: formData.date,
            time: formData.time,
            complaint: formData.complaint,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        onBook(appointment);
        setFormData({ poli: 'Poli Umum', doctorId: '', date: '', time: '', complaint: '' });
        setAvailableTimes([]);
        alert('Pendaftaran berhasil! Menunggu konfirmasi dari dokter.');
    };

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Poli</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Poli</label>
                    <select
                        value={formData.poli}
                        onChange={(e) => setFormData({ ...formData, poli: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                        <option>Poli Umum</option>
                        <option>Poli Gigi</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Dokter</label>
                    <select
                        value={formData.doctorId}
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                    >
                        <option value="">-- Pilih Dokter --</option>
                        {DOCTORS.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name} ({doctor.schedule})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jam</label>
                        <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                            disabled={!formData.doctorId}
                        >
                            <option value="">Pilih Jam</option>
                            {availableTimes.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        {!formData.doctorId && (
                            <p className="text-xs text-gray-500 mt-1">Pilih dokter terlebih dahulu</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keluhan</label>
                    <textarea
                        value={formData.complaint}
                        onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        rows="4"
                        placeholder="Deskripsikan keluhan Anda..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                    Daftar Sekarang
                </button>
            </form>
        </div>
    );
};

// Manajemen Janji Temu (Admin/Dokter)
const AppointmentManagement = ({ appointments, onUpdateStatus, currentDoctorId }) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === currentDoctorId);
    const pendingAppointments = doctorAppointments.filter(a => a.status === 'pending');
    const approvedAppointments = doctorAppointments.filter(a => a.status === 'approved');

    return (
        <div className="space-y-6">
            {pendingAppointments.length > 0 && (
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <Bell className="w-6 h-6 text-orange-600" />
                        </div>
                        Menunggu Approval ({pendingAppointments.length})
                    </h2>

                    <div className="space-y-4">
                        {pendingAppointments.map(apt => (
                            <div key={apt.id} className="bg-orange-50 border border-orange-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg mb-3">{apt.patientName}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <ClipboardList className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Poli</p>
                                                    <p className="font-medium">{apt.poli}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Jadwal</p>
                                                    <p className="font-medium">{formatDate(apt.date)} - {apt.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Stethoscope className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Dokter</p>
                                                    <p className="font-medium">{apt.doctorName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <FileText className="w-4 h-4 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Keluhan</p>
                                                    <p className="font-medium">{apt.complaint.substring(0, 30)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => onUpdateStatus(apt.id, 'approved')}
                                            className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                                            title="Terima"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => onUpdateStatus(apt.id, 'rejected')}
                                            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
                                            title="Tolak"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Jadwal Approved</h2>

                {approvedAppointments.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500">Belum ada jadwal yang disetujui</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {approvedAppointments.map(apt => (
                            <div key={apt.id} className="bg-green-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg mb-3">{apt.patientName}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <ClipboardList className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Poli</p>
                                                    <p className="font-medium">{apt.poli}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Calendar className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Jadwal</p>
                                                    <p className="font-medium">{formatDate(apt.date)} - {apt.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <Stethoscope className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Dokter</p>
                                                    <p className="font-medium">{apt.doctorName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="bg-white p-2 rounded-lg">
                                                    <FileText className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Keluhan</p>
                                                    <p className="font-medium">{apt.complaint.substring(0, 30)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-4 py-2 bg-green-500 text-white text-sm rounded-xl font-medium shadow-md">
                                        Disetujui
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Form Rekam Medis (Admin/Dokter)
const MedicalRecordForm = ({ appointments, onSave, currentDoctorId, currentDoctorName }) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === currentDoctorId);
    const approvedAppointments = doctorAppointments.filter(a => a.status === 'approved');
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [formData, setFormData] = useState({
        anamnesa: '',
        objective: '',
        diagnosis: '',
        therapy: '',
        prescription: '',
        nextVisit: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const appointment = appointments.find(a => a.id === selectedAppointment);

        const record = {
            id: generateId(),
            appointmentId: selectedAppointment,
            patientId: appointment.patientId,
            patientName: appointment.patientName,
            poli: appointment.poli,
            date: appointment.date,
            ...formData,
            createdAt: new Date().toISOString(),
            createdBy: currentDoctorName
        };

        onSave(record);
        setSelectedAppointment('');
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Pasien</label>
                        <select
                            value={selectedAppointment}
                            onChange={(e) => setSelectedAppointment(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            required
                        >
                            <option value="">-- Pilih Pasien --</option>
                            {approvedAppointments.map(apt => (
                                <option key={apt.id} value={apt.id}>
                                    {apt.patientName} - {apt.poli} ({formatDate(apt.date)} - {apt.time})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedAppointment && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Diagnosis
                                </label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
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
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Jadwal Kontrol Selanjutnya
                                </label>
                                <input
                                    type="date"
                                    value={formData.nextVisit}
                                    onChange={(e) => setFormData({ ...formData, nextVisit: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    min={new Date().toISOString().split('T')[0]}
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

// Daftar Rekam Medis
const MedicalRecordsList = ({ records, isAdmin }) => {
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

        const blob = new Blob([pdfContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resep_${record.patientName}_${record.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
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

// Laporan Bulanan (Admin/Dokter)
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

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `laporan_bulanan_${selectedMonth}.txt`;
        a.click();
        URL.revokeObjectURL(url);
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

// Notifikasi Jadwal Kontrol
const ControlScheduleNotifications = ({ user, records }) => {
    const today = new Date();
    const userRecords = records.filter(r => r.patientId === user.id && r.nextVisit);

    const upcomingSchedules = userRecords.filter(record => {
        if (!record.nextVisit) return false;
        const visitDate = new Date(record.nextVisit);
        const diffDays = Math.ceil((visitDate - today) / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
    });

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
                                {diffDays === 0 ? '🔔 Hari ini!' : `🔔 ${diffDays} hari lagi`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Main App Component
export default function MedicalRecordApp() {
    const [user, setUser] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const savedAppointments = localStorage.getItem('appointments');
        const savedRecords = localStorage.getItem('medicalRecords');

        if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
        if (savedRecords) setMedicalRecords(JSON.parse(savedRecords));
    }, []);

    useEffect(() => {
        if (appointments.length > 0) {
            localStorage.setItem('appointments', JSON.stringify(appointments));
        }
    }, [appointments]);

    useEffect(() => {
        if (medicalRecords.length > 0) {
            localStorage.setItem('medicalRecords', JSON.stringify(medicalRecords));
        }
    }, [medicalRecords]);

    const handleLogin = (userData) => {
        setUser(userData);
        setActiveTab('dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        setActiveTab('dashboard');
    };

    const handleBookAppointment = (appointment) => {
        setAppointments([...appointments, appointment]);
    };

    const handleUpdateAppointmentStatus = (id, status) => {
        setAppointments(appointments.map(apt =>
            apt.id === id ? { ...apt, status } : apt
        ));
    };

    const handleSaveMedicalRecord = (record) => {
        setMedicalRecords([...medicalRecords, record]);
    };

    if (!user) {
        return showRegister ? (
            <RegisterPage
                onRegister={() => { }}
                onSwitchToLogin={() => setShowRegister(false)}
            />
        ) : (
            <LoginPage
                onLogin={handleLogin}
                onSwitchToRegister={() => setShowRegister(true)}
            />
        );
    }

    const isAdmin = user.role === 'admin';
    const userAppointments = isAdmin ? appointments : appointments.filter(a => a.patientId === user.id);
    const userRecords = isAdmin ? medicalRecords.filter(r => r.createdBy === user.name) : medicalRecords.filter(r => r.patientId === user.id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Sidebar */}
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
                                    <span className="text-lg font-bold">{user.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{user.name}</p>
                                    <p className="text-xs text-teal-100">{isAdmin ? 'Dokter' : 'Pasien'}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold">{user.name.charAt(0)}</span>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard'
                                ? 'bg-white text-teal-600 shadow-lg'
                                : 'text-white hover:bg-white/10'
                                } ${!sidebarOpen && 'justify-center'}`}
                        >
                            <Home className="w-5 h-5" />
                            {sidebarOpen && <span className="font-medium">Dashboard</span>}
                        </button>

                        {!isAdmin && (
                            <>
                                <button
                                    onClick={() => setActiveTab('booking')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'booking'
                                        ? 'bg-white text-teal-600 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                        } ${!sidebarOpen && 'justify-center'}`}
                                >
                                    <Plus className="w-5 h-5" />
                                    {sidebarOpen && <span className="font-medium">Daftar Poli</span>}
                                </button>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => setActiveTab('patients')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'patients'
                                        ? 'bg-white text-teal-600 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                        } ${!sidebarOpen && 'justify-center'}`}
                                >
                                    <Users className="w-5 h-5" />
                                    {sidebarOpen && <span className="font-medium">Data Pasien</span>}
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => setActiveTab('appointments')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments'
                                ? 'bg-white text-teal-600 shadow-lg'
                                : 'text-white hover:bg-white/10'
                                } ${!sidebarOpen && 'justify-center'}`}
                        >
                            <Calendar className="w-5 h-5" />
                            {sidebarOpen && <span className="font-medium">{isAdmin ? 'Kelola Janji' : 'Jadwal Saya'}</span>}
                        </button>

                        {isAdmin && (
                            <>
                                <button
                                    onClick={() => setActiveTab('medical-form')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'medical-form'
                                        ? 'bg-white text-teal-600 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                        } ${!sidebarOpen && 'justify-center'}`}
                                >
                                    <ClipboardList className="w-5 h-5" />
                                    {sidebarOpen && <span className="font-medium">Input Rekam Medis</span>}
                                </button>

                                <button
                                    onClick={() => setActiveTab('poli-umum')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'poli-umum'
                                        ? 'bg-white text-teal-600 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                        } ${!sidebarOpen && 'justify-center'}`}
                                >
                                    <Stethoscope className="w-5 h-5" />
                                    {sidebarOpen && <span className="font-medium">Poli Umum</span>}
                                </button>

                                <button
                                    onClick={() => setActiveTab('poli-gigi')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'poli-gigi'
                                        ? 'bg-white text-teal-600 shadow-lg'
                                        : 'text-white hover:bg-white/10'
                                        } ${!sidebarOpen && 'justify-center'}`}
                                >
                                    <Activity className="w-5 h-5" />
                                    {sidebarOpen && <span className="font-medium">Poli Gigi</span>}
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => setActiveTab('records')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'records'
                                ? 'bg-white text-teal-600 shadow-lg'
                                : 'text-white hover:bg-white/10'
                                } ${!sidebarOpen && 'justify-center'}`}
                        >
                            <FileText className="w-5 h-5" />
                            {sidebarOpen && <span className="font-medium">Rekam Medis</span>}
                        </button>

                        {isAdmin && (
                            <button
                                onClick={() => setActiveTab('report')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'report'
                                    ? 'bg-white text-teal-600 shadow-lg'
                                    : 'text-white hover:bg-white/10'
                                    } ${!sidebarOpen && 'justify-center'}`}
                            >
                                <Download className="w-5 h-5" />
                                {sidebarOpen && <span className="font-medium">Laporan Bulanan</span>}
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/20 transition-all mt-4 ${!sidebarOpen && 'justify-center'}`}
                        >
                            <LogOut className="w-5 h-5" />
                            {sidebarOpen && <span className="font-medium">Keluar</span>}
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300 p-8`}>
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {isAdmin ? 'Dashboard Dokter' : 'Dashboard Pasien'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all relative">
                                <Bell className="w-6 h-6 text-gray-600" />
                                {isAdmin && appointments.filter(a => a.status === 'pending' && a.doctorId === user.id).length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {appointments.filter(a => a.status === 'pending' && a.doctorId === user.id).length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    {activeTab === 'dashboard' && (
                        <>
                            {!isAdmin && <ControlScheduleNotifications user={user} records={userRecords} />}

                            {isAdmin ? (
                                <AdminDashboard
                                    user={user}
                                    appointments={appointments}
                                    medicalRecords={medicalRecords}
                                    setActiveTab={setActiveTab}
                                />
                            ) : (
                                <PatientDashboard
                                    user={user}
                                    appointments={userAppointments}
                                    medicalRecords={userRecords}
                                />
                            )}
                        </>
                    )}

                    {activeTab === 'booking' && !isAdmin && (
                        <AppointmentBooking user={user} onBook={handleBookAppointment} />
                    )}

                    {activeTab === 'appointments' && (
                        isAdmin ? (
                            <AppointmentManagement
                                appointments={appointments}
                                onUpdateStatus={handleUpdateAppointmentStatus}
                                currentDoctorId={user.id}
                            />
                        ) : (
                            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Jadwal Saya</h2>
                                {userAppointments.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">Belum ada jadwal</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {userAppointments.map(apt => (
                                            <div key={apt.id} className={`border rounded-2xl p-6 ${apt.status === 'approved' ? 'border-green-200 bg-green-50' :
                                                apt.status === 'pending' ? 'border-orange-200 bg-orange-50' :
                                                    'border-red-200 bg-red-50'
                                                } hover:shadow-lg transition-all`}>
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h3 className="font-semibold text-gray-800 text-lg">{apt.poli}</h3>
                                                            <span className="text-xs bg-white/50 px-2 py-1 rounded-lg">
                                                                {apt.doctorName}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            {formatDate(apt.date)} - {apt.time}
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-1">{apt.complaint}</p>
                                                    </div>
                                                    <span className={`px-4 py-2 rounded-xl text-sm font-medium ${apt.status === 'approved' ? 'bg-green-500 text-white' :
                                                        apt.status === 'pending' ? 'bg-orange-500 text-white' :
                                                            'bg-red-500 text-white'
                                                        }`}>
                                                        {apt.status === 'approved' ? 'Disetujui' :
                                                            apt.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    )}

                    {activeTab === 'medical-form' && isAdmin && (
                        <MedicalRecordForm
                            appointments={appointments}
                            onSave={handleSaveMedicalRecord}
                            currentDoctorId={user.id}
                            currentDoctorName={user.name}
                        />
                    )}

                    {activeTab === 'records' && (
                        <MedicalRecordsList records={userRecords} isAdmin={isAdmin} />
                    )}

                    {activeTab === 'report' && isAdmin && (
                        <MonthlyReport records={userRecords} />
                    )}

                    {activeTab === 'patients' && isAdmin && (
                        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Pasien</h2>
                            <div className="space-y-4">
                                {JSON.parse(localStorage.getItem('patients') || '[]').map(patient => (
                                    <div key={patient.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-lg">{patient.name}</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                                                    <div>
                                                        <p className="text-gray-500">Email</p>
                                                        <p className="text-gray-700 font-medium">{patient.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Telepon</p>
                                                        <p className="text-gray-700 font-medium">{patient.phone}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Gol. Darah</p>
                                                        <p className="text-gray-700 font-medium">{patient.bloodType}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Jenis Kelamin</p>
                                                        <p className="text-gray-700 font-medium">{patient.gender}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'poli-umum' && isAdmin && (
                        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Poli Umum - Pasien Saya</h2>
                            <div className="space-y-4">
                                {appointments.filter(a => a.poli === 'Poli Umum' && a.doctorId === user.id).length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Stethoscope className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">Belum ada pasien Poli Umum untuk Anda</p>
                                    </div>
                                ) : (
                                    appointments.filter(a => a.poli === 'Poli Umum' && a.doctorId === user.id).map(apt => (
                                        <div key={apt.id} className="border border-purple-200 rounded-2xl p-6 bg-purple-50 hover:shadow-lg transition-all">
                                            <h3 className="font-semibold text-gray-800 text-lg">{apt.patientName}</h3>
                                            <p className="text-sm text-gray-600 mt-2">{formatDate(apt.date)} - {apt.time}</p>
                                            <p className="text-sm text-gray-600 mt-1">Keluhan: {apt.complaint}</p>
                                            <span className={`inline-block mt-3 px-4 py-2 rounded-xl text-sm font-medium ${apt.status === 'approved' ? 'bg-green-500 text-white' :
                                                apt.status === 'pending' ? 'bg-orange-500 text-white' :
                                                    'bg-red-500 text-white'
                                                }`}>
                                                {apt.status === 'approved' ? 'Disetujui' :
                                                    apt.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'poli-gigi' && isAdmin && (
                        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Poli Gigi - Pasien Saya</h2>
                            <div className="space-y-4">
                                {appointments.filter(a => a.poli === 'Poli Gigi' && a.doctorId === user.id).length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Activity className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">Belum ada pasien Poli Gigi untuk Anda</p>
                                    </div>
                                ) : (
                                    appointments.filter(a => a.poli === 'Poli Gigi' && a.doctorId === user.id).map(apt => (
                                        <div key={apt.id} className="border border-orange-200 rounded-2xl p-6 bg-orange-50 hover:shadow-lg transition-all">
                                            <h3 className="font-semibold text-gray-800 text-lg">{apt.patientName}</h3>
                                            <p className="text-sm text-gray-600 mt-2">{formatDate(apt.date)} - {apt.time}</p>
                                            <p className="text-sm text-gray-600 mt-1">Keluhan: {apt.complaint}</p>
                                            <span className={`inline-block mt-3 px-4 py-2 rounded-xl text-sm font-medium ${apt.status === 'approved' ? 'bg-green-500 text-white' :
                                                apt.status === 'pending' ? 'bg-orange-500 text-white' :
                                                    'bg-red-500 text-white'
                                                }`}>
                                                {apt.status === 'approved' ? 'Disetujui' :
                                                    apt.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}