import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DOCTORS } from '../../utils/constants';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');

    const handleLogin = (e) => {
        e.preventDefault();
        const result = login(email, password, role);
        if (result.success) {
            navigate('/dashboard');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-800 to-teal-950">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

                {/* Floating Icons */}
                <div className="absolute top-20 left-10 text-teal-400 opacity-20 animate-float">
                    <Activity className="w-12 h-12" />
                </div>
                <div className="absolute top-40 right-20 text-emerald-400 opacity-20 animate-float-reverse">
                    <Activity className="w-16 h-16" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                        <Activity className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Kejati Jambi</h1>
                    <p className="text-gray-500">Digital Health System</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
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
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                        Masuk
                    </button>
                </form>

                {role === 'patient' && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Belum punya akun?{' '}
                            <button
                                className="text-teal-600 font-semibold hover:underline"
                                onClick={() => navigate('/register')}
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
                            {DOCTORS.map((doctor) => (
                                <div key={doctor.id} className="bg-white p-2 rounded-lg">
                                    <p className="font-medium text-teal-700">{doctor.name}</p>
                                    <p className="text-xs text-gray-500">Jadwal: {doctor.schedule}</p>
                                    <p className="mt-1">Email: {doctor.email}</p>
                                    <p>Password: {doctor.password}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;