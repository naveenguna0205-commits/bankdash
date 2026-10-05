import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Download, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReceiptModal = () => {
  const { selectedReceipt, setSelectedReceipt, themeConfig, addToast } = useApp();

  const refId = useMemo(() => {
    return selectedReceipt?.transactionId ? `BD-${selectedReceipt.transactionId.replace(/\D/g, '').slice(0, 6) || '883921'}` : 'BD-883921';
  }, [selectedReceipt]);

  if (!selectedReceipt) return null;

  const handleDownload = () => {
    addToast('Receipt Downloaded', `Receipt for ${selectedReceipt.transactionId} saved as PDF.`, 'success');
    setSelectedReceipt(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const absAmount = Math.abs(selectedReceipt.amount);

  return (
    <Modal
      isOpen={!!selectedReceipt}
      onClose={() => setSelectedReceipt(null)}
      title="Transaction Receipt"
      subtitle="Official Electronic Transaction Record"
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        {/* Receipt Header Card */}
        <div
          className="rounded-2xl p-5 text-center text-white relative overflow-hidden"
          style={{ background: themeConfig.cardGradient }}
        >
          <span className="text-xs uppercase tracking-widest text-white/70 block">
            Amount Processed
          </span>
          <div className="text-3xl font-extrabold mt-1 tracking-tight">
            ${absAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold mt-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>{selectedReceipt.status || 'Completed'}</span>
          </div>
        </div>

        {/* Breakdown Details */}
        <div className="bg-[#1A2744] rounded-2xl p-4 space-y-3 text-sm border border-[#1E293B] font-sans">
          <div className="flex justify-between items-center text-[#94A3B8]">
            <span>Transaction ID</span>
            <span className="font-mono font-semibold text-[#F8FAFC]">
              {selectedReceipt.transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#94A3B8]">
            <span>Description</span>
            <span className="font-medium text-[#F8FAFC] text-right">
              {selectedReceipt.description}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#94A3B8]">
            <span>Category / Type</span>
            <span className="font-medium text-[#F8FAFC]">
              {selectedReceipt.type}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#94A3B8]">
            <span>Payment Method</span>
            <span className="font-medium text-[#F8FAFC]">
              Card ({selectedReceipt.card})
            </span>
          </div>
          <div className="flex justify-between items-center text-[#94A3B8]">
            <span>Date & Time</span>
            <span className="font-medium text-[#F8FAFC]">
              {selectedReceipt.date}
            </span>
          </div>
        </div>

        {/* Security & Verification Stamp */}
        <div className="flex items-center justify-between px-2 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified 256-bit Encrypted</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            REF: {refId}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="w-full py-3 rounded-2xl border border-[#1E293B] bg-[#1A2744] hover:bg-[#24345A] text-[#F8FAFC] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-all cursor-pointer"
            style={{ backgroundColor: themeConfig.primary }}
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
