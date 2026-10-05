import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import settingsBtnImg from '../../assets/icons/settings-btn.png';
import notificationBtnImg from '../../assets/icons/notification-btn.png';
import charleneImg from '../../assets/icons/charlene.png';

export const Header = () => {
  const {
    currentTab,
    setCurrentTab,
    userProfile,
    notifications,
    markAllNotificationsRead,
    searchQuery,
    setSearchQuery,
    globalSearchResults,
    setIsMobileSidebarOpen,
    isNotificationsOpen,
    setIsNotificationsOpen
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsNotificationsOpen]);

  const handleSearchResultClick = (result) => {
    setCurrentTab(result.targetTab);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  const getPageTitle = () => {
    if (currentTab === 'Dashboard') return 'Overview';
    return currentTab;
  };

  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="bg-[#1E3A8A] border-b border-[#172554]/60 sticky top-0 z-20 shadow-sm">
      {/* Main Header Bar */}
      <header className="h-16 md:h-20 lg:h-24 px-3.5 sm:px-6 lg:px-8 flex items-center justify-between transition-colors gap-3 max-w-[1440px] mx-auto">
        {/* Left: Hamburger Icon (Mobile & Tablet) + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 -ml-1 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-xl sm:text-[22px] md:text-[24px] lg:text-[28px] font-bold text-white tracking-tight m-0 truncate">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right Controls: Search, Settings Icon, Notifications Icon, Profile Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-6 shrink-0">
          {/* Search Bar (Tablet & Desktop inline) */}
          <div ref={searchRef} className="relative hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-blue-200 absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200" />
              <input
                type="text"
                placeholder="Search for something"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                autoComplete="off"
                className="w-40 sm:w-48 md:w-56 lg:w-64 pl-10 lg:pl-12 pr-4 py-2 lg:py-2.5 bg-white/10 text-xs lg:text-sm text-white placeholder-blue-200/70 rounded-full border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/40 focus:bg-[#172554] focus:outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown Results */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#131E36] rounded-2xl shadow-2xl border border-[#1E293B] p-3 z-50 animate-fade-in-scale">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1E293B] text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  <span>Matching Results</span>
                  <span>{globalSearchResults.length} found</span>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-[#1E293B] mt-1">
                  {globalSearchResults.length === 0 ? (
                    <div className="text-center py-6 text-sm text-[#94A3B8]">
                      No results found for "{searchQuery}"
                    </div>
                  ) : (
                    globalSearchResults.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearchResultClick(item)}
                        className="w-full px-3 py-2.5 text-left hover:bg-[#1A2744] rounded-xl flex items-center justify-between group transition-colors cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[#1A2744] text-blue-400 font-medium border border-[#1E293B]">
                              {item.type}
                            </span>
                            <span className="text-sm font-semibold text-[#F8FAFC] truncate">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] mt-0.5 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#818CF8] shrink-0 transition-colors" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setCurrentTab('Setting')}
            className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:opacity-85 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Setting"
            aria-label="Setting"
          >
            <img src={settingsBtnImg} alt="Setting" className="w-full h-full object-contain" />
          </button>

          {/* Notifications Button */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center hover:opacity-85 active:scale-95 transition-all cursor-pointer shrink-0 relative"
              title="Notifications"
              aria-label="Notifications"
            >
              <img src={notificationBtnImg} alt="Notifications" className="w-full h-full object-contain" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-rose-500 border-2 border-[#1E3A8A] animate-pulse" />
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-88 bg-[#131E36] rounded-2xl shadow-2xl border border-[#1E293B] p-4 z-50 animate-fade-in-scale">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <span className="text-sm font-bold text-[#F8FAFC]">Notifications</span>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="mt-2 divide-y divide-[#1E293B] max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 flex items-start gap-3 hover:bg-[#1A2744] p-1.5 rounded-xl transition-colors">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          n.unread ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#F8FAFC]">{n.title}</p>
                        <p className="text-xs text-[#94A3B8] mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center rounded-full focus:outline-none cursor-pointer group"
            >
              <img
                src={userProfile.avatar || charleneImg}
                alt={userProfile.name}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover shadow-xs border border-white/20 group-hover:scale-105 transition-transform"
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#131E36] rounded-2xl shadow-2xl border border-[#1E293B] p-3 z-50 animate-fade-in-scale">
                <div className="p-2.5 bg-[#1A2744] rounded-xl mb-2 border border-[#1E293B]">
                  <p className="text-sm font-bold text-[#F8FAFC] truncate">{userProfile.name}</p>
                  <p className="text-xs text-[#94A3B8] truncate">{userProfile.email}</p>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setCurrentTab('Setting');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[#F8FAFC] hover:bg-[#1A2744] rounded-xl transition-colors cursor-pointer"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('Credit Cards');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[#F8FAFC] hover:bg-[#1A2744] rounded-xl transition-colors cursor-pointer"
                  >
                    My Cards
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Persistent Mobile Search Bar (Only on phones < sm) */}
      <div className="sm:hidden px-4 pb-3 pt-0 bg-[#1E3A8A] relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-blue-200 absolute left-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for something"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            className="w-full pl-11 pr-4 py-2.5 bg-white/10 text-sm text-white placeholder-blue-200/70 rounded-full border border-white/15 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/40 focus:bg-[#172554] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Dropdown Results on Mobile */}
        {searchQuery.trim() && (
          <div className="mt-2 bg-[#131E36] rounded-2xl shadow-2xl border border-[#1E293B] p-3 max-h-64 overflow-y-auto divide-y divide-[#1E293B] absolute left-4 right-4 z-50 animate-fade-in-scale">
            <div className="flex items-center justify-between px-2 py-1 border-b border-[#1E293B] text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
              <span>Matching Results</span>
              <span>{globalSearchResults.length} found</span>
            </div>
            {globalSearchResults.length === 0 ? (
              <div className="text-center py-4 text-xs text-[#94A3B8]">
                No results found for "{searchQuery}"
              </div>
            ) : (
              globalSearchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearchResultClick(item)}
                  className="w-full px-3 py-2 text-left hover:bg-[#1A2744] rounded-xl flex items-center justify-between group transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1A2744] text-blue-400 font-medium border border-[#1E293B]">
                        {item.type}
                      </span>
                      <span className="text-xs font-semibold text-[#F8FAFC] truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
