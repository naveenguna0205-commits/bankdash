import React, { useState, useRef } from 'react';
import { Lock, Copy, Check, RefreshCw, Wifi } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

export const CreditCard = ({ card, onClick, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);

  const isPrimary = card.cardType === 'primary';
  const isDark = card.cardType === 'dark';
  const isEmerald = card.cardType === 'emerald';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
    const rotateY = ((x - centerX) / centerX) * 9;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    const cleanNumber = card.rawNumber || card.cardNumber.replace(/\*/g, '8');
    navigator.clipboard?.writeText(cleanNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  // Card background theme classes
  let bgClass = 'bg-[#131E36] text-[#F8FAFC] shadow-xl border border-[#1E293B] hover:border-slate-600';
  if (isPrimary) {
    bgClass = 'bg-gradient-to-tr from-[#4338CA] via-[#4F46E5] to-[#7C3AED] text-white shadow-xl shadow-indigo-500/20 border border-white/15';
  } else if (isDark) {
    bgClass = 'bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] text-white shadow-xl shadow-slate-900/30 border border-slate-700/60';
  } else if (isEmerald) {
    bgClass = 'bg-gradient-to-tr from-[#065F46] via-[#059669] to-[#0D9488] text-white shadow-xl shadow-emerald-500/20 border border-white/15';
  }

  const isGradientCard = isPrimary || isDark || isEmerald;

  return (
    <div
      className="perspective-1000 w-full select-none"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
            isFlipped ? 'rotateY(180deg)' : ''
          }`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
        }}
        className={`relative rounded-[25px] p-5 sm:p-6 min-h-[225px] flex flex-col justify-between overflow-hidden cursor-pointer holo-card ${bgClass} ${className}`}
      >
        {/* Dynamic Holographic Glare Follower */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-[25px]"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.22) 0%, transparent 65%)`,
            opacity: tilt.rotateX !== 0 ? 1 : 0
          }}
        />

        {/* Ambient Blurred Glow Orb */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Locked Card Overlay */}
        {card.isBlocked && (
          <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center z-30 rounded-[25px] text-white font-medium text-sm gap-2">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center animate-bounce">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <span className="font-bold tracking-wide">Card Temporarily Locked</span>
            <span className="text-xs text-slate-300">Tap settings to unlock</span>
          </div>
        )}

        {/* FRONT SIDE */}
        {!isFlipped ? (
          <>
            {/* Top Row: Balance & EMV Chip / Contactless Icon */}
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold tracking-wider uppercase block ${
                      isGradientCard ? 'text-white/75' : 'text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    Balance
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white backdrop-blur-xs">
                    {card.bank || 'DBL Bank'}
                  </span>
                </div>
                <div className="text-[24px] lg:text-[26px] font-black tracking-tight mt-1 flex items-baseline gap-1">
                  <AnimatedNumber
                    value={card.balance}
                    prefix="$"
                    decimals={0}
                    className="font-extrabold"
                  />
                </div>
              </div>

              {/* Metallic Chip & Contactless Wave */}
              <div className="flex items-center gap-2.5">
                <Wifi
                  className={`w-5 h-5 rotate-90 ${
                    isGradientCard ? 'text-white/70' : 'text-slate-400 dark:text-slate-300'
                  }`}
                />
                <div className="relative w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-xs border border-amber-300/60 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-amber-900/30" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-amber-900/30" />
                  <div className="w-3.5 h-3 rounded-xs border border-amber-800/20" />
                </div>
              </div>
            </div>

            {/* Middle Row: Card Holder & Valid Thru */}
            <div className="grid grid-cols-2 gap-4 my-auto py-3 text-xs relative z-10">
              <div>
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase block ${
                    isGradientCard ? 'text-white/70' : 'text-slate-400 dark:text-slate-400'
                  }`}
                >
                  CARD HOLDER
                </span>
                <span className="font-bold text-[14px] truncate block mt-0.5 tracking-tight">
                  {card.cardHolder}
                </span>
              </div>
              <div>
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase block ${
                    isGradientCard ? 'text-white/70' : 'text-slate-400 dark:text-slate-400'
                  }`}
                >
                  VALID THRU
                </span>
                <span className="font-bold text-[14px] block mt-0.5 tracking-tight">
                  {card.validThru}
                </span>
              </div>
            </div>

            {/* Bottom Footer: Card Number with Quick Copy & Mastercard Logo */}
            <div
              className={`pt-3.5 border-t flex items-center justify-between relative z-10 ${
                isGradientCard
                  ? 'border-white/20'
                  : 'border-[#1E293B] bg-[#0E1726]/60 -mx-6 -mb-6 px-6 pb-5 rounded-b-[25px]'
              }`}
            >
              <div className="flex items-center gap-2 group">
                <span className="text-[15px] sm:text-[17px] font-mono tracking-wider font-bold text-white">
                  {card.cardNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy Card Number"
                  className="p-1 rounded-md transition-all opacity-70 group-hover:opacity-100 hover:bg-white/20 text-white"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Flip Card Button */}
                <button
                  type="button"
                  onClick={toggleFlip}
                  title="Flip Card"
                  className={`p-1.5 rounded-full transition-transform hover:rotate-180 duration-300 ${
                    isGradientCard ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {/* Dual Circle Card Logo */}
                <div className="flex items-center -space-x-2.5 relative">
                  <div
                    className={`w-6.5 h-6.5 rounded-full shadow-xs ${
                      isGradientCard ? 'bg-rose-500/90' : 'bg-rose-500/80'
                    }`}
                  />
                  <div
                    className={`w-6.5 h-6.5 rounded-full shadow-xs ${
                      isGradientCard ? 'bg-amber-400/90' : 'bg-amber-400/80'
                    }`}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* BACK SIDE */
          <div
            className="flex flex-col justify-between h-full relative z-10"
            style={{ transform: 'rotateY(180deg)' }}
          >
            {/* Magnetic Black Stripe */}
            <div className="-mx-6 -mt-6 h-10 bg-slate-950 shadow-inner" />

            <div className="py-2 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-white/70">
                <span>AUTHORIZED SIGNATURE</span>
                <span>SECURITY CODE</span>
              </div>
              <div className="flex items-center bg-white/90 rounded-md p-1 px-3 justify-between text-slate-800 font-mono">
                <span className="italic font-serif text-slate-500 text-xs truncate max-w-[120px]">
                  {card.cardHolder}
                </span>
                <span className="font-bold tracking-widest text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                  829
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15">
              <span>24/7 Concierge: +1 (800) 555-DASH</span>
              <button
                type="button"
                onClick={toggleFlip}
                className="px-2.5 py-1 rounded-full bg-white/20 text-white font-semibold text-[10px] hover:bg-white/30 transition-colors"
              >
                Flip Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;
