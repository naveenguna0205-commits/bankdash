import React from 'react';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import { BankDashLogo } from '../common/BankDashLogo';
import {
  NavDashboardIcon,
  NavTransactionsIcon,
  NavAccountsIcon,
  NavInvestmentsIcon,
  NavCreditCardsIcon,
  NavLoansIcon,
  NavServicesIcon,
  NavPrivilegesIcon,
  NavSettingsIcon
} from '../icons/SidebarIcons';

const NAV_ITEMS = [
  { id: 'Dashboard', label: 'Dashboard', icon: NavDashboardIcon },
  { id: 'Transactions', label: 'Transactions', icon: NavTransactionsIcon },
  { id: 'Accounts', label: 'Accounts', icon: NavAccountsIcon },
  { id: 'Investments', label: 'Investments', icon: NavInvestmentsIcon },
  { id: 'Credit Cards', label: 'Credit Cards', icon: NavCreditCardsIcon },
  { id: 'Loans', label: 'Loans', icon: NavLoansIcon },
  { id: 'Services', label: 'Services', icon: NavServicesIcon },
  { id: 'My Privileges', label: 'My Privileges', icon: NavPrivilegesIcon },
  { id: 'Setting', label: 'Setting', icon: NavSettingsIcon },
];

export const Sidebar = () => {
  const { currentTab, setCurrentTab, isMobileSidebarOpen, setIsMobileSidebarOpen } = useApp();

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#172554] border-r border-[#1e3a8a]/40 select-none">
      {/* Brand Logo Header (No bottom line) */}
      <div className="h-20 sm:h-24 flex items-center justify-between px-7">
        <BankDashLogo textColor="text-white" onClick={() => handleNavClick('Dashboard')} />

        {/* Mobile & Tablet close button */}
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links (No dash / indicator lines) */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3.5 lg:gap-4.5 py-3 lg:py-3.5 px-4 lg:px-5 rounded-xl text-[14px] lg:text-[15px] font-medium transition-all duration-200 group text-left cursor-pointer ${
                isActive
                  ? 'font-bold text-white bg-[#2563EB]/25'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon
                className={`w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-[#60A5FA]' : 'text-white/70 group-hover:text-white'
                }`}
              />

              <span className="tracking-tight truncate text-white font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {navContent}
      </aside>

      {/* Mobile & Tablet Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile & Tablet Slide-over Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>
    </>
  );
};

export default Sidebar;
