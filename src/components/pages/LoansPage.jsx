import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatedNumber } from '../common/AnimatedNumber';
import confetti from 'canvas-confetti';

/**
 * Top Stat Card Icons Matching Modern Fintech Design
 */
const PersonalLoanIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="7" r="4.5" />
    <path d="M4 20.5C4 16.2 7.6 13 12 13C16.4 13 20 16.2 20 20.5C20 21.3 19.3 22 18.5 22H5.5C4.7 22 4 21.3 4 20.5Z" />
  </svg>
);

const CorporateLoanIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 3.5C9 2.7 9.7 2 10.5 2H13.5C14.3 2 15 2.7 15 3.5V5H19C20.1 5 21 5.9 21 7V10H3V7C3 5.9 3.9 5 5 5H9V3.5ZM10.5 3.5V5H13.5V3.5H10.5Z" />
    <path d="M3 11.5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V11.5H13.5V13C13.5 13.6 13.1 14 12.5 14H11.5C10.9 14 10.5 13.6 10.5 13V11.5H3ZM10.5 11.5V12.5H13.5V11.5H10.5Z" />
  </svg>
);

const BusinessLoanIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="3" y="14" width="4" height="8" rx="1.5" />
    <rect x="9.5" y="10" width="4" height="12" rx="1.5" />
    <rect x="16" y="6" width="4" height="16" rx="1.5" />
    <path d="M14.5 4.5L19.5 2M19.5 2V6.5M19.5 2L15 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CustomLoanIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.5 4.5L20.5 1.5L23.5 4.5L20.5 7.5L17.5 4.5Z" />
    <path d="M16 6L19 9L11.5 16.5L8.5 13.5L16 6Z" />
    <rect x="4" y="18" width="4.5" height="4.5" rx="1.2" transform="rotate(-45 4 18)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.2 6.8C2 5.6 1.8 3.8 2.5 2.5C3.8 1.8 5.6 2 6.8 3.2C7.6 4 8 5.2 7.8 6.2L16.2 14.6C17.2 14.4 18.4 14.8 19.2 15.6C20.4 16.8 20.6 18.6 19.9 19.9C18.6 20.6 16.8 20.4 15.6 19.2C14.8 18.4 14.4 17.2 14.6 16.2L6.2 7.8C5.2 8 4 7.6 3.2 6.8ZM4.8 4.2C4.5 4.5 4.5 5 4.8 5.3C5.1 5.6 5.6 5.6 5.9 5.3C6.2 5 6.2 4.5 5.9 4.2C5.6 3.9 5.1 3.9 4.8 4.2Z"
    />
  </svg>
);

export const LoansPage = () => {
  const { loans, setLoans, repayLoan, addToast } = useApp();

  // Handle Repaying an Installment directly with confetti animation
  const handleQuickRepay = (loan) => {
    const amountToPay = loan.installmentAmount || Math.round(loan.loanMoney / 12);
    if (loan.leftToRepay <= 0) {
      addToast('Loan Paid Off', `Loan #${loan.slNo} is already fully repaid.`, 'info');
      return;
    }

    if (typeof repayLoan === 'function') {
      repayLoan(loan.id, amountToPay);
    } else if (typeof setLoans === 'function') {
      setLoans((prevLoans) =>
        prevLoans.map((item) => {
          if (item.id === loan.id) {
            const newLeft = Math.max(0, item.leftToRepay - amountToPay);
            return { ...item, leftToRepay: newLeft };
          }
          return item;
        })
      );
    }

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    addToast(
      'Installment Paid',
      `Successfully repaid $${amountToPay.toLocaleString()} for Loan #${loan.slNo}`,
      'success'
    );
  };

  // Dynamic totals calculation
  const totalLoanMoney = loans.reduce((sum, l) => sum + (l.loanMoney || 0), 0);
  const totalLeftToRepay = loans.reduce((sum, l) => sum + (l.leftToRepay || 0), 0);
  const totalInstallments = loans.reduce((sum, l) => sum + (l.installmentAmount || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8 pb-10 animate-fade-in-up">
      {/* 4 Stat Cards: Carousel on mobile, 4-col grid on tablet & desktop */}
      <div className="flex md:grid md:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto snap-x pb-2 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* 1. Personal Loans */}
        <div className="min-w-[240px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-6 flex items-center gap-4 sm:gap-5 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs card-hover transition-all">
          <div className="w-13 h-13 sm:w-[66px] sm:h-[66px] rounded-full bg-[#EEF2FF] dark:bg-[#4F46E5]/20 flex items-center justify-center shrink-0 text-[#4F46E5]">
            <PersonalLoanIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="text-xs sm:text-[15px] font-medium text-[#718EBF] dark:text-[#94A3B8] mb-1">Personal Loans</div>
            <div className="text-xl sm:text-[24px] font-bold text-[#1E293B] dark:text-[#F8FAFC] tracking-tight">
              <AnimatedNumber value={50000} prefix="$" decimals={0} />
            </div>
          </div>
        </div>

        {/* 2. Corporate Loans */}
        <div className="min-w-[240px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-6 flex items-center gap-4 sm:gap-5 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs card-hover transition-all">
          <div className="w-13 h-13 sm:w-[66px] sm:h-[66px] rounded-full bg-[#F5F3FF] dark:bg-[#7C3AED]/20 flex items-center justify-center shrink-0 text-[#7C3AED]">
            <CorporateLoanIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="text-xs sm:text-[15px] font-medium text-[#718EBF] dark:text-[#94A3B8] mb-1">Corporate Loans</div>
            <div className="text-xl sm:text-[24px] font-bold text-[#1E293B] dark:text-[#F8FAFC] tracking-tight">
              <AnimatedNumber value={100000} prefix="$" decimals={0} />
            </div>
          </div>
        </div>

        {/* 3. Business Loans */}
        <div className="min-w-[240px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-6 flex items-center gap-4 sm:gap-5 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs card-hover transition-all">
          <div className="w-13 h-13 sm:w-[66px] sm:h-[66px] rounded-full bg-[#EDE9FE] dark:bg-[#6D28D9]/20 flex items-center justify-center shrink-0 text-[#6D28D9] dark:text-[#C4B5FD]">
            <BusinessLoanIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="text-xs sm:text-[15px] font-medium text-[#718EBF] dark:text-[#94A3B8] mb-1">Business Loans</div>
            <div className="text-xl sm:text-[24px] font-bold text-[#1E293B] dark:text-[#F8FAFC] tracking-tight">
              <AnimatedNumber value={500000} prefix="$" decimals={0} />
            </div>
          </div>
        </div>

        {/* 4. Custom Loans */}
        <div className="min-w-[240px] sm:min-w-0 flex-1 snap-center bg-white dark:bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-5 sm:p-6 flex items-center gap-4 sm:gap-5 border border-[#E6EFF5] dark:border-[#1E293B] shadow-xs card-hover transition-all">
          <div className="w-13 h-13 sm:w-[66px] sm:h-[66px] rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 flex items-center justify-center shrink-0 text-[#6366F1]">
            <CustomLoanIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="text-xs sm:text-[15px] font-medium text-[#718EBF] dark:text-[#94A3B8] mb-1">Custom Loans</div>
            <div className="text-lg sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] tracking-tight">
              Choose Money
            </div>
          </div>
        </div>
      </div>

      {/* Active Loans Overview Section */}
      <div className="space-y-4">
        <h2 className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] dark:text-[#F8FAFC] m-0">
          Active Loans Overview
        </h2>

        {/* Table Container */}
        <div className="bg-[#131E36] rounded-[22px] sm:rounded-[25px] p-4 sm:p-8 border border-[#1E293B] shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E293B] text-[13px] sm:text-[15px] font-medium text-[#94A3B8]">
                  <th className="py-3.5 px-2 sm:px-4 font-medium hidden sm:table-cell text-[#94A3B8]">SL No</th>
                  <th className="py-3.5 px-2 sm:px-4 font-medium text-[#94A3B8]">Loan Money</th>
                  <th className="py-3.5 px-2 sm:px-4 font-medium text-[#94A3B8]">Left to repay</th>
                  <th className="py-3.5 px-2 sm:px-4 font-medium hidden md:table-cell text-[#94A3B8]">Duration</th>
                  <th className="py-3.5 px-2 sm:px-4 font-medium hidden md:table-cell text-[#94A3B8]">Interest rate</th>
                  <th className="py-3.5 px-2 sm:px-4 font-medium hidden md:table-cell text-[#94A3B8]">Installment</th>
                  <th className="py-3.5 px-2 sm:px-4 font-medium text-right sm:text-center text-[#94A3B8]">Repay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] text-[13px] sm:text-[15px]">
                {loans.map((loan, idx) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-indigo-500/10 transition-colors"
                  >
                    <td className="py-4 px-2 sm:px-4 font-medium text-[#F8FAFC] hidden sm:table-cell">
                      {loan.slNo}
                    </td>
                    <td className="py-4 px-2 sm:px-4 font-medium text-[#F8FAFC] whitespace-nowrap">
                      ${loan.loanMoney.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 sm:px-4 font-medium text-[#F8FAFC] whitespace-nowrap">
                      ${loan.leftToRepay.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 sm:px-4 font-medium text-slate-300 hidden md:table-cell">
                      {loan.duration}
                    </td>
                    <td className="py-4 px-2 sm:px-4 font-medium text-slate-300 hidden md:table-cell">
                      {loan.interestRate}
                    </td>
                    <td className="py-4 px-2 sm:px-4 font-medium text-slate-300 hidden md:table-cell whitespace-nowrap">
                      {loan.installment}
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-right sm:text-center">
                      <button
                        type="button"
                        onClick={() => handleQuickRepay(loan)}
                        className={`rounded-full px-4 sm:px-6 py-1.5 text-xs sm:text-[14px] font-medium border transition-all cursor-pointer active:scale-95 ${
                          idx === 0
                            ? 'border-[#4F46E5] text-[#818CF8] bg-[#4F46E5]/20 hover:bg-[#4F46E5] hover:text-white'
                            : 'border-slate-700 text-[#94A3B8] hover:border-[#818CF8] hover:text-[#818CF8]'
                        }`}
                      >
                        Repay
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Footer Total Row */}
                <tr className="border-t border-[#1E293B] text-[13px] sm:text-[15px] font-bold text-[#818CF8]">
                  <td className="py-4.5 px-2 sm:px-4 hidden sm:table-cell text-[#818CF8]">Total</td>
                  <td className="py-4.5 px-2 sm:px-4 text-[#818CF8] whitespace-nowrap">
                    <span className="sm:hidden block text-[11px] font-semibold text-[#818CF8] mb-0.5">Total</span>
                    ${totalLoanMoney.toLocaleString()}
                  </td>
                  <td className="py-4.5 px-2 sm:px-4 text-[#818CF8] whitespace-nowrap align-bottom">
                    ${totalLeftToRepay.toLocaleString()}
                  </td>
                  <td className="py-4.5 px-2 sm:px-4 hidden md:table-cell"></td>
                  <td className="py-4.5 px-2 sm:px-4 hidden md:table-cell"></td>
                  <td className="py-4.5 px-2 sm:px-4 text-[#818CF8] hidden md:table-cell whitespace-nowrap">
                    ${totalInstallments.toLocaleString()} / month
                  </td>
                  <td className="py-4.5 px-2 sm:px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansPage;
