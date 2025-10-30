// src/components/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BLOOD_TYPES, GENDERS } from '../../utils/constants';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
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
        const result = register(formData);
        if (result.success) {
            alert(result.message);
            navigate('/login');
        } else {
            alert(result.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                                {GENDERS.map((gender) => (
                                    <option key={gender} value={gender}>{gender}</option>
                                ))}
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
                                {BLOOD_TYPES.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
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
                            onClick={() => navigate('/login')}
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

export default RegisterPage;