import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard } from '../common/CreditCard';
import {
  creditCardStatsData,
  creditCardListData
} from '../../data/initialData';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Lock,
  CreditCard as CardIcon,
  Apple,
  KeyRound
} from 'lucide-react';

// Custom Donut Chart Tooltip
const CustomDonutTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md p-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-700/60 text-white text-xs animate-fade-in-scale">
        <span className="text-slate-400 text-[11px] block">{payload[0]?.name}</span>
        <span className="font-bold text-sm text-indigo-400 font-mono mt-0.5 block">
          {payload[0]?.value}% Share
        </span>
      </div>
    );
  }
  return null;
};

export const CreditCardsPage = () => {
  const {
    cards,
    addNewCard,
    toggleBlockCard,
    addToast,
    userProfile
  } = useApp();

  // Add new card form states
  const [cardTypeInput, setCardTypeInput] = useState('Classic');
  const [nameOnCard, setNameOnCard] = useState('Charlene Reed');
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [expirationDate, setExpirationDate] = useState('25 January 2028');

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!cardNumberInput.trim()) return;

    addNewCard({
      cardNumber: cardNumberInput,
      cardHolder: nameOnCard || userProfile.name,
      validThru: expirationDate.slice(-7) || '12/28',
      balance: 5750,
      bank: 'BankDash Premium'
    });

    setCardNumberInput('');
  };

  const handleQuickWallet = (walletName) => {
    addToast(`${walletName} Synced`, `Your BankDash card is now active in ${walletName}.`, 'success');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up pb-8">
      {/* Top Section: My Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
            My Cards
          </h2>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-4 lg:gap-5 overflow-x-auto snap-x pb-2 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {cards.slice(0, 3).map((card, idx) => (
            <div key={card.id} className="min-w-[280px] sm:min-w-0 flex-1 snap-center">
              <CreditCard
                card={{
                  ...card,
                  cardType: idx === 0 ? 'primary' : idx === 1 ? 'emerald' : 'dark'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Middle Row: Card Expense Statistics (Left) + Card List (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Card Expense Statistics (Donut Chart) */}
        <div className="md:col-span-5 lg:col-span-5 space-y-4">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
            Card Expense Statistics
          </h2>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-6 border border-[#1E293B] flex flex-col items-center justify-center min-h-[300px] shadow-xs">
            <div className="h-52 w-full min-w-0 relative">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={creditCardStatsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {creditCardStatsData.map((entry, index) => {
                      const colors = ['#4F46E5', '#7C3AED', '#6366F1', '#A855F7'];
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                          stroke="transparent"
                          strokeWidth={2}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip content={<CustomDonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend indicators */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4F46E5]" />
                <span className="text-[#94A3B8]">DBL Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#7C3AED]" />
                <span className="text-[#94A3B8]">BRC Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6366F1]" />
                <span className="text-[#94A3B8]">ABM Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#A855F7]" />
                <span className="text-[#94A3B8]">MCP Bank</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card List (Right) */}
        <div className="md:col-span-7 lg:col-span-7 space-y-4">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
            Card List
          </h2>

          <div className="bg-[#131E36] rounded-[25px] p-4 sm:p-6 border border-[#1E293B] space-y-3.5 shadow-xs">
            {creditCardListData.map((item) => {
              let iconBg = 'bg-[#4F46E5]/20 text-[#818CF8]';
              if (item.color === 'rose' || item.color === 'pink') iconBg = 'bg-[#7C3AED]/20 text-[#C4B5FD]';
              if (item.color === 'amber') iconBg = 'bg-[#6D28D9]/20 text-[#DDD6FE]';

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl hover:bg-indigo-500/10 transition-all border border-transparent hover:border-slate-700/60 card-hover"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
                      <CardIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#94A3B8]">Card Type</span>
                        <span className="text-xs font-semibold text-[#F8FAFC]">{item.cardType}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[#94A3B8]">Bank</span>
                        <span className="text-xs font-semibold text-[#F8FAFC]">{item.bank}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 lg:gap-8">
                    <div>
                      <span className="text-xs text-[#94A3B8] block">Card Number</span>
                      <span className="text-xs font-mono font-semibold text-[#F8FAFC]">
                        {item.cardNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-[#94A3B8] block">Namain Card</span>
                      <span className="text-xs font-semibold text-[#F8FAFC]">
                        {item.namainCard}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        addToast('Card Selected', `${item.bank} ${item.cardType} (${item.cardNumber})`, 'info')
                      }
                      className="text-xs font-bold text-[#818CF8] hover:text-[#C4B5FD] hover:underline whitespace-nowrap cursor-pointer"
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

      {/* Bottom Row: Add New Card (Left) + Card Setting (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Add New Card Form */}
        <div className="md:col-span-7 lg:col-span-7 space-y-4">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
            Add New Card
          </h2>

          <div className="bg-[#131E36] rounded-[25px] p-5 sm:p-7 border border-[#1E293B] space-y-5 shadow-xs">
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
            </p>

            <form onSubmit={handleAddCardSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F8FAFC] mb-1.5">
                    Card Type
                  </label>
                  <input
                    type="text"
                    required
                    value={cardTypeInput}
                    onChange={(e) => setCardTypeInput(e.target.value)}
                    placeholder="Classic"
                    autoComplete="off"
                    className="w-full text-xs font-medium text-[#F8FAFC] py-3 px-4 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 transition-all bg-[#1A2744]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8FAFC] mb-1.5">
                    Name On Card
                  </label>
                  <input
                    type="text"
                    required
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    placeholder="My Cards"
                    autoComplete="cc-name"
                    className="w-full text-xs font-medium text-[#F8FAFC] py-3 px-4 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 transition-all bg-[#1A2744]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#F8FAFC] mb-1.5">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumberInput}
                    onChange={(e) => setCardNumberInput(e.target.value)}
                    placeholder="**** **** **** ****"
                    autoComplete="cc-number"
                    className="w-full text-xs font-medium text-[#F8FAFC] py-3 px-4 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 transition-all bg-[#1A2744] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#F8FAFC] mb-1.5">
                    Expiration Date
                  </label>
                  <select
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full text-xs font-medium text-[#F8FAFC] py-3 px-4 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 transition-all bg-[#1A2744] cursor-pointer"
                  >
                    <option value="25 January 2028" className="bg-[#1A2744] text-[#F8FAFC]">25 January 2028</option>
                    <option value="15 June 2029" className="bg-[#1A2744] text-[#F8FAFC]">15 June 2029</option>
                    <option value="30 December 2030" className="bg-[#1A2744] text-[#F8FAFC]">30 December 2030</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-white font-semibold text-sm bg-[#4F46E5] hover:bg-[#4338CA] shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Card Setting List */}
        <div className="md:col-span-5 lg:col-span-5 space-y-4">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
            Card Setting
          </h2>

          <div className="bg-[#131E36] rounded-[25px] p-4 sm:p-6 border border-[#1E293B] space-y-4 shadow-xs">
            {/* Block Card */}
            <div
              onClick={() => toggleBlockCard(cards[0]?.id || 'card-1')}
              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-indigo-500/10 cursor-pointer transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/20 text-[#818CF8] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-[#F8FAFC] truncate">
                  Block Card
                </h4>
                <span className="text-xs text-[#94A3B8] block mt-0.5">
                  Instantly block your card
                </span>
              </div>
            </div>

            {/* Change Pin Code */}
            <div
              onClick={() => addToast('PIN Security', 'A PIN reset link has been sent to your registered mobile number.', 'info')}
              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-indigo-500/10 cursor-pointer transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 text-[#DDD6FE] flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-[#F8FAFC] truncate">
                  Change Pin Code
                </h4>
                <span className="text-xs text-[#94A3B8] block mt-0.5">
                  Withdraw without any card
                </span>
              </div>
            </div>

            {/* Add to Google Pay */}
            <div
              onClick={() => handleQuickWallet('Google Pay')}
              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-indigo-500/10 cursor-pointer transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#6D28D9]/20 text-[#C4B5FD] flex items-center justify-center shrink-0 font-bold font-serif text-lg">
                G
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-[#F8FAFC] truncate">
                  Add to Google Pay
                </h4>
                <span className="text-xs text-[#94A3B8] block mt-0.5">
                  Withdraw without any card
                </span>
              </div>
            </div>

            {/* Add to Apple Pay */}
            <div
              onClick={() => handleQuickWallet('Apple Pay')}
              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-indigo-500/10 cursor-pointer transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#4F46E5]/20 text-[#818CF8] flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-[#F8FAFC] truncate">
                  Add to Apple Pay
                </h4>
                <span className="text-xs text-[#94A3B8] block mt-0.5">
                  Withdraw without any card
                </span>
              </div>
            </div>

            {/* Add to Apple Store */}
            <div
              onClick={() => handleQuickWallet('Apple Store Wallet')}
              className="flex items-center gap-4 p-2 rounded-2xl hover:bg-indigo-500/10 cursor-pointer transition-all card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 text-[#DDD6FE] flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-[#F8FAFC] truncate">
                  Add to Apple Store
                </h4>
                <span className="text-xs text-[#94A3B8] block mt-0.5">
                  Withdraw without any card
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardsPage;
