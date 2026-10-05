import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Lock, Unlock } from 'lucide-react';

export const CardDetailsModal = () => {
  const { selectedCardModal, setSelectedCardModal, toggleBlockCard } = useApp();

  if (!selectedCardModal) return null;

  return (
    <Modal
      isOpen={!!selectedCardModal}
      onClose={() => setSelectedCardModal(null)}
      title="Card Information"
      subtitle={`${selectedCardModal.bank} • ${selectedCardModal.brand}`}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Card Number & Holder Info */}
        <div className="bg-[#1A2744] rounded-2xl p-5 border border-[#1E293B] space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#94A3B8]">Card Number</span>
            <span className="font-mono font-bold text-[#F8FAFC] tracking-wider">
              {selectedCardModal.rawNumber || selectedCardModal.cardNumber}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#94A3B8]">Cardholder Name</span>
            <span className="font-semibold text-[#F8FAFC]">{selectedCardModal.cardHolder}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#94A3B8]">Expiration Date</span>
            <span className="font-semibold text-[#F8FAFC]">{selectedCardModal.validThru}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#94A3B8]">CVV / CVC</span>
            <span className="font-mono font-bold text-[#F8FAFC]">*** (Protected)</span>
          </div>
        </div>

        {/* Limits & Balance */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1A2744] p-4 rounded-2xl border border-[#1E293B]">
            <span className="text-xs text-[#94A3B8] font-medium">Available Balance</span>
            <div className="text-lg font-bold text-[#F8FAFC] mt-0.5">
              ${selectedCardModal.balance.toLocaleString()}
            </div>
          </div>
          <div className="bg-[#1A2744] p-4 rounded-2xl border border-[#1E293B]">
            <span className="text-xs text-[#94A3B8] font-medium">Credit Limit</span>
            <div className="text-lg font-bold text-[#F8FAFC] mt-0.5">
              ${(selectedCardModal.limit || 10000).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Lock/Unlock Card Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              {selectedCardModal.isBlocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-[#F8FAFC]">
                {selectedCardModal.isBlocked ? 'Card is Currently Locked' : 'Card is Active'}
              </p>
              <p className="text-xs text-[#94A3B8]">
                {selectedCardModal.isBlocked ? 'Prevent any online or in-store charges' : 'Ready for tap, chip, & web purchases'}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleBlockCard(selectedCardModal.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCardModal.isBlocked
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-rose-600 text-white hover:bg-rose-500'
            }`}
          >
            {selectedCardModal.isBlocked ? 'Unlock' : 'Lock'}
          </button>
        </div>

        <button
          onClick={() => setSelectedCardModal(null)}
          className="w-full py-3 rounded-2xl bg-[#1A2744] hover:bg-[#24345A] text-[#F8FAFC] border border-[#1E293B] font-semibold text-sm transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export const PinChangeModal = () => {
  const { isPinModalOpen, setIsPinModalOpen, addToast } = useApp();
  const [currentPin, setCurrentPin] = React.useState('');
  const [newPin, setNewPin] = React.useState('');
  const [confirmPin, setConfirmPin] = React.useState('');

  if (!isPinModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || isNaN(newPin)) {
      addToast('Invalid PIN', 'PIN must be a 4-digit numeric code.', 'error');
      return;
    }
    if (newPin !== confirmPin) {
      addToast('PIN Mismatch', 'New PIN and confirmation PIN do not match.', 'error');
      return;
    }

    addToast('PIN Updated Successfully', 'Your card security PIN has been safely changed.', 'success');
    setIsPinModalOpen(false);
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
  };

  return (
    <Modal
      isOpen={isPinModalOpen}
      onClose={() => setIsPinModalOpen(false)}
      title="Change Card PIN"
      subtitle="Enter 4-digit numeric security code"
      maxWidth="max-w-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
            Current PIN
          </label>
          <input
            type="password"
            maxLength={4}
            required
            value={currentPin}
            onChange={(e) => setCurrentPin(e.target.value)}
            placeholder="••••"
            autoComplete="off"
            className="w-full text-center tracking-widest text-lg py-2.5 px-4 rounded-xl bg-[#1A2744] border border-[#1E293B] text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/40 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
            New 4-Digit PIN
          </label>
          <input
            type="password"
            maxLength={4}
            required
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="••••"
            autoComplete="off"
            className="w-full text-center tracking-widest text-lg py-2.5 px-4 rounded-xl bg-[#1A2744] border border-[#1E293B] text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/40 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#F8FAFC] mb-1">
            Confirm New PIN
          </label>
          <input
            type="password"
            maxLength={4}
            required
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            placeholder="••••"
            autoComplete="off"
            className="w-full text-center tracking-widest text-lg py-2.5 px-4 rounded-xl bg-[#1A2744] border border-[#1E293B] text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5]/40 font-mono"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 rounded-2xl text-white font-semibold text-sm shadow-md bg-[#4F46E5] hover:bg-[#4338CA] transition-all cursor-pointer"
          >
            Update PIN
          </button>
        </div>
      </form>
    </Modal>
  );
};
