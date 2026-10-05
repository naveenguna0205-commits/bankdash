import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-4 text-center">
        <div
          className={`w-full ${maxWidth} transform overflow-hidden rounded-3xl bg-[#131E36] p-6 sm:p-7 text-left align-middle shadow-2xl transition-all relative border border-[#1E293B] animate-in fade-in zoom-in-95 duration-200`}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#1E293B]">
            <div>
              <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#1A2744] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="mt-4 text-[#F8FAFC]">{children}</div>
        </div>
      </div>
    </div>
  );
};
