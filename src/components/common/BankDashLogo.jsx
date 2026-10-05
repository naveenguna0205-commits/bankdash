import React from 'react';

/**
 * BankDash Vector Logo Component
 * Modern Fintech Style with crisp Sapphire Dual-Card Icon and Slate Typography
 */
export const BankDashIcon = ({ className = "w-9 h-9", ...props }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Background Card */}
      <rect
        x="10"
        y="4.5"
        width="21.5"
        height="16.5"
        rx="4"
        fill="#FFFFFF"
        stroke="#4F46E5"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Front Card Background Fill & Stroke */}
      <rect
        x="4.5"
        y="11"
        width="21.5"
        height="16.5"
        rx="4"
        fill="#FFFFFF"
        stroke="#4F46E5"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Magnetic Stripe / Line */}
      <path
        d="M5 16.5H25.5"
        stroke="#4F46E5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Indigo / Purple Accent Chip */}
      <rect
        x="14.5"
        y="21"
        width="7.5"
        height="3.2"
        rx="1.6"
        fill="#7C3AED"
      />
    </svg>
  );
};

export const BankDashLogo = ({
  className = "",
  iconSize = "w-9 h-9",
  textSize = "text-[25px]",
  textColor = "text-[#1E293B]",
  dotColor = "text-[#2563EB]",
  showText = true,
  onClick,
}) => {
  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Dual Card Vector Icon */}
      <BankDashIcon className={iconSize} />

      {/* Brand Typography */}
      {showText && (
        <span
          className={`font-black ${textSize} ${textColor} tracking-tight leading-none`}
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.035em' }}
        >
          BankDash<span className={dotColor}>.</span>
        </span>
      )}
    </div>
  );
};

export default BankDashLogo;
