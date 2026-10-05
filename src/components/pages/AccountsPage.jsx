import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard } from '../common/CreditCard';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { debitCreditWeeklyData } from '../../data/initialData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from 'recharts';

/**
 * Top Stat Card Icons
 */
const BalanceBagIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C10.9 2 10 2.9 10 4V5.1C7.2 5.6 5 8 5 11C5 13.5 6.5 15.6 8.7 16.5L7.3 19.3C7.1 19.7 7.4 20.2 7.9 20.2H16.1C16.6 20.2 16.9 19.7 16.7 19.3L15.3 16.5C17.5 15.6 19 13.5 19 11C19 8 16.8 5.6 14 5.1V4C14 2.9 13.1 2 12 2Z" opacity="0.2" />
    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a2 2 0 0 0-2-2ZM12 16c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3Z" fill="currentColor" />
    <path d="M12 11.5v3M11 12.5h2" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IncomeHandIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="6" r="3.5" />
    <path d="M3 14.5C3 13.1 4.1 12 5.5 12H12C13.1 12 14 12.9 14 14V14.5L18.5 13C19.3 12.7 20.2 13.1 20.5 13.9C20.8 14.7 20.4 15.6 19.6 15.9L14 18.5V21H3V14.5Z" />
  </svg>
);

const ExpenseReceiptIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 3C3.4 3 3 3.4 3 4V20C3 20.6 3.4 21 4 21H20C20.6 21 21 20.6 21 20V4C21 3.4 20.6 3 20 3H4ZM8 8H16V9.5H8V8ZM8 11.5H16V13H8V11.5ZM8 15H13V16.5H8V15Z" />
  </svg>
);

const SavingPiggyIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 10C19 7.2 16.8 5 14 5C13.5 5 13 5.1 12.5 5.2C11.8 3.9 10.5 3 9 3C6.8 3 5 4.8 5 7C5 7.4 5.1 7.7 5.2 8.1C3.3 9.4 2 11.6 2 14.1C2 17.9 5.1 21 9 21H16C18.2 21 20 19.2 20 17V15C21.1 15 22 14.1 22 13V12C22 10.9 21.1 10 20 10H19ZM12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8Z" />
  </svg>
);

/**
 * Last Transaction Icon components
 */
const RepeatArrowsIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const ServiceWrenchIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const UserSilhouetteIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/**
 * Invoices Sent Icon components
 */
const AppleLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.64-.78 1.08-1.86.96-2.88-.93.04-2.06.62-2.73 1.4-.58.68-1.1 1.77-.96 2.81 1.04.08 2.09-.55 2.73-1.33z"/>
  </svg>
);

const PlaystationIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.5 4.5v15l5-3v-9l-5-3zm6 3.5l4 2.5-4 2.5v-5zm-7 8l-4-2.5 4-2.5v5z" />
  </svg>
);

// Custom Chart Tooltip
const CustomDebitTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-700/60 text-white text-xs space-y-1.5 animate-fade-in-scale">
        <p className="font-bold text-slate-300 border-b border-slate-700 pb-1">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Debit:
          </span>
          <span className="font-bold font-mono">${payload[0]?.value || 0}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" /> Credit:
          </span>
          <span className="font-bold font-mono">${payload[1]?.value || 0}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const AccountsPage = () => {
  const { accounts, cards, setCurrentTab } = useApp();

  // Top KPI Card Data matching Figma
  const kpis = [
    {
      id: 'kpi-balance',
      title: 'My Balance',
      value: accounts.kpis?.myBalance ?? 12750,
      icon: BalanceBagIcon,
      bgColor: 'bg-[#EEF2FF]',
      iconColor: 'text-[#4F46E5]'
    },
    {
      id: 'kpi-income',
      title: 'Income',
      value: accounts.kpis?.income ?? 5600,
      icon: IncomeHandIcon,
      bgColor: 'bg-[#F5F3FF]',
      iconColor: 'text-[#7C3AED]'
    },
    {
      id: 'kpi-expense',
      title: 'Expense',
      value: accounts.kpis?.expense ?? 3460,
      icon: ExpenseReceiptIcon,
      bgColor: 'bg-[#EDE9FE]',
      iconColor: 'text-[#6D28D9]'
    },
    {
      id: 'kpi-saving',
      title: 'Total Saving',
      value: accounts.kpis?.totalSaving ?? 7920,
      icon: SavingPiggyIcon,
      bgColor: 'bg-[#EEF2FF]',
      iconColor: 'text-[#4F46E5]'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 animate-fade-in-up">
      {/* Top 4 KPI Stat Cards with Animated Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="bg-[#131E36] rounded-[20px] sm:rounded-[25px] p-4 sm:p-5 lg:p-6 flex items-center gap-3 sm:gap-4.5 border border-[#1E293B] shadow-xs card-hover transition-all duration-300"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shrink-0 ${kpi.bgColor} ${kpi.iconColor}`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-[14px] font-medium text-[#94A3B8] block truncate">
                  {kpi.title}
                </span>
                <span className="text-base sm:text-[20px] lg:text-[24px] font-bold text-[#F8FAFC] block truncate mt-0.5 tracking-tight">
                  <AnimatedNumber
                    value={kpi.value}
                    prefix="$"
                    decimals={0}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content: 2-Column layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Left Column: Last Transaction + Debit & Credit Overview */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6 sm:space-y-8">
          {/* 1. Last Transaction */}
          <div className="space-y-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Last Transaction
            </h2>

            <div className="bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-4 sm:p-6 border border-[#1E293B] shadow-xs space-y-3.5 sm:space-y-4">
              {/* Row 1: Spotify Subscription */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#FF82AC]/20 text-[#FDA4AF] group-hover:scale-105 transition-transform">
                    <RepeatArrowsIcon className="w-5 h-5 text-[#FDA4AF]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate">
                      Spotify Subscription
                    </p>
                    <span className="text-xs sm:text-[13px] font-medium text-[#94A3B8] block mt-0.5">
                      25 Jan 2021
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 lg:gap-14 text-[13px] sm:text-[14px] font-medium text-[#94A3B8]">
                  <span className="min-w-[70px]">Shopping</span>
                  <span className="font-mono">1234 ****</span>
                  <span className="min-w-[70px]">Pending</span>
                </div>

                <span className="text-[14px] sm:text-[15px] font-bold text-[#FE5C73] shrink-0 font-mono">
                  -$150
                </span>
              </div>

              {/* Row 2: Mobile Service */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#396AFF]/20 text-[#93C5FD] group-hover:scale-105 transition-transform">
                    <ServiceWrenchIcon className="w-5 h-5 text-[#93C5FD]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate">
                      Mobile Service
                    </p>
                    <span className="text-xs sm:text-[13px] font-medium text-[#94A3B8] block mt-0.5">
                      25 Jan 2021
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 lg:gap-14 text-[13px] sm:text-[14px] font-medium text-[#94A3B8]">
                  <span className="min-w-[70px]">Service</span>
                  <span className="font-mono">1234 ****</span>
                  <span className="min-w-[70px]">Completed</span>
                </div>

                <span className="text-[14px] sm:text-[15px] font-bold text-[#FE5C73] shrink-0 font-mono">
                  -$340
                </span>
              </div>

              {/* Row 3: Emilly Wilson */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#FFBB38]/20 text-[#FCD34D] group-hover:scale-105 transition-transform">
                    <UserSilhouetteIcon className="w-5 h-5 text-[#FCD34D]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate">
                      Emilly Wilson
                    </p>
                    <span className="text-xs sm:text-[13px] font-medium text-[#94A3B8] block mt-0.5">
                      25 Jan 2021
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 lg:gap-14 text-[13px] sm:text-[14px] font-medium text-[#94A3B8]">
                  <span className="min-w-[70px]">Transfer</span>
                  <span className="font-mono">1234 ****</span>
                  <span className="min-w-[70px]">Completed</span>
                </div>

                <span className="text-[14px] sm:text-[15px] font-bold text-[#10B981] shrink-0 font-mono">
                  +$780
                </span>
              </div>
            </div>
          </div>

          {/* 2. Debit & Credit Overview */}
          <div className="space-y-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Debit & Credit Overview
            </h2>

            <div className="bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-6 border border-[#1E293B] shadow-xs">
              {/* Chart Header with Amount Text and Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="text-xs sm:text-sm text-[#94A3B8]">
                  <span className="font-bold text-[#F8FAFC]">$7,560</span> Debited &{' '}
                  <span className="font-bold text-[#F8FAFC]">$5,420</span> Credited in this Week
                </div>

                <div className="flex items-center gap-5 text-xs sm:text-[13px] font-medium self-end sm:self-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-[4px] bg-[#4F46E5]" />
                    <span className="text-[#94A3B8]">Debit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-[4px] bg-[#7C3AED]" />
                    <span className="text-[#94A3B8]">Credit</span>
                  </div>
                </div>
              </div>

              {/* Clean Bar Chart */}
              <div className="h-60 sm:h-64 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart
                    data={debitCreditWeeklyData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    barGap={6}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94A3B8', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomDebitTooltip />} />
                    <Bar
                      dataKey="debit"
                      name="Debit"
                      fill="#4F46E5"
                      radius={[6, 6, 6, 6]}
                      barSize={13}
                    />
                    <Bar
                      dataKey="credit"
                      name="Credit"
                      fill="#7C3AED"
                      radius={[6, 6, 6, 6]}
                      barSize={13}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: My Card + Invoices Sent */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6 sm:space-y-8">
          {/* 3. My Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
                My Card
              </h2>
              <button
                onClick={() => setCurrentTab('Credit Cards')}
                className="text-sm sm:text-[15px] font-semibold text-[#94A3B8] hover:text-[#818CF8] transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none select-none"
              >
                See All
              </button>
            </div>

            {cards[0] && (
              <CreditCard
                card={{
                  ...cards[0],
                  cardType: 'primary'
                }}
              />
            )}
          </div>

          {/* 4. Invoices Sent */}
          <div className="space-y-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Invoices Sent
            </h2>

            <div className="bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-4 sm:p-6 border border-[#1E293B] shadow-xs space-y-3 sm:space-y-3.5">
              {/* Row 1: Apple Store */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#4F46E5]/20 text-[#818CF8] group-hover:scale-105 transition-transform">
                    <AppleLogo className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-semibold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate">
                      Apple Store
                    </p>
                    <span className="text-xs text-[#94A3B8] block mt-0.5">
                      5h ago
                    </span>
                  </div>
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#F8FAFC] shrink-0 font-mono">
                  $450
                </span>
              </div>

              {/* Row 2: Michael */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#7C3AED]/20 text-[#DDD6FE] group-hover:scale-105 transition-transform">
                    <UserSilhouetteIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#C4B5FD] transition-colors truncate">
                      Michael
                    </p>
                    <span className="text-xs text-[#94A3B8] block mt-0.5">
                      2 days ago
                    </span>
                  </div>
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#F8FAFC] shrink-0 font-mono">
                  $160
                </span>
              </div>

              {/* Row 3: Playstation */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#6D28D9]/20 text-[#C4B5FD] group-hover:scale-105 transition-transform">
                    <PlaystationIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#DDD6FE] transition-colors truncate">
                      Playstation
                    </p>
                    <span className="text-xs text-[#94A3B8] block mt-0.5">
                      5 days ago
                    </span>
                  </div>
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#F8FAFC] shrink-0 font-mono">
                  $1085
                </span>
              </div>

              {/* Row 4: William */}
              <div className="flex items-center justify-between p-1 sm:p-2 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#4F46E5]/20 text-[#818CF8] group-hover:scale-105 transition-transform">
                    <UserSilhouetteIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate">
                      William
                    </p>
                    <span className="text-xs text-[#94A3B8] block mt-0.5">
                      10 days ago
                    </span>
                  </div>
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#F8FAFC] shrink-0 font-mono">
                  $90
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
