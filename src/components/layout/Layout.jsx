import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastContainer } from '../common/Toast';

export const Layout = ({ children }) => {
  const { currentTab } = useApp();
  const mainRef = useRef(null);

  // Automatically scroll back to the top whenever the page/tab changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    window.scrollTo(0, 0);
  }, [currentTab]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F5F7FA] dark:bg-[#0B1120]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable Page Content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto pb-10 space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Global Toast System */}
      <ToastContainer />
    </div>
  );
};
