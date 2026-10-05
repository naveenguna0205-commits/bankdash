import React from 'react';

/**
 * BankDash Custom Sidebar Navigation Icons
 * Solid vector glyphs exactly matching the Figma design system and user references
 */

// 1. Dashboard (Solid House with Doorway - Image 5)
export const NavDashboardIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 2.5L2 11.5H5.2V22.5H10.2V16.2C10.2 15.2 11 14.4 12 14.4H13C14 14.4 14.8 15.2 14.8 16.2V22.5H19.8V11.5H23L12.5 2.5Z"
    />
  </svg>
);

// 2. Transactions (Vertical Banknote with $ & Transfer Arrows - Image 4)
export const NavTransactionsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Main Vertical Card / Banknote */}
    <rect
      x="5.5"
      y="3"
      width="14"
      height="19"
      rx="3"
      fill="currentColor"
    />
    {/* Dollar Sign in Center */}
    <path
      d="M12.5 7V18M14.5 9.5C14.5 9.5 13.8 8.5 12.5 8.5C11.2 8.5 10.5 9.3 10.5 10.2C10.5 11.8 14.5 11.8 14.5 13.4C14.5 14.4 13.6 15.2 12.5 15.2C11.1 15.2 10.5 14.1 10.5 14.1"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Bottom-left arrow */}
    <path
      d="M6.5 17.5L2 22M2 22H6M2 22V18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Top-right arrow */}
    <path
      d="M18.5 7.5L23 3M23 3H19M23 3V7"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 3. Accounts (Solid User Silhouette - Image 2)
export const NavAccountsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Head */}
    <circle cx="12.5" cy="7" r="4.6" />
    {/* Shoulders / Torso */}
    <path
      d="M4.5 21.5C4.5 16.8 8 13.5 12.5 13.5C16.9 13.5 20.5 16.8 20.5 21.5C20.5 22.3 19.8 23 19 23H6C5.2 23 4.5 22.3 4.5 21.5Z"
    />
  </svg>
);

// 4. Investments (4 Vertical Pillars with Dollar Coin on Top - Image 1)
export const NavInvestmentsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* 4 Pillars */}
    <rect x="1.8" y="10.5" width="4.2" height="12" rx="2.1" fill="currentColor" />
    <rect x="7.4" y="13.5" width="4.2" height="9" rx="2.1" fill="currentColor" />
    <rect x="13.4" y="13.5" width="4.2" height="9" rx="2.1" fill="currentColor" />
    <rect x="19" y="10.5" width="4.2" height="12" rx="2.1" fill="currentColor" />

    {/* Top Dollar Coin */}
    <circle cx="12.5" cy="6" r="5.2" fill="currentColor" />
    <path
      d="M12.5 3.5V8.5M10.8 7.3C10.8 7.3 11.3 8 12.5 8C13.5 8 14 7.5 14 6.8C14 5.8 11 5.8 11 4.8C11 4.2 11.6 3.8 12.5 3.8C13.5 3.8 13.9 4.3 13.9 4.3"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// 5. Credit Cards (Card with Stripes and Dollar Coin on Bottom Right - Image 3)
export const NavCreditCardsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Credit Card Base */}
    <rect
      x="1.5"
      y="3.5"
      width="20"
      height="14"
      rx="2.8"
      fill="currentColor"
    />
    {/* Magnetic Stripe */}
    <rect
      x="1.5"
      y="6.8"
      width="20"
      height="2.3"
      fill="#FFFFFF"
    />
    {/* Card Chip / Dots */}
    <rect
      x="4.2"
      y="11.8"
      width="5.5"
      height="2"
      rx="1"
      fill="#FFFFFF"
    />

    {/* Dollar Coin Border Cutout & Coin */}
    <circle
      cx="18"
      cy="16.5"
      r="6.5"
      fill="#FFFFFF"
    />
    <circle
      cx="18"
      cy="16.5"
      r="5.5"
      fill="currentColor"
    />
    <path
      d="M18 14V19M16.5 17.8C16.5 17.8 17 18.5 18 18.5C18.9 18.5 19.5 18 19.5 17.3C19.5 16.3 16.5 16.3 16.5 15.3C16.5 14.7 17.1 14.3 18 14.3C18.9 14.3 19.3 14.8 19.3 14.8"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// 6. Loans (Hand Catching Floating Dollar Coin - New Reference)
export const NavLoansIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Floating Dollar Coin */}
    <circle cx="13" cy="7.2" r="5.5" fill="currentColor" />
    <path
      d="M13 4.2V10.2M11.5 9.2C11.5 9.2 12 9.8 13 9.8C13.9 9.8 14.5 9.3 14.5 8.6C14.5 7.6 11.8 7.6 11.8 6.5C11.8 5.8 12.3 5.3 13 5.3C13.9 5.3 14.4 5.9 14.4 5.9"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Wrist */}
    <rect x="1.5" y="16.5" width="2.8" height="6.2" rx="1.4" fill="currentColor" />

    {/* Cupped Hand / Palm */}
    <path
      d="M6 18.2C6 17.2 6.8 16.5 7.8 16.5H11.5C12.2 16.5 12.9 16.9 13.4 17.5L14.8 19.2H20.2C21.6 19.2 22.8 18.2 23.2 16.9C24 18.2 23.8 20 22.6 21.2L20.2 23.2C19.2 24 18 24.5 16.8 24.5H10.5C8.8 24.5 7.3 23.5 6.5 22L6 18.2Z"
      fill="currentColor"
    />
  </svg>
);

// 7. Services (Crossed Wrench & Screwdriver / Service Tools - New Reference)
export const NavServicesIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Screwdriver (Bottom-Left to Top-Right) */}
    <path
      d="M17.5 4.5L20.5 1.5L23.5 4.5L20.5 7.5L17.5 4.5Z"
    />
    <path
      d="M16 6L19 9L11.5 16.5L8.5 13.5L16 6Z"
    />
    <rect
      x="4"
      y="18"
      width="4.5"
      height="4.5"
      rx="1.2"
      transform="rotate(-45 4 18)"
    />

    {/* Open End Wrench (Top-Left to Bottom-Right) */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.2 6.8C2 5.6 1.8 3.8 2.5 2.5C3.8 1.8 5.6 2 6.8 3.2C7.6 4 8 5.2 7.8 6.2L16.2 14.6C17.2 14.4 18.4 14.8 19.2 15.6C20.4 16.8 20.6 18.6 19.9 19.9C18.6 20.6 16.8 20.4 15.6 19.2C14.8 18.4 14.4 17.2 14.6 16.2L6.2 7.8C5.2 8 4 7.6 3.2 6.8ZM4.8 4.2C4.5 4.5 4.5 5 4.8 5.3C5.1 5.6 5.6 5.6 5.9 5.3C6.2 5 6.2 4.5 5.9 4.2C5.6 3.9 5.1 3.9 4.8 4.2Z"
    />
  </svg>
);

// 8. My Privileges (Lightbulb with Sprout and Overlapping Dollar Coin - New Reference)
export const NavPrivilegesIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Bulb Body */}
    <path
      d="M9 3.5C5.5 3.5 2.8 6.2 2.8 9.8C2.8 12.2 4.1 14.3 6 15.4V17.8C6 18.4 6.5 18.8 7 18.8H11C11.5 18.8 12 18.4 12 17.8V15.4C12.5 15.1 13 14.7 13.4 14.3C11 13.5 9.5 11.2 9.5 8.5C9.5 6.5 10.5 4.8 12.2 3.8C11.2 3.6 10.1 3.5 9 3.5Z"
      fill="currentColor"
    />
    {/* Sprout / Filament in Bulb */}
    <path
      d="M8.5 14V11M8.5 11L7 9.5M8.5 11L10 9.5"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bulb Base Collar & Contact */}
    <rect x="6.8" y="19.5" width="4.4" height="1.6" rx="0.8" fill="currentColor" />
    <path d="M7.8 21.8H10.2L9 23.5L7.8 21.8Z" fill="currentColor" />

    {/* Dollar Coin Border Cutout & Coin */}
    <circle cx="16.5" cy="8" r="6.8" fill="#FFFFFF" />
    <circle cx="16.5" cy="8" r="5.6" fill="currentColor" />
    <path
      d="M16.5 4.8V11.2M15 10.2C15 10.2 15.5 10.8 16.5 10.8C17.4 10.8 18 10.3 18 9.6C18 8.6 15.2 8.6 15.2 7.5C15.2 6.8 15.7 6.3 16.5 6.3C17.4 6.3 17.9 6.9 17.9 6.9"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// 9. Setting (8-Toothed Smooth Cog / Flower Gear with Center Hole - New Reference)
export const NavSettingsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 25 25"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2 2.2C10.7 1.8 11.3 1.5 12 1.5H13C13.7 1.5 14.3 1.8 14.8 2.2L15.6 3.2C16.4 3.5 17.1 4 17.7 4.5L18.9 4.2C19.6 4 20.3 4.2 20.8 4.7L21.5 5.4C22 5.9 22.2 6.6 22 7.3L21.7 8.5C22.2 9.1 22.7 9.8 23 10.6L24 11.4C24.5 11.9 24.8 12.5 24.8 13.2V14.2C24.8 14.9 24.5 15.5 24 16L23 16.8C22.7 17.6 22.2 18.3 21.7 18.9L22 20.1C22.2 20.8 22 21.5 21.5 22L20.8 22.7C20.3 23.2 19.6 23.4 18.9 23.2L17.7 22.9C17.1 23.4 16.4 23.9 15.6 24.2L14.8 25.2C14.3 25.6 13.7 25.9 13 25.9H12C11.3 25.9 10.7 25.6 10.2 25.2L9.4 24.2C8.6 23.9 7.9 23.4 7.3 22.9L6.1 23.2C5.4 23.4 4.7 23.2 4.2 22.7L3.5 22C3 21.5 2.8 20.8 3 20.1L3.3 18.9C2.8 18.3 2.3 17.6 2 16.8L1 16C0.5 15.5 0.2 14.9 0.2 14.2V13.2C0.2 12.5 0.5 11.9 1 11.4L2 10.6C2.3 9.8 2.8 9.1 3.3 8.5L3 7.3C2.8 6.6 3 5.9 3.5 5.4L4.2 4.7C4.7 4.2 5.4 4 6.1 4.2L7.3 4.5C7.9 4 8.6 3.5 9.4 3.2L10.2 2.2ZM12.5 17.5C15.26 17.5 17.5 15.26 17.5 12.5C17.5 9.74 15.26 7.5 12.5 7.5C9.74 7.5 7.5 9.74 7.5 12.5C7.5 15.26 9.74 17.5 12.5 17.5Z"
    />
  </svg>
);
