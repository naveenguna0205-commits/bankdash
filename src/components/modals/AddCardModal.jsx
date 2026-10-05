import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { PlusCircle } from 'lucide-react';

export const AddCardModal = () => {
  const { isAddCardModalOpen, setIsAddCardModalOpen, addNewCard, themeConfig, userProfile } = useApp();

  const [cardHolder, setCardHolder] = useState(userProfile.name || 'Eddy Cusuma');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('12/28');
  const [bank, setBank] = useState('DBL Bank');
  const [cardType, setCardType] = useState('primary');
  const [balance, setBalance] = useState('5756');

  if (!isAddCardModalOpen) return null;

  const handleFormatCardNumber = (value) => {
    const raw = value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanNum = cardNumber.replace(/\s/g, '');
    const masked = cleanNum.length >= 12
      ? `${cleanNum.slice(0, 4)} **** **** ${cleanNum.slice(-4)}`
      : '3778 **** **** 1234';

    addNewCard({
      cardHolder,
      cardNumber: masked,
      rawNumber: cardNumber || '3778 4829 1928 1234',
      validThru: expiry,
      bank,
      cardType,
      limit: parseFloat(limit) || 10000,
      balance: parseFloat(balance) || 5000,
      brand: 'Mastercard'
    });

    setIsAddCardModalOpen(false);
  };

  return (
    <Modal
      isOpen={isAddCardModalOpen}
      onClose={() => setIsAddCardModalOpen(false)}
      title="Add New Card"
      subtitle="Connect or create a virtual credit card"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        {/* Live Mini Preview */}
        <div
          className="rounded-2xl p-5 text-white shadow-md relative overflow-hidden"
          style={{ background: cardType === 'primary' ? themeConfig.cardGradient : '#1E293B' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase text-white/60 tracking-wider">
                Balance Preview
              </span>
              <div className="text-xl font-bold">
                ${parseFloat(balance || 0).toLocaleString()}
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              {bank}
            </span>
          </div>
          <div className="mt-4 flex justify-between text-xs text-white/80">
            <div>
              <span className="text-[9px] uppercase text-white/60 block">Holder</span>
              <span className="font-semibold">{cardHolder || 'Your Name'}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase text-white/60 block">Expires</span>
              <span className="font-semibold">{expiry || 'MM/YY'}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 font-mono tracking-widest text-sm font-semibold">
            {cardNumber || '3778 •••• •••• 1234'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
              Card Type Style
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] text-[#F8FAFC] cursor-pointer"
            >
              <option value="primary" className="bg-[#1A2744] text-[#F8FAFC]">Gradient Theme Card</option>
              <option value="dark" className="bg-[#1A2744] text-[#F8FAFC]">Obsidian Dark Card</option>
              <option value="emerald" className="bg-[#1A2744] text-[#F8FAFC]">Emerald Card</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
              Issuing Bank
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] text-[#F8FAFC] cursor-pointer"
            >
              <option value="DBL Bank" className="bg-[#1A2744] text-[#F8FAFC]">DBL Bank</option>
              <option value="BRC Bank" className="bg-[#1A2744] text-[#F8FAFC]">BRC Bank</option>
              <option value="ABM Bank" className="bg-[#1A2744] text-[#F8FAFC]">ABM Bank</option>
              <option value="MCP Bank" className="bg-[#1A2744] text-[#F8FAFC]">MCP Bank</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
            Name on Card
          </label>
          <input
            type="text"
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="e.g. Charlene Reed"
            autoComplete="cc-name"
            className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] text-[#F8FAFC]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
            Card Number (16 digits)
          </label>
          <input
            type="text"
            required
            value={cardNumber}
            onChange={(e) => handleFormatCardNumber(e.target.value)}
            placeholder="3778 4829 1928 1234"
            autoComplete="cc-number"
            className="w-full font-mono text-xs font-medium py-2.5 px-3 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] text-[#F8FAFC]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
              Expiration Date
            </label>
            <input
              type="text"
              required
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              autoComplete="cc-exp"
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] text-[#F8FAFC]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
              Initial Balance ($)
            </label>
            <input
              type="number"
              required
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="5756"
              autoComplete="off"
              className="w-full text-xs font-medium py-2.5 px-3 rounded-xl border border-[#1E293B] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/20 bg-[#1A2744] text-[#F8FAFC]"
            />
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3 rounded-2xl text-white font-semibold text-sm shadow-md bg-[#4F46E5] hover:bg-[#4338CA] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Card</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
