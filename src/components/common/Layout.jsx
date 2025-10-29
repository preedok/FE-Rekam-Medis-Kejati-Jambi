import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300 p-8`}>
                <Header />
                <div className="mt-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;