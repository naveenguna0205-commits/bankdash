import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  DollarSign,
  PieChart,
  Repeat,
  Apple,
  Car
} from 'lucide-react';

// Custom Chart Tooltip
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md p-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-700/60 text-white text-xs animate-fade-in-scale">
        <p className="font-bold text-slate-300 border-b border-slate-700 pb-1">{label}</p>
        <div className="flex items-center justify-between gap-4 mt-1">
          <span className="text-indigo-400 font-medium">Value:</span>
          <span className="font-bold font-mono text-white">${payload[0]?.value?.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const InvestmentsPage = () => {
  const { investments, addToast } = useApp();

  const handleStockTrade = (stock) => {
    addToast('Order Placed', `Simulated trade order for ${stock.name} at $${stock.price}.`, 'info');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up pb-8">
      {/* 3 KPI Stat Cards with AnimatedNumber */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Invested Amount"
          value={investments.kpis.totalInvested}
          customIcon={DollarSign}
          colorScheme="indigo"
          trend="+18.4%"
          subtitle="Portfolio valuation"
        />
        <StatCard
          title="Number of Investments"
          value={investments.kpis.numberOfInvestments}
          customIcon={PieChart}
          colorScheme="purple"
          subtitle="Across 14 asset classes"
        />
        <StatCard
          title="Rate of Return"
          value={`+${investments.kpis.rateOfReturn}%`}
          customIcon={Repeat}
          colorScheme="violet"
          trend="+2.1%"
          subtitle="Annualized IRR"
        />
      </div>

      {/* Middle Row: Yearly Total Investment (Left) + Monthly Revenue (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {/* Yearly Total Investment */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
              Yearly Total Investment
            </h2>
          </div>

          <div className="bg-white dark:bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs">
            <div className="h-64 sm:h-72 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart
                  data={investments.yearlyInvestment}
                  margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                    domain={[0, 40000]}
                    ticks={[0, 10000, 20000, 30000, 40000]}
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Line
                    type="linear"
                    dataKey="amount"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: '#131E36', stroke: '#4F46E5', strokeWidth: 3, r: 4.5 }}
                    activeDot={{ r: 7, fill: '#4F46E5' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
              Monthly Revenue
            </h2>
          </div>

          <div className="bg-white dark:bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs">
            <div className="h-64 sm:h-72 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart
                  data={investments.monthlyRevenue}
                  margin={{ top: 15, right: 15, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                    domain={[0, 40000]}
                    ticks={[0, 10000, 20000, 30000, 40000]}
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Line
                    type="natural"
                    dataKey="revenue"
                    stroke="#7C3AED"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 7, fill: '#7C3AED' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: My Investment (Left) + Trending Stock (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Left Column: My Investment */}
        <div className="md:col-span-7 lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
              My Investment
            </h2>
          </div>

          <div className="bg-white dark:bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#E6EFF5] dark:border-[#1E293B] space-y-3.5 shadow-xs">
            {investments.myInvestments.map((inv) => {
              let iconEl = <Apple className="w-6 h-6 text-[#4F46E5]" />;
              let iconBg = 'bg-[#EEF2FF] dark:bg-[#4F46E5]/20';

              if (inv.logo === 'samsung') {
                iconEl = <span className="font-bold text-lg text-[#7C3AED]">G</span>;
                iconBg = 'bg-[#F5F3FF] dark:bg-[#7C3AED]/20';
              } else if (inv.logo === 'tesla') {
                iconEl = <Car className="w-6 h-6 text-[#6D28D9] dark:text-[#C4B5FD]" />;
                iconBg = 'bg-[#EDE9FE] dark:bg-[#6D28D9]/20';
              }

              return (
                <div
                  key={inv.id}
                  className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 transition-all card-hover"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${iconBg}`}
                    >
                      {iconEl}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[14px] sm:text-[15px] font-bold text-[#1E293B] dark:text-[#F8FAFC] truncate">
                        {inv.name}
                      </h4>
                      <span className="text-xs text-[#718EBF] dark:text-[#94A3B8] block mt-0.5 truncate">
                        {inv.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8">
                    <div>
                      <div className="text-[14px] sm:text-[15px] font-bold text-[#1E293B] dark:text-[#F8FAFC] font-mono">
                        ${inv.value.toLocaleString()}
                      </div>
                      <span className="text-[11px] sm:text-xs text-[#718EBF] dark:text-[#94A3B8] block">
                        Envestment Value
                      </span>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <div
                        className={`text-[14px] sm:text-[15px] font-bold font-mono ${
                          inv.isPositive ? 'text-[#16DBCC]' : 'text-[#FE5C73]'
                        }`}
                      >
                        {inv.returnValue}
                      </div>
                      <span className="text-[11px] sm:text-xs text-[#718EBF] dark:text-[#94A3B8] block">
                        Return Value
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Trending Stock Table */}
        <div className="md:col-span-5 lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
              Trending Stock
            </h2>
          </div>

          <div className="bg-white dark:bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6EFF5] dark:border-slate-800/80 text-xs font-semibold text-[#718EBF] dark:text-slate-400">
                  <th className="pb-3 pr-2">SL No</th>
                  <th className="pb-3 px-3">Name</th>
                  <th className="pb-3 px-3">Price</th>
                  <th className="pb-3 pl-3 text-right">Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] text-sm font-semibold">
                {investments.trendingStocks.map((stock) => (
                  <tr
                    key={stock.slNo}
                    onClick={() => handleStockTrade(stock)}
                    className="hover:bg-indigo-500/10 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 pr-2 text-xs font-mono text-slate-400">
                      {stock.slNo}
                    </td>
                    <td className="py-3.5 px-3 text-[#F8FAFC]">{stock.name}</td>
                    <td className="py-3.5 px-3 text-[#F8FAFC] font-mono">
                      ${stock.price}
                    </td>
                    <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                      <span
                        className={
                          stock.isPositive ? 'text-emerald-400' : 'text-rose-400'
                        }
                      >
                        {stock.returnRate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;
