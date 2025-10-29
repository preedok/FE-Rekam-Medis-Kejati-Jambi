// src/utils/helpers.js

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const calculateDaysDifference = (date1, date2) => {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const isUpcomingDate = (date, daysThreshold = 7) => {
    const today = new Date();
    const targetDate = new Date(date);
    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= daysThreshold;
};

export const downloadTextFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'approved':
            return 'bg-green-500 text-white';
        case 'pending':
            return 'bg-orange-500 text-white';
        case 'rejected':
            return 'bg-red-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

export const getStatusText = (status) => {
    switch (status) {
        case 'approved':
            return 'Disetujui';
        case 'pending':
            return 'Menunggu';
        case 'rejected':
            return 'Ditolak';
        default:
            return status;
    }
};