import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  ShoppingBag,
  ShieldCheck,
  HandCoins,
  Briefcase,
  BarChart2,
  User
} from 'lucide-react';

export const ServicesPage = () => {
  const { services, addToast } = useApp();

  const kpis = services.kpis || [
    { id: 'skpi-1', title: 'Life Insurance', subtitle: 'Unlimited protection', icon: 'shield-heart', color: 'blue' },
    { id: 'skpi-2', title: 'Shopping', subtitle: 'Buy. Think. Grow.', icon: 'shopping-bag', color: 'amber' },
    { id: 'skpi-3', title: 'Safety', subtitle: 'We are your allies', icon: 'safety', color: 'teal' }
  ];

  const servicesList = services.servicesList || [];

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 animate-fade-in-up">
      {/* Top 3 KPI Stat Cards - Carousel on mobile, 3 cols on desktop */}
      <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {kpis.map((kpi) => {
          let iconEl = <Shield className="w-6 h-6 text-[#4F46E5]" />;
          let iconBg = 'bg-[#EEF2FF] text-[#4F46E5]';
          if (kpi.color === 'amber') {
            iconEl = <ShoppingBag className="w-6 h-6 text-[#7C3AED]" />;
            iconBg = 'bg-[#F5F3FF] text-[#7C3AED]';
          } else if (kpi.color === 'teal') {
            iconEl = <ShieldCheck className="w-6 h-6 text-[#6D28D9]" />;
            iconBg = 'bg-[#EDE9FE] text-[#6D28D9]';
          }

          return (
            <div
              key={kpi.id}
              className="min-w-[240px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-6 border border-[#E6EFF5] dark:border-[#1E293B] flex items-center gap-4 sm:gap-5 shadow-xs card-hover transition-all"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 transition-transform ${iconBg}`}>
                {iconEl}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[#1E293B] dark:text-[#F8FAFC] truncate">
                  {kpi.title}
                </h3>
                <span className="text-xs text-[#718EBF] dark:text-[#94A3B8] block mt-0.5 truncate">
                  {kpi.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bank Services List */}
      <div className="space-y-4">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
          Bank Services List
        </h2>

        <div className="space-y-3">
          {servicesList.map((item) => {
            let iconEl = <HandCoins className="w-5 h-5 text-[#4F46E5]" />;
            let iconBg = 'bg-[#EEF2FF] dark:bg-[#4F46E5]/20 text-[#4F46E5]';

            if (item.icon === 'briefcase') {
              iconEl = <Briefcase className="w-5 h-5 text-[#7C3AED]" />;
              iconBg = 'bg-[#F5F3FF] dark:bg-[#7C3AED]/20 text-[#7C3AED]';
            } else if (item.icon === 'bar-chart') {
              iconEl = <BarChart2 className="w-5 h-5 text-[#6D28D9] dark:text-[#C4B5FD]" />;
              iconBg = 'bg-[#EDE9FE] dark:bg-[#6D28D9]/20 text-[#6D28D9]';
            } else if (item.icon === 'user') {
              iconEl = <User className="w-5 h-5 text-[#6366F1]" />;
              iconBg = 'bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#6366F1]';
            } else if (item.icon === 'safety') {
              iconEl = <ShieldCheck className="w-5 h-5 text-[#A855F7]" />;
              iconBg = 'bg-[#F5F3FF] dark:bg-[#A855F7]/20 text-[#A855F7]';
            }

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#131E36] rounded-[18px] sm:rounded-[25px] p-4 sm:p-5 border border-[#E6EFF5] dark:border-[#1E293B] flex items-center justify-between gap-4 shadow-xs card-hover transition-all"
              >
                {/* Left Title with Icon */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-[16px] sm:rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
                    {iconEl}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] sm:text-[15px] font-bold text-[#1E293B] dark:text-[#F8FAFC] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] sm:text-[12px] text-[#718EBF] dark:text-[#94A3B8] block mt-0.5 truncate">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                {/* 3 Middle Columns (Tablet & Desktop) */}
                <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-8 flex-1 max-w-xl text-left px-2 lg:px-4">
                  <div>
                    <span className="text-xs sm:text-[14px] font-semibold text-[#F8FAFC] block">
                      {item.col1}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#94A3B8] block mt-0.5">
                      {item.col1Sub}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-[14px] font-semibold text-[#F8FAFC] block">
                      {item.col2}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#94A3B8] block mt-0.5">
                      {item.col2Sub}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-[14px] font-semibold text-[#F8FAFC] block">
                      {item.col3}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#94A3B8] block mt-0.5">
                      {item.col3Sub}
                    </span>
                  </div>
                </div>

                {/* View Details Outline Pill Button */}
                <div className="flex justify-end shrink-0">
                  <button
                    onClick={() => {
                      addToast('Service Active', `${item.title} is active on your account.`, 'info');
                    }}
                    className="rounded-full px-5 py-1.5 sm:px-6 sm:py-2 border border-slate-700 hover:border-[#818CF8] text-[12px] sm:text-[14px] font-medium text-[#94A3B8] hover:text-[#818CF8] active:scale-95 transition-all cursor-pointer whitespace-nowrap bg-transparent"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
