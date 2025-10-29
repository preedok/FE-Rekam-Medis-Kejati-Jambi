// src/utils/constants.js

export const DOCTORS = [
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

export const POLI_TYPES = {
    UMUM: 'Poli Umum',
    GIGI: 'Poli Gigi'
};

export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

export const BLOOD_TYPES = ['A', 'B', 'AB', 'O'];

export const GENDERS = ['Laki-laki', 'Perempuan'];

export const STORAGE_KEYS = {
    PATIENTS: 'patients',
    APPOINTMENTS: 'appointments',
    MEDICAL_RECORDS: 'medicalRecords',
    CURRENT_USER: 'currentUser'
};