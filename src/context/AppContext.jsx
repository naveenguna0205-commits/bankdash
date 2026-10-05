import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialUserData,
  initialCards,
  initialTransactions,
  quickTransferContacts,
  investmentsData,
  accountsData,
  loansData,
  servicesData,
  privilegesData,
  notificationsList
} from '../data/initialData';

const AppContext = createContext();

const THEMES = {
  indigo: {
    id: 'indigo',
    name: 'Indigo & Purple',
    primary: '#4F46E5',
    primaryHover: '#4338CA',
    primaryLight: '#EEF2FF',
    secondary: '#7C3AED',
    secondaryHover: '#6D28D9',
    secondaryLight: '#F5F3FF',
    primaryText: 'text-indigo-600',
    primaryBg: 'bg-indigo-600',
    primaryBorder: 'border-indigo-600',
    gradientClass: 'from-[#4F46E5] to-[#7C3AED]',
    cardGradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
    chartPrimary: '#4F46E5',
    chartSecondary: '#7C3AED',
    chartTertiary: '#6366F1',
    chartAccent: '#A855F7',
    activeNavBg: 'bg-indigo-50/60 text-indigo-600 border-l-4 border-indigo-600',
    badgeBg: 'bg-indigo-500/10 text-indigo-600'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Wealth',
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#ECFDF5',
    secondary: '#0D9488',
    secondaryHover: '#0F766E',
    secondaryLight: '#F0FDFA',
    primaryText: 'text-emerald-600',
    primaryBg: 'bg-emerald-600',
    primaryBorder: 'border-emerald-600',
    gradientClass: 'from-[#059669] to-[#0D9488]',
    cardGradient: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
    chartPrimary: '#059669',
    chartSecondary: '#0D9488',
    chartTertiary: '#10B981',
    chartAccent: '#14B8A6',
    activeNavBg: 'bg-emerald-50/60 text-emerald-600 border-l-4 border-emerald-600',
    badgeBg: 'bg-emerald-500/10 text-emerald-600'
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Cyan',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#EFF6FF',
    secondary: '#06B6D4',
    secondaryHover: '#0891B2',
    secondaryLight: '#ECFEFF',
    primaryText: 'text-blue-600',
    primaryBg: 'bg-blue-600',
    primaryBorder: 'border-blue-600',
    gradientClass: 'from-[#2563EB] to-[#06B6D4]',
    cardGradient: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
    chartPrimary: '#2563EB',
    chartSecondary: '#06B6D4',
    chartTertiary: '#3B82F6',
    chartAccent: '#22D3EE',
    activeNavBg: 'bg-blue-50/60 text-blue-600 border-l-4 border-blue-600',
    badgeBg: 'bg-blue-500/10 text-blue-600'
  },
  rose: {
    id: 'rose',
    name: 'Sunset Orchid',
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    primaryLight: '#F5F3FF',
    secondary: '#DB2777',
    secondaryHover: '#BE185D',
    secondaryLight: '#FDF2F8',
    primaryText: 'text-purple-600',
    primaryBg: 'bg-purple-600',
    primaryBorder: 'border-purple-600',
    gradientClass: 'from-[#7C3AED] to-[#DB2777]',
    cardGradient: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
    chartPrimary: '#7C3AED',
    chartSecondary: '#DB2777',
    chartTertiary: '#A855F7',
    chartAccent: '#F472B6',
    activeNavBg: 'bg-purple-50/60 text-purple-600 border-l-4 border-purple-600',
    badgeBg: 'bg-purple-500/10 text-purple-600'
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Gold',
    primary: '#0F172A',
    primaryHover: '#1E293B',
    primaryLight: '#F8FAFC',
    secondary: '#D97706',
    secondaryHover: '#B45309',
    secondaryLight: '#FFFBEB',
    primaryText: 'text-slate-900',
    primaryBg: 'bg-slate-900',
    primaryBorder: 'border-slate-900',
    gradientClass: 'from-[#0F172A] to-[#D97706]',
    cardGradient: 'linear-gradient(135deg, #0F172A 0%, #334155 50%, #D97706 100%)',
    chartPrimary: '#0F172A',
    chartSecondary: '#D97706',
    chartTertiary: '#475569',
    chartAccent: '#F59E0B',
    activeNavBg: 'bg-slate-100/60 text-slate-900 border-l-4 border-slate-900',
    badgeBg: 'bg-slate-900/10 text-slate-900'
  }
};

export const AppProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('Dashboard');
  const [currentTheme, setCurrentTheme] = useState('indigo');
  const [userProfile, setUserProfile] = useState(initialUserData);
  const [cards, setCards] = useState(initialCards);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [contacts, setContacts] = useState(quickTransferContacts);
  const [investments, setInvestments] = useState(investmentsData);
  const [accounts, setAccounts] = useState(accountsData);
  const [loans, setLoans] = useState(loansData);
  const [services, setServices] = useState(servicesData);
  const [privileges, setPrivileges] = useState(privilegesData);
  const [notifications, setNotifications] = useState(notificationsList);
  
  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedCardModal, setSelectedCardModal] = useState(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isLoanApplyModalOpen, setIsLoanApplyModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bankdash_darkmode');
    return saved === null ? true : saved !== 'false';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bankdash_darkmode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const themeConfig = THEMES[currentTheme] || THEMES.sapphire;

  // Add toast helper
  const addToast = (title, message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Quick Transfer handler
  const executeTransfer = (contactId, amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      addToast('Invalid Amount', 'Please enter a valid transfer amount.', 'error');
      return false;
    }

    const contact = contacts.find((c) => c.id === contactId) || contacts[0];
    const newTxId = `#12548${Math.floor(100 + Math.random() * 900)}`;

    const newTx = {
      id: `tx-${Date.now()}`,
      description: `Transfer to ${contact.name}`,
      transactionId: newTxId,
      type: 'Transfer',
      category: 'Transfer',
      card: cards[0]?.cardNumber.slice(-9) || '1234 ****',
      date: 'Just now',
      dateFormatted: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      amount: -numAmount,
      status: 'Completed',
      merchant: contact.name,
      iconType: 'transfer',
      isExpense: true
    };

    // Update transactions
    setTransactions((prev) => [newTx, ...prev]);

    // Update primary card balance
    setCards((prev) =>
      prev.map((card, idx) =>
        idx === 0
          ? { ...card, balance: Math.max(0, card.balance - numAmount), spent: (card.spent || 0) + numAmount }
          : card
      )
    );

    // Synchronize accounts checking balance & last transactions
    setAccounts((prev) => ({
      ...prev,
      kpis: {
        ...prev.kpis,
        myBalance: Math.max(0, prev.kpis.myBalance - numAmount),
        expense: (prev.kpis.expense || 0) + numAmount
      },
      lastTransactions: [
        {
          id: `lt-${Date.now()}`,
          title: `Transfer to ${contact.name}`,
          type: 'Transfer',
          card: cards[0]?.cardNumber.slice(-9) || '1234 ****',
          date: 'Just now',
          amount: -numAmount,
          status: 'Completed',
          icon: 'transfer'
        },
        ...prev.lastTransactions
      ]
    }));

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }

    addToast('Transfer Successful!', `$${numAmount.toLocaleString()} sent successfully to ${contact.name}.`, 'success');
    return true;
  };

  // Add new card handler
  const addNewCard = (cardData) => {
    const newCard = {
      id: `card-${Date.now()}`,
      balance: parseFloat(cardData.balance) || 3500,
      cardHolder: cardData.cardHolder || userProfile.name,
      validThru: cardData.validThru || '12/29',
      cardNumber: cardData.cardNumber || '4532 **** **** 8821',
      rawNumber: cardData.rawNumber || '4532 9018 2741 8821',
      cardType: cardData.cardType || (cards.length % 2 === 0 ? 'primary' : 'light'),
      brand: cardData.brand || 'Mastercard',
      bank: cardData.bank || 'DBL Bank',
      status: 'Active',
      isBlocked: false,
      limit: parseFloat(cardData.limit) || 10000,
      spent: 0
    };

    setCards((prev) => [...prev, newCard]);
    addToast('Card Added Successfully', `New ${newCard.brand} card added to your wallet.`, 'success');
  };

  // Toggle card blocked state
  const toggleBlockCard = (cardId) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const nextBlocked = !c.isBlocked;
          addToast(
            nextBlocked ? 'Card Blocked' : 'Card Unblocked',
            `Card ending in ${c.cardNumber.slice(-4)} is now ${nextBlocked ? 'temporarily locked' : 'active'}.`,
            nextBlocked ? 'warning' : 'success'
          );
          return { ...c, isBlocked: nextBlocked };
        }
        return c;
      })
    );
  };

  // Redeem privilege offer
  const redeemOffer = (offer) => {
    if (privileges.points < offer.points) {
      addToast('Insufficient Points', `You need ${offer.points.toLocaleString()} pts to redeem this offer.`, 'error');
      return;
    }

    setPrivileges((prev) => ({
      ...prev,
      points: prev.points - offer.points
    }));

    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch {}

    addToast('Reward Redeemed!', `You redeemed "${offer.title}". Voucher sent to ${userProfile.email}.`, 'success');
  };

  // Apply for loan
  const applyLoan = (loanData) => {
    const newLoan = {
      id: `LN-${Math.floor(1000 + Math.random() * 9000)}`,
      type: loanData.type || 'Personal Instant Loan',
      totalAmount: parseFloat(loanData.amount) || 25000,
      repaid: 0,
      leftToRepay: parseFloat(loanData.amount) || 25000,
      duration: `${loanData.months || 24} Months`,
      monthlyInstallment: Math.round((parseFloat(loanData.amount) || 25000) / (loanData.months || 24) * 1.05),
      interestRate: '4.2%',
      status: 'Under Review'
    };

    setLoans((prev) => [newLoan, ...prev]);
    addToast('Loan Application Submitted', `Application for $${newLoan.totalAmount.toLocaleString()} is under review.`, 'success');
  };

  // Repay loan handler
  const repayLoan = (loanId, amountToPay) => {
    setLoans((prevLoans) =>
      prevLoans.map((item) => {
        if (item.id === loanId) {
          const newLeft = Math.max(0, item.leftToRepay - amountToPay);
          return { ...item, leftToRepay: newLeft };
        }
        return item;
      })
    );
  };

  // Update profile
  const updateProfile = (updatedFields) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedFields
    }));
    addToast('Profile Saved', 'Your personal preferences and details have been updated.', 'success');
  };

  // Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  // Global search filtering across items
  const globalSearchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    // Search in transactions
    transactions.forEach((tx) => {
      if (
        tx.description.toLowerCase().includes(q) ||
        tx.type.toLowerCase().includes(q) ||
        tx.merchant.toLowerCase().includes(q) ||
        tx.transactionId.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Transaction',
          title: tx.description,
          subtitle: `${tx.amount < 0 ? '-' : '+'}$${Math.abs(tx.amount)} • ${tx.dateFormatted}`,
          targetTab: 'Transactions',
          raw: tx
        });
      }
    });

    // Search in cards
    cards.forEach((card) => {
      if (
        card.bank.toLowerCase().includes(q) ||
        card.cardHolder.toLowerCase().includes(q) ||
        card.brand.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Credit Card',
          title: `${card.bank} ${card.brand}`,
          subtitle: `Card ending ${card.cardNumber.slice(-4)} • Balance $${card.balance.toLocaleString()}`,
          targetTab: 'Credit Cards',
          raw: card
        });
      }
    });

    // Search in contacts
    contacts.forEach((contact) => {
      if (contact.name.toLowerCase().includes(q) || contact.role.toLowerCase().includes(q)) {
        results.push({
          type: 'Contact',
          title: contact.name,
          subtitle: `${contact.role} • ${contact.email}`,
          targetTab: 'Dashboard',
          raw: contact
        });
      }
    });

    // Search in investments
    investments.myInvestments.forEach((inv) => {
      if (inv.name.toLowerCase().includes(q) || inv.category.toLowerCase().includes(q)) {
        results.push({
          type: 'Investment',
          title: inv.name,
          subtitle: `$${inv.value.toLocaleString()} (${inv.returnValue})`,
          targetTab: 'Investments',
          raw: inv
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery, transactions, cards, contacts, investments]);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentTheme,
        setCurrentTheme,
        themeConfig,
        userProfile,
        setUserProfile,
        updateProfile,
        cards,
        setCards,
        addNewCard,
        toggleBlockCard,
        transactions,
        setTransactions,
        contacts,
        setContacts,
        investments,
        setInvestments,
        accounts,
        setAccounts,
        loans,
        setLoans,
        applyLoan,
        repayLoan,
        services,
        setServices,
        privileges,
        setPrivileges,
        redeemOffer,
        notifications,
        setNotifications,
        markAllNotificationsRead,
        searchQuery,
        setSearchQuery,
        globalSearchResults,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        selectedReceipt,
        setSelectedReceipt,
        selectedCardModal,
        setSelectedCardModal,
        isPinModalOpen,
        setIsPinModalOpen,
        isAddCardModalOpen,
        setIsAddCardModalOpen,
        isLoanApplyModalOpen,
        setIsLoanApplyModalOpen,
        isServiceModalOpen,
        setIsServiceModalOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isThemeMenuOpen,
        setIsThemeMenuOpen,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        toasts,
        addToast,
        removeToast,
        executeTransfer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
