import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedNumber } from '../common/AnimatedNumber';
import {
  Crown,
  Plane,
  PhoneCall,
  Globe2,
  Percent,
  Gift
} from 'lucide-react';

export const PrivilegesPage = () => {
  const { privileges, redeemOffer, themeConfig } = useApp();

  const progressPercent = Math.min(
    100,
    Math.round((privileges.points / privileges.nextTierPoints) * 100)
  );

  const handleRedeem = (offer) => {
    redeemOffer(offer);
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-8">
      {/* Tier Status Hero Card */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden holo-card"
        style={{ background: themeConfig.cardGradient }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-4 h-4 text-amber-300" />
              <span>{privileges.tier}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Exclusive Member Privileges
            </h2>
            <p className="text-sm text-white/80 max-w-xl leading-relaxed">
              Earn high-yield rewards on every transaction. Enjoy priority banking, bespoke travel benefits, and personalized wealth consulting.
            </p>

            {/* Points Progress */}
            <div className="pt-2 max-w-md space-y-2">
              <div className="flex justify-between text-xs text-white/90 font-medium">
                <span>Current Balance: <strong>{privileges.points.toLocaleString()} pts</strong></span>
                <span>Next Tier: <strong>{privileges.nextTierPoints.toLocaleString()} pts</strong></span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center p-4 text-center group hover:scale-105 transition-transform">
              <Crown className="w-8 h-8 text-amber-300 mb-1 animate-float" />
              <span className="text-xs uppercase text-white/70 font-semibold tracking-wider">Points</span>
              <span className="text-xl font-extrabold text-white">
                <AnimatedNumber value={privileges.points} decimals={0} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Member Benefits Grid */}
      <div className="space-y-4">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
          Executive Tier Benefits
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {privileges.benefits.map((b, idx) => {
            let Icon = Plane;
            if (b.icon === 'phone') Icon = PhoneCall;
            if (b.icon === 'globe') Icon = Globe2;
            if (b.icon === 'percent') Icon = Percent;

            const iconColors = [
              'bg-[#EEF2FF] dark:bg-[#4F46E5]/20 text-[#4F46E5]',
              'bg-[#F5F3FF] dark:bg-[#7C3AED]/20 text-[#7C3AED]',
              'bg-[#EDE9FE] dark:bg-[#6D28D9]/20 text-[#6D28D9] dark:text-[#C4B5FD]',
              'bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#6366F1]'
            ];

            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#131E36] rounded-[25px] p-6 border border-[#E6EFF5] dark:border-[#1E293B] space-y-3 card-hover shadow-xs transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColors[idx % iconColors.length]}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1E293B] dark:text-[#F8FAFC]">{b.title}</h4>
                <p className="text-xs text-[#718EBF] dark:text-[#94A3B8] leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="space-y-4">
        <h3 className="text-[20px] sm:text-[22px] font-bold text-[#F8FAFC] m-0">
          Redeemable Rewards & Vouchers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {privileges.offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white dark:bg-[#131E36] rounded-[25px] p-6 border border-[#E6EFF5] dark:border-[#1E293B] flex flex-col justify-between space-y-4 card-hover shadow-xs transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#718EBF] dark:text-[#94A3B8]">
                    {offer.merchant}
                  </span>
                  <h4 className="text-base font-bold text-[#1E293B] dark:text-[#F8FAFC] mt-0.5">
                    {offer.title}
                  </h4>
                </div>
                <Gift className="w-6 h-6 text-[#7C3AED] shrink-0" />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#1A2744] rounded-2xl border border-[#E6EFF5] dark:border-slate-700 flex justify-between items-center text-xs">
                <span className="text-[#718EBF] dark:text-[#94A3B8] font-medium">Value / Perk</span>
                <span className="font-bold text-[#F8FAFC]">{offer.discount}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Cost</span>
                  <span className="text-sm font-extrabold text-[#4F46E5]">
                    {offer.points.toLocaleString()} pts
                  </span>
                </div>

                <button
                  onClick={() => handleRedeem(offer)}
                  disabled={privileges.points < offer.points}
                  className="px-5 py-2 rounded-full text-white text-xs font-bold transition-all shadow-md bg-[#4F46E5] hover:bg-[#4338CA] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivilegesPage;
