import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard } from '../common/CreditCard';
import { AddCardModal } from '../modals/AddCardModal';
import {
  monthlyExpenseData
} from '../../data/initialData';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const TransactionsPage = () => {
  const {
    cards,
    transactions,
    setIsAddCardModalOpen,
    addToast,
    isDarkMode
  } = useApp();

  const [activeFilterTab, setActiveFilterTab] = useState('all'); // all | income | expense
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (activeFilterTab === 'income' && tx.amount < 0) return false;
      if (activeFilterTab === 'expense' && tx.amount >= 0) return false;
      return true;
    });
  }, [transactions, activeFilterTab]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up pb-8">
      {/* Top Row: My Cards (Left) + My Expense Chart (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Left Column: My Cards */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
              My Cards
            </h2>
            <button
              onClick={() => setIsAddCardModalOpen(true)}
              className="text-sm font-semibold flex items-center gap-1.5 text-[#1E293B] dark:text-[#F8FAFC] hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors cursor-pointer bg-transparent border-0 p-0 outline-none select-none"
            >
              <Plus className="w-4 h-4" />
              <span>Add Card</span>
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

        {/* Right Column: My Expense Bar Chart */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
              My Expense
            </h2>
          </div>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#1E293B] flex flex-col justify-between h-full min-h-[235px] shadow-xs">
            <div className="h-48 sm:h-52 w-full min-w-0 relative">
              {/* Highlight callout amount badge */}
              <div className="absolute right-10 top-0 text-xs font-bold text-[#F8FAFC]">
                $12,500
              </div>

              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart
                  data={monthlyExpenseData}
                  margin={{ top: 22, right: 5, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderRadius: '12px',
                      color: '#FFF',
                      border: '1px solid #334155',
                      fontSize: '12px'
                    }}
                    cursor={{ fill: 'rgba(241, 245, 249, 0.05)' }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={26}>
                    {monthlyExpenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.highlighted ? '#4F46E5' : '#1E293B'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Transactions */}
      <div className="space-y-4">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
          Recent Transactions
        </h2>

        <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-7 border border-[#1E293B] space-y-6 shadow-xs">
          {/* Filter Tabs */}
          <div className="flex items-center gap-8 border-b border-[#1E293B] pb-0 text-sm font-semibold">
            <button
              onClick={() => {
                setActiveFilterTab('all');
                setCurrentPage(1);
              }}
              className={`pb-3 relative transition-colors cursor-pointer bg-transparent border-0 outline-none ${
                activeFilterTab === 'all'
                  ? 'font-bold text-[#818CF8] border-b-[2.5px] border-[#818CF8] -mb-[1px]'
                  : 'font-semibold text-[#94A3B8] hover:text-[#818CF8]'
              }`}
            >
              All Transactions
            </button>

            <button
              onClick={() => {
                setActiveFilterTab('income');
                setCurrentPage(1);
              }}
              className={`pb-3 relative transition-colors cursor-pointer bg-transparent border-0 outline-none ${
                activeFilterTab === 'income'
                  ? 'font-bold text-[#818CF8] border-b-[2.5px] border-[#818CF8] -mb-[1px]'
                  : 'font-semibold text-[#94A3B8] hover:text-[#818CF8]'
              }`}
            >
              Income
            </button>

            <button
              onClick={() => {
                setActiveFilterTab('expense');
                setCurrentPage(1);
              }}
              className={`pb-3 relative transition-colors cursor-pointer bg-transparent border-0 outline-none ${
                activeFilterTab === 'expense'
                  ? 'font-bold text-[#818CF8] border-b-[2.5px] border-[#818CF8] -mb-[1px]'
                  : 'font-semibold text-[#94A3B8] hover:text-[#818CF8]'
              }`}
            >
              Expense
            </button>
          </div>

          {/* Mobile View: Clean List */}
          <div className="block sm:hidden divide-y divide-[#1E293B]">
            {paginatedTransactions.length === 0 ? (
              <div className="text-center py-6 text-[#94A3B8] text-xs">
                No transactions match your filter criteria.
              </div>
            ) : (
              paginatedTransactions.map((tx) => {
                const isExpense = tx.amount < 0;
                const absAmount = Math.abs(tx.amount);
                return (
                  <div key={tx.id} className="py-3.5 flex items-center justify-between rounded-xl px-2 transition-colors hover:bg-indigo-500/10">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                        isExpense
                          ? 'bg-rose-950/40 text-[#FF4B68] border-rose-900/60'
                          : 'bg-emerald-950/40 text-[#16DBCC] border-emerald-900/60'
                      }`}>
                        {isExpense ? (
                          <ArrowUp className="w-4 h-4 text-[#FF4B68]" strokeWidth={2.5} />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-[#16DBCC]" strokeWidth={2.5} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#F8FAFC] truncate">
                          {tx.description}
                        </h4>
                        <span className="text-xs font-medium text-[#94A3B8] block mt-0.5">
                          {tx.date}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold shrink-0 font-mono ${
                        isExpense ? 'text-[#FE5C73]' : 'text-[#10B981]'
                      }`}
                    >
                      {isExpense ? `-$${absAmount.toLocaleString()}` : `+$${absAmount.toLocaleString()}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Desktop View: Full Responsive Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E293B] text-xs sm:text-[13px] font-bold text-[#94A3B8]">
                  <th className="pb-3.5 pr-4">Description</th>
                  <th className="pb-3.5 px-4">Transaction ID</th>
                  <th className="pb-3.5 px-4">Type</th>
                  <th className="pb-3.5 px-4">Card</th>
                  <th className="pb-3.5 px-4">Date</th>
                  <th className="pb-3.5 px-4">Amount</th>
                  <th className="pb-3.5 pl-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] text-sm">
                {paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-[#94A3B8] font-medium">
                      No transactions match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((tx) => {
                    const isExpense = tx.amount < 0;
                    const absAmount = Math.abs(tx.amount);

                    return (
                      <tr
                        key={tx.id}
                        className="transition-colors group hover:bg-indigo-500/10"
                      >
                        {/* Description with Arrow Icon */}
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3.5">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                              isExpense
                                ? 'bg-rose-950/40 text-[#FF4B68] border-rose-900/60'
                                : 'bg-emerald-950/40 text-[#16DBCC] border-emerald-900/60'
                            }`}>
                              {isExpense ? (
                                <ArrowUp className="w-4 h-4 text-[#FF4B68]" strokeWidth={2.5} />
                              ) : (
                                <ArrowDown className="w-4 h-4 text-[#16DBCC]" strokeWidth={2.5} />
                              )}
                            </div>
                            <span className="font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors truncate max-w-[200px]">
                              {tx.description}
                            </span>
                          </div>
                        </td>

                        {/* Transaction ID */}
                        <td className="py-4 px-4 font-mono text-xs font-semibold text-[#F8FAFC]">
                          {tx.transactionId}
                        </td>

                        {/* Type */}
                        <td className="py-4 px-4 text-sm font-medium text-[#94A3B8]">
                          {tx.type}
                        </td>

                        {/* Card */}
                        <td className="py-4 px-4 font-mono text-xs font-medium text-[#94A3B8]">
                          {tx.card}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-xs font-medium text-[#94A3B8] whitespace-nowrap">
                          {tx.date}
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-4 font-bold whitespace-nowrap font-mono">
                          <span
                            className={
                              isExpense ? 'text-[#FE5C73]' : 'text-[#10B981]'
                            }
                          >
                            {isExpense
                              ? `-$${absAmount.toLocaleString()}`
                              : `+$${absAmount.toLocaleString()}`}
                          </span>
                        </td>

                        {/* Download Receipt Button */}
                        <td className="py-4 pl-4 text-right">
                          <button
                            onClick={() => addToast('Receipt Downloaded', `Receipt for ${tx.transactionId} saved to downloads.`, 'success')}
                            className="px-4 py-1.5 rounded-full border border-[#818CF8] text-[#818CF8] hover:bg-[#818CF8] hover:text-[#0B1120] text-xs font-bold transition-all cursor-pointer bg-transparent"
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center sm:justify-end gap-2 pt-4 border-t border-[#1E293B] text-xs font-semibold select-none">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#818CF8] disabled:text-slate-700 hover:bg-indigo-950/40 transition-colors cursor-pointer bg-transparent font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#4F46E5] text-white shadow-xs'
                      : 'text-[#94A3B8] hover:bg-indigo-950/40 hover:text-[#818CF8] bg-transparent'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#818CF8] disabled:text-slate-700 hover:bg-indigo-950/40 transition-colors cursor-pointer bg-transparent font-bold"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AddCardModal />
    </div>
  );
};

export default TransactionsPage;
