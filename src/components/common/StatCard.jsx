import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  PiggyBank,
  Receipt,
  Repeat
} from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

const ICON_MAP = {
  invested: DollarSign,
  investmentsCount: PieChart,
  rateOfReturn: Repeat,
  balance: Wallet,
  income: DollarSign,
  expense: Receipt,
  saving: PiggyBank,
  trend: TrendingUp
};

const COLOR_VARIANTS = {
  indigo: {
    bg: 'bg-[#EEF2FF]',
    iconBg: 'bg-[#EEF2FF]',
    text: 'text-[#4F46E5]',
    glow: 'hover:border-indigo-300 hover:shadow-indigo-500/10'
  },
  purple: {
    bg: 'bg-[#F5F3FF]',
    iconBg: 'bg-[#F5F3FF]',
    text: 'text-[#7C3AED]',
    glow: 'hover:border-purple-300 hover:shadow-purple-500/10'
  },
  violet: {
    bg: 'bg-[#EDE9FE]',
    iconBg: 'bg-[#EDE9FE]',
    text: 'text-[#6D28D9]',
    glow: 'hover:border-violet-300 hover:shadow-violet-500/10'
  },
  blue: {
    bg: 'bg-[#EEF2FF]',
    iconBg: 'bg-[#EEF2FF]',
    text: 'text-[#4F46E5]',
    glow: 'hover:border-blue-300 hover:shadow-blue-500/10'
  },
  teal: {
    bg: 'bg-[#ECFDF5]',
    iconBg: 'bg-[#ECFDF5]',
    text: 'text-[#059669]',
    glow: 'hover:border-emerald-300 hover:shadow-emerald-500/10'
  },
  amber: {
    bg: 'bg-[#FFFBEB]',
    iconBg: 'bg-[#FFFBEB]',
    text: 'text-[#D97706]',
    glow: 'hover:border-amber-300 hover:shadow-amber-500/10'
  },
  rose: {
    bg: 'bg-[#FFF1F2]',
    iconBg: 'bg-[#FFF1F2]',
    text: 'text-[#E11D48]',
    glow: 'hover:border-rose-300 hover:shadow-rose-500/10'
  }
};

export const StatCard = ({
  title,
  value,
  iconName = 'invested',
  customIcon,
  colorScheme = 'indigo',
  trend,
  subtitle,
  onClick,
  className = ''
}) => {
  const IconComponent = customIcon || ICON_MAP[iconName] || DollarSign;
  const colors = COLOR_VARIANTS[colorScheme] || COLOR_VARIANTS.indigo;

  const isNumeric = typeof value === 'number' || (!isNaN(parseFloat(String(value).replace(/[^0-9.-]+/g, ''))) && !String(value).includes('%') && !String(value).includes('Month'));
  const rawNum = isNumeric ? parseFloat(String(value).replace(/[^0-9.-]+/g, '')) : null;
  const hasDollar = String(value).startsWith('$');

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-4 sm:p-6 border border-[#E6EFF5] dark:border-[#1E293B] flex items-center gap-3.5 sm:gap-4.5 card-hover shadow-xs transition-all duration-300 ${colors.glow} group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Left Icon with subtle floating interaction */}
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-xs ${colors.iconBg} ${colors.text}`}
      >
        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.25]" />
      </div>

      {/* Right Content */}
      <div className="flex-1 min-w-0">
        <span className="text-xs sm:text-[14px] font-semibold text-[#718EBF] dark:text-[#94A3B8] block truncate">
          {title}
        </span>
        <div className="flex items-baseline gap-1.5 sm:gap-2.5 mt-0.5">
          <span className="text-lg sm:text-[24px] font-bold text-[#232323] dark:text-[#F8FAFC] tracking-tight truncate">
            {rawNum !== null ? (
              <AnimatedNumber
                value={rawNum}
                prefix={hasDollar ? '$' : ''}
                decimals={0}
              />
            ) : (
              value
            )}
          </span>
          {trend && (
            <span
              className={`text-xs font-bold inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                trend.startsWith('+')
                  ? 'text-emerald-700 bg-emerald-100/70'
                  : 'text-rose-700 bg-rose-100/70'
              }`}
            >
              {trend.startsWith('+') ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          )}
        </div>
        {subtitle && (
          <span className="text-[11px] text-slate-400 block mt-0.5 truncate">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
