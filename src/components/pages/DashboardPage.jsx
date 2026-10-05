import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard } from '../common/CreditCard';
import { ExpenseStatisticsChart } from '../common/ExpenseStatisticsChart';
import {
  weeklyActivityData,
  balanceHistoryWaveData
} from '../../data/initialData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  ChevronRight,
  Send,
  CreditCard as CreditCardIcon
} from 'lucide-react';

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-700/60 text-white text-xs space-y-1.5 animate-fade-in-scale">
        <p className="font-bold text-slate-300 border-b border-slate-700 pb-1">{label} Overview</p>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" /> Deposit:
          </span>
          <span className="font-bold font-mono">${payload[1]?.value || 0}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Withdraw:
          </span>
          <span className="font-bold font-mono">${payload[0]?.value || 0}</span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomAreaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md p-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-700/60 text-white text-xs animate-fade-in-scale">
        <span className="text-slate-400 text-[11px] block">{label || 'Balance'}</span>
        <span className="font-bold text-base text-indigo-400 font-mono mt-0.5 block">
          ${payload[0]?.value?.toLocaleString()}
        </span>
      </div>
    );
  }
  return null;
};

export const DashboardPage = () => {
  const {
    cards,
    transactions,
    contacts,
    executeTransfer,
    setCurrentTab
  } = useApp();

  const [transferAmount, setTransferAmount] = useState('500.00');
  const [selectedContact, setSelectedContact] = useState(contacts[0]?.id || 'c-1');
  const [contactScrollIndex, setContactScrollIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!transferAmount || isNaN(parseFloat(transferAmount))) return;

    setIsSending(true);
    setTimeout(() => {
      const success = executeTransfer(selectedContact, transferAmount);
      setIsSending(false);
      if (success !== false) {
        setTransferAmount('');
      }
    }, 300);
  };

  const handleNextContacts = () => {
    setContactScrollIndex((prev) => (prev + 1) % Math.max(1, contacts.length - 2));
  };

  const visibleContacts = contacts.slice(contactScrollIndex, contactScrollIndex + 3);

  // Recent 3 transactions for dashboard widget
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
      {/* Top Row: My Cards (Left) + Recent Transaction (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Left Column: My Cards */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              My Cards
            </h2>
            <button
              onClick={() => setCurrentTab('Credit Cards')}
              className="text-sm sm:text-[15px] font-semibold text-[#94A3B8] hover:text-[#818CF8] transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none select-none"
            >
              See All
            </button>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 gap-4 sm:gap-5 overflow-x-auto snap-x pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {cards.slice(0, 2).map((card, idx) => (
              <div key={card.id} className="min-w-[280px] sm:min-w-0 flex-1 snap-center">
                <CreditCard
                  card={{
                    ...card,
                    cardType: idx === 0 ? 'primary' : 'light'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Transaction */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Recent Transaction
            </h2>
          </div>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#1E293B] flex flex-col justify-between gap-3 h-full min-h-[235px] shadow-xs">
            {recentTransactions.map((tx) => {
              const isNegative = tx.amount < 0;
              const absAmount = Math.abs(tx.amount);

              let iconBg = 'bg-[#FFBB38]/20 text-[#FCD34D]';
              if (tx.iconType === 'paypal') iconBg = 'bg-[#396AFF]/20 text-[#93C5FD]';
              if (tx.iconType === 'transfer') iconBg = 'bg-[#16DBCC]/20 text-[#5EEAD4]';

              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 p-1.5 rounded-2xl transition-all duration-200 cursor-pointer group hover:translate-x-1 hover:bg-indigo-500/10"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${iconBg}`}
                    >
                      {tx.iconType === 'card' && (
                        <CreditCardIcon className="w-5 h-5 text-[#FCD34D]" strokeWidth={2.3} />
                      )}
                      {tx.iconType === 'paypal' && (
                        <span className="font-black text-lg font-serif text-[#93C5FD] leading-none">P</span>
                      )}
                      {tx.iconType === 'transfer' && (
                        <svg className="w-5 h-5 text-[#5EEAD4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="9"/>
                          <path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4M12 7v10"/>
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] sm:text-[15px] font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate">
                        {tx.description}
                      </p>
                      <span className="text-xs sm:text-[13px] font-medium text-[#94A3B8] block mt-0.5">
                        {tx.dateFormatted}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-sm sm:text-[15px] font-bold shrink-0 font-mono ${
                      isNegative ? 'text-[#FE5C73]' : 'text-[#10B981]'
                    }`}
                  >
                    {isNegative ? `-$${absAmount.toLocaleString()}` : `+$${absAmount.toLocaleString()}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Middle Row: Weekly Activity (Left) + Expense Statistics (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Weekly Activity Bar Chart */}
        <div className="md:col-span-7 lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Weekly Activity
            </h2>
            <div className="flex items-center gap-6 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#7C3AED]" />
                <span className="text-[#94A3B8] font-medium">Deposit</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#4F46E5]" />
                <span className="text-[#94A3B8] font-medium">Withdraw</span>
              </div>
            </div>
          </div>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-7 border border-[#1E293B] shadow-xs">
            <div className="h-64 sm:h-72 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart
                  data={weeklyActivityData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    domain={[0, 500]}
                    ticks={[0, 100, 200, 300, 400, 500]}
                  />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.05)' }} />
                  <Bar
                    dataKey="withdraw"
                    name="Withdraw"
                    fill="#4F46E5"
                    radius={[10, 10, 10, 10]}
                    barSize={13}
                  />
                  <Bar
                    dataKey="deposit"
                    name="Deposit"
                    fill="#7C3AED"
                    radius={[10, 10, 10, 10]}
                    barSize={13}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Expense Statistics Chart */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Expense Statistics
            </h2>
          </div>

          <div className="bg-[#131E36] rounded-[25px] p-4 sm:p-6 border border-[#1E293B] flex flex-col items-center justify-center min-h-[330px] h-[calc(100%-48px)] shadow-xs">
            <div className="w-full h-full flex items-center justify-center">
              <ExpenseStatisticsChart />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick Transfer (Left) + Balance History (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Quick Transfer Widget */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Quick Transfer
            </h2>
          </div>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-7 border border-[#1E293B] flex flex-col justify-between min-h-[290px] shadow-xs">
            {/* Contact Avatars Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
                {visibleContacts.map((c) => {
                  const isSelected = selectedContact === c.id;

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedContact(c.id)}
                      className="flex flex-col items-center cursor-pointer select-none group relative"
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className={`w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] rounded-full object-cover transition-all duration-200 ${
                          isSelected ? 'ring-3 ring-[#4F46E5] ring-offset-2 ring-offset-[#131E36] scale-105 shadow-sm' : 'group-hover:scale-105 opacity-80 group-hover:opacity-100'
                        }`}
                      />
                      <span
                        className={`text-[13px] sm:text-[15px] mt-2 text-center truncate max-w-[80px] font-medium ${
                          isSelected ? 'text-[#F8FAFC] font-bold' : 'text-slate-300'
                        }`}
                      >
                        {c.name}
                      </span>
                      <span
                        className={`text-[11px] sm:text-[13px] mt-0.5 text-center truncate max-w-[80px] ${
                          isSelected ? 'font-semibold text-[#818CF8]' : 'text-[#94A3B8]'
                        }`}
                      >
                        {c.role}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Next arrow circle button */}
              <button
                type="button"
                onClick={handleNextContacts}
                className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#1A2744] shadow-xs border border-[#1E293B] flex items-center justify-center text-[#94A3B8] hover:text-[#818CF8] hover:bg-[#1E293B] active:scale-95 transition-all shrink-0 ml-1 cursor-pointer"
                aria-label="Next contact"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Amount Input & Send Button */}
            <form onSubmit={handleSend} className="flex items-center gap-2 sm:gap-4 mt-3">
              <span className="text-[13px] sm:text-[15px] text-[#94A3B8] font-semibold whitespace-nowrap hidden sm:inline">
                Write Amount
              </span>
              <div className="flex-1 relative flex items-center bg-[#1A2744] rounded-full h-[46px] sm:h-[50px] border border-[#1E293B]">
                <input
                  type="text"
                  required
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="525.50"
                  autoComplete="off"
                  className="w-full bg-transparent text-[#F8FAFC] font-semibold text-[13px] sm:text-[15px] rounded-full pl-5 sm:pl-6 pr-28 sm:pr-32 border-none focus:outline-none transition-colors placeholder:text-[#94A3B8]"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="absolute right-0 top-0 bottom-0 px-5 sm:px-7 rounded-full text-white font-semibold text-[13px] sm:text-[15px] flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] active:scale-95 transition-all shadow-md shadow-indigo-500/20 cursor-pointer disabled:opacity-75"
                >
                  {isSending ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white -rotate-45 shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Balance History Area Spline Chart */}
        <div className="md:col-span-7 lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
              Balance History
            </h2>
          </div>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-7 border border-[#1E293B] h-[276px] flex items-center shadow-xs">
            <div className="h-full w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart
                  data={balanceHistoryWaveData}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="balanceBlueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    domain={[0, 800]}
                    ticks={[0, 200, 400, 600, 800]}
                  />
                  <Tooltip content={<CustomAreaTooltip />} />
                  <Area
                    type="natural"
                    dataKey="balance"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#balanceBlueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
