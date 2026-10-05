// Initial dataset for BankDash Dashboard matching Figma exact content
import liviaImg from '../assets/icons/livia.png';
import randyImg from '../assets/icons/randy.png';
import workmanImg from '../assets/icons/workman.png';
import charleneImg from '../assets/icons/charlene.png';

export const initialUserData = {
  name: 'Charlene Reed',
  username: 'Charlene Reed',
  email: 'charlenereed@gmail.com',
  password: '************',
  avatar: charleneImg,
  dob: '25 January 1990',
  presentAddress: 'San Jose, California, USA',
  permanentAddress: 'San Jose, California, USA',
  city: 'San Jose',
  postalCode: '45962',
  country: 'USA',
  currency: 'USD',
  timezone: '(GMT-12:00) International Date Line West',
  twoFactorAuth: true,
  notifications: {
    digitalCurrency: true,
    merchantOrder: false,
    recommendations: true
  }
};

export const initialCards = [
  {
    id: 'card-1',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    rawNumber: '3778 4829 1928 1234',
    cardType: 'primary', // primary blue gradient
    brand: 'Mastercard',
    bank: 'DBL Bank',
    status: 'Active',
    isBlocked: false,
    limit: 15000,
    spent: 5756
  },
  {
    id: 'card-2',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    rawNumber: '3778 4829 1928 1234',
    cardType: 'light', // secondary light card
    brand: 'Mastercard',
    bank: 'BRC Bank',
    status: 'Active',
    isBlocked: false,
    limit: 10000,
    spent: 3240
  },
  {
    id: 'card-3',
    balance: 5756,
    cardHolder: 'Eddy Cusuma',
    validThru: '12/22',
    cardNumber: '3778 **** **** 1234',
    rawNumber: '3778 4829 1928 1234',
    cardType: 'light',
    brand: 'Mastercard',
    bank: 'ABM Bank',
    status: 'Active',
    isBlocked: false,
    limit: 20000,
    spent: 5756
  }
];

export const initialTransactions = [
  {
    id: 'tx-1',
    description: 'Deposit from my Card',
    transactionId: '#12548796',
    type: 'Shopping',
    category: 'Deposit',
    card: '1234 ****',
    date: '28 Jan, 12.30 AM',
    dateFormatted: '28 January 2021',
    amount: -850,
    status: 'Completed',
    merchant: 'Deposit from my Card',
    iconType: 'card',
    isExpense: true
  },
  {
    id: 'tx-2',
    description: 'Deposit Paypal',
    transactionId: '#12548796',
    type: 'Transfer',
    category: 'Income',
    card: '1234 ****',
    date: '25 Jan, 10.40 PM',
    dateFormatted: '25 January 2021',
    amount: 2500,
    status: 'Completed',
    merchant: 'Paypal',
    iconType: 'paypal',
    isExpense: false
  },
  {
    id: 'tx-3',
    description: 'Jemi Wilson',
    transactionId: '#12548796',
    type: 'Transfer',
    category: 'Income',
    card: '1234 ****',
    date: '21 Jan, 10.40 PM',
    dateFormatted: '21 January 2021',
    amount: 5400,
    status: 'Completed',
    merchant: 'Jemi Wilson',
    iconType: 'transfer',
    isExpense: false
  },
  {
    id: 'tx-4',
    description: 'Spotify Subscription',
    transactionId: '#12548796',
    type: 'Shopping',
    category: 'Subscription',
    card: '1234 ****',
    date: '28 Jan, 12.30 AM',
    dateFormatted: '28 January 2021',
    amount: -2500,
    status: 'Completed',
    merchant: 'Spotify',
    iconType: 'spotify',
    isExpense: true
  },
  {
    id: 'tx-5',
    description: 'Freepik Sales',
    transactionId: '#12548796',
    type: 'Transfer',
    category: 'Income',
    card: '1234 ****',
    date: '25 Jan, 10.40 PM',
    dateFormatted: '25 January 2021',
    amount: 750,
    status: 'Completed',
    merchant: 'Freepik',
    iconType: 'freepik',
    isExpense: false
  },
  {
    id: 'tx-6',
    description: 'Mobile Service',
    transactionId: '#12548796',
    type: 'Service',
    category: 'Utility',
    card: '1234 ****',
    date: '20 Jan, 10.40 PM',
    dateFormatted: '20 January 2021',
    amount: -150,
    status: 'Pending',
    merchant: 'Mobile Service',
    iconType: 'service',
    isExpense: true
  },
  {
    id: 'tx-7',
    description: 'Wilson',
    transactionId: '#12548796',
    type: 'Transfer',
    category: 'Transfer',
    card: '1234 ****',
    date: '15 Jan, 03.29 PM',
    dateFormatted: '15 January 2021',
    amount: -1050,
    status: 'Completed',
    merchant: 'Wilson',
    iconType: 'transfer',
    isExpense: true
  },
  {
    id: 'tx-8',
    description: 'Emilly',
    transactionId: '#12548796',
    type: 'Transfer',
    category: 'Income',
    card: '1234 ****',
    date: '14 Jan, 10.40 PM',
    dateFormatted: '14 January 2021',
    amount: 840,
    status: 'Completed',
    merchant: 'Emilly',
    iconType: 'transfer',
    isExpense: false
  }
];

export const quickTransferContacts = [
  {
    id: 'c-1',
    name: 'Livia Bator',
    role: 'CEO',
    avatar: liviaImg
  },
  {
    id: 'c-2',
    name: 'Randy Press',
    role: 'Director',
    avatar: randyImg
  },
  {
    id: 'c-3',
    name: 'Workman',
    role: 'Designer',
    avatar: workmanImg
  }
];

export const weeklyActivityData = [
  { day: 'Sat', deposit: 240, withdraw: 480 },
  { day: 'Sun', deposit: 130, withdraw: 350 },
  { day: 'Mon', deposit: 260, withdraw: 330 },
  { day: 'Tue', deposit: 370, withdraw: 480 },
  { day: 'Wed', deposit: 240, withdraw: 150 },
  { day: 'Thu', deposit: 240, withdraw: 390 },
  { day: 'Fri', deposit: 330, withdraw: 400 }
];

export const debitCreditWeeklyData = [
  { day: 'Sat', debit: 240, credit: 480 },
  { day: 'Sun', debit: 130, credit: 350 },
  { day: 'Mon', debit: 120, credit: 240 },
  { day: 'Tue', debit: 480, credit: 220 },
  { day: 'Wed', debit: 320, credit: 460 },
  { day: 'Thu', debit: 330, credit: 150 },
  { day: 'Fri', debit: 400, credit: 480 }
];

export const expenseStatisticsData = [
  { name: 'Entertainment', value: 30, color: '#1E293B' }, // Dark Slate
  { name: 'Bill Expense', value: 15, color: '#6366F1' },  // Indigo Light
  { name: 'Investment', value: 20, color: '#7C3AED' },    // Purple
  { name: 'Others', value: 35, color: '#4F46E5' }         // Indigo Primary
];

export const balanceHistoryData = [
  { month: 'Jul', balance: 130 },
  { month: 'Aug', balance: 320 },
  { month: 'Sep', balance: 450 },
  { month: 'Oct', balance: 780 },
  { month: 'Nov', balance: 220 },
  { month: 'Dec', balance: 580 },
  { month: 'Jan', balance: 650 }
];

export const balanceHistoryWaveData = [
  { month: 'Jul', balance: 130 },
  { month: '', balance: 340 },
  { month: 'Aug', balance: 280 },
  { month: '', balance: 480 },
  { month: 'Sep', balance: 440 },
  { month: 'Oct', balance: 780 },
  { month: 'Nov', balance: 220 },
  { month: '', balance: 580 },
  { month: 'Dec', balance: 250 },
  { month: 'Jan', balance: 650 },
  { month: '', balance: 620 }
];

export const monthlyExpenseData = [
  { month: 'Aug', amount: 8400, highlighted: false },
  { month: 'Sep', amount: 11200, highlighted: false },
  { month: 'Oct', amount: 6900, highlighted: false },
  { month: 'Nov', amount: 4800, highlighted: false },
  { month: 'Dec', amount: 12500, highlighted: true },
  { month: 'Jan', amount: 7300, highlighted: false }
];

export const investmentsData = {
  kpis: {
    totalInvested: 150000,
    numberOfInvestments: 1250,
    rateOfReturn: '+5.80%'
  },
  yearlyInvestment: [
    { year: '2016', amount: 5000 },
    { year: '2017', amount: 22000 },
    { year: '2018', amount: 16000 },
    { year: '2019', amount: 37000 },
    { year: '2020', amount: 21000 },
    { year: '2021', amount: 28000 }
  ],
  monthlyRevenue: [
    { year: '2016', revenue: 11000 },
    { year: '2017', revenue: 19000 },
    { year: '2018', revenue: 31000 },
    { year: '2019', revenue: 26000 },
    { year: '2020', revenue: 27000 },
    { year: '2021', revenue: 35000 }
  ],
  myInvestments: [
    {
      id: 'inv-1',
      name: 'Apple Store',
      category: 'E-commerce, Marketplace',
      value: 54000,
      returnValue: '+16%',
      isPositive: true,
      logo: 'apple'
    },
    {
      id: 'inv-2',
      name: 'Samsung Mobile',
      category: 'E-commerce, Marketplace',
      value: 25300,
      returnValue: '-4%',
      isPositive: false,
      logo: 'samsung'
    },
    {
      id: 'inv-3',
      name: 'Tesla Motors',
      category: 'Electric Vehicles',
      value: 8200,
      returnValue: '+25%',
      isPositive: true,
      logo: 'tesla'
    }
  ],
  trendingStocks: [
    { slNo: '01.', name: 'Trivago', price: 520, returnRate: '+5%', isPositive: true },
    { slNo: '02.', name: 'Canon', price: 480, returnRate: '+10%', isPositive: true },
    { slNo: '03.', name: 'Uber Food', price: 350, returnRate: '-3%', isPositive: false },
    { slNo: '04.', name: 'Nokia', price: 940, returnRate: '+2%', isPositive: true },
    { slNo: '05.', name: 'Tiktok', price: 670, returnRate: '-12%', isPositive: false }
  ]
};

export const accountsData = {
  kpis: {
    myBalance: 12750,
    income: 5600,
    expense: 3460,
    totalSaving: 7920
  },
  lastTransactions: [
    {
      id: 'atx-1',
      title: 'Spotify Subscription',
      date: '25 Jan 2021',
      type: 'Shopping',
      card: '1234 ****',
      status: 'Pending',
      amount: -150,
      icon: 'spotify'
    },
    {
      id: 'atx-2',
      title: 'Mobile Service',
      date: '25 Jan 2021',
      type: 'Service',
      card: '1234 ****',
      status: 'Completed',
      amount: -340,
      icon: 'service'
    },
    {
      id: 'atx-3',
      title: 'Emilly Wilson',
      date: '25 Jan 2021',
      type: 'Transfer',
      card: '1234 ****',
      status: 'Completed',
      amount: 780,
      icon: 'transfer'
    }
  ],
  invoicesSent: [
    {
      id: 'inv-s-1',
      recipient: 'Apple Store',
      time: '5h ago',
      amount: 450,
      icon: 'apple',
      color: 'teal'
    },
    {
      id: 'inv-s-2',
      recipient: 'Michael',
      time: '2 days ago',
      amount: 160,
      icon: 'user',
      color: 'amber'
    },
    {
      id: 'inv-s-3',
      recipient: 'Playstation',
      time: '5 days ago',
      amount: 1085,
      icon: 'playstation',
      color: 'indigo'
    },
    {
      id: 'inv-s-4',
      recipient: 'William',
      time: '10 days ago',
      amount: 90,
      icon: 'user',
      color: 'rose'
    }
  ]
};

export const creditCardStatsData = [
  { name: 'DBL Bank', value: 35, color: '#4F46E5' },
  { name: 'BRC Bank', value: 25, color: '#7C3AED' },
  { name: 'ABM Bank', value: 20, color: '#6366F1' },
  { name: 'MCP Bank', value: 20, color: '#A855F7' }
];

export const creditCardListData = [
  {
    id: 'ccl-1',
    cardType: 'Secondary',
    bank: 'DBL Bank',
    cardNumber: '**** **** 5600',
    namainCard: 'William',
    balance: '$4,200',
    expiry: '10/28',
    status: 'Active',
    color: 'blue'
  },
  {
    id: 'ccl-2',
    cardType: 'Secondary',
    bank: 'BRC Bank',
    cardNumber: '**** **** 4300',
    namainCard: 'Michel',
    balance: '$6,800',
    expiry: '04/27',
    status: 'Active',
    color: 'pink'
  },
  {
    id: 'ccl-3',
    cardType: 'Secondary',
    bank: 'ABM Bank',
    cardNumber: '**** **** 7560',
    namainCard: 'Edward',
    balance: '$12,450',
    expiry: '12/29',
    status: 'Active',
    color: 'amber'
  }
];

export const servicesData = {
  kpis: [
    {
      id: 'skpi-1',
      title: 'Life Insurance',
      subtitle: 'Unlimited protection',
      icon: 'shield-heart',
      color: 'blue'
    },
    {
      id: 'skpi-2',
      title: 'Shopping',
      subtitle: 'Buy. Think. Grow.',
      icon: 'shopping-bag',
      color: 'amber'
    },
    {
      id: 'skpi-3',
      title: 'Safety',
      subtitle: 'We are your allies',
      icon: 'safety',
      color: 'teal'
    }
  ],
  servicesList: [
    {
      id: 'bs-1',
      title: 'Business loans',
      subtitle: 'It is a long established',
      col1: 'Lorem Ipsum',
      col1Sub: 'Many publishing',
      col2: 'Lorem Ipsum',
      col2Sub: 'Many publishing',
      col3: 'Lorem Ipsum',
      col3Sub: 'Many publishing',
      icon: 'hand-coins',
      color: 'pink'
    },
    {
      id: 'bs-2',
      title: 'Checking accounts',
      subtitle: 'It is a long established',
      col1: 'Lorem Ipsum',
      col1Sub: 'Many publishing',
      col2: 'Lorem Ipsum',
      col2Sub: 'Many publishing',
      col3: 'Lorem Ipsum',
      col3Sub: 'Many publishing',
      icon: 'briefcase',
      color: 'amber'
    },
    {
      id: 'bs-3',
      title: 'Savings accounts',
      subtitle: 'It is a long established',
      col1: 'Lorem Ipsum',
      col1Sub: 'Many publishing',
      col2: 'Lorem Ipsum',
      col2Sub: 'Many publishing',
      col3: 'Lorem Ipsum',
      col3Sub: 'Many publishing',
      icon: 'bar-chart',
      color: 'pink'
    },
    {
      id: 'bs-4',
      title: 'Debit and credit cards',
      subtitle: 'It is a long established',
      col1: 'Lorem Ipsum',
      col1Sub: 'Many publishing',
      col2: 'Lorem Ipsum',
      col2Sub: 'Many publishing',
      col3: 'Lorem Ipsum',
      col3Sub: 'Many publishing',
      icon: 'user',
      color: 'blue'
    },
    {
      id: 'bs-5',
      title: 'Life Insurance',
      subtitle: 'It is a long established',
      col1: 'Lorem Ipsum',
      col1Sub: 'Many publishing',
      col2: 'Lorem Ipsum',
      col2Sub: 'Many publishing',
      col3: 'Lorem Ipsum',
      col3Sub: 'Many publishing',
      icon: 'safety',
      color: 'teal'
    },
    {
      id: 'bs-6',
      title: 'Business loans',
      subtitle: 'It is a long established',
      col1: 'Lorem Ipsum',
      col1Sub: 'Many publishing',
      col2: 'Lorem Ipsum',
      col2Sub: 'Many publishing',
      col3: 'Lorem Ipsum',
      col3Sub: 'Many publishing',
      icon: 'hand-coins',
      color: 'pink'
    }
  ]
};

export const loansData = [
  {
    id: '01',
    slNo: '01.',
    loanMoney: 100000,
    leftToRepay: 40500,
    duration: '8 Months',
    interestRate: '12%',
    installment: '$2,000 / month',
    installmentAmount: 2000,
    isPrimary: true
  },
  {
    id: '02',
    slNo: '02.',
    loanMoney: 500000,
    leftToRepay: 250000,
    duration: '36 Months',
    interestRate: '10%',
    installment: '$8,000 / month',
    installmentAmount: 8000,
    isPrimary: false
  },
  {
    id: '03',
    slNo: '03.',
    loanMoney: 900000,
    leftToRepay: 40500,
    duration: '12 Months',
    interestRate: '12%',
    installment: '$5,000 / month',
    installmentAmount: 5000,
    isPrimary: false
  },
  {
    id: '04',
    slNo: '04.',
    loanMoney: 50000,
    leftToRepay: 40500,
    duration: '25 Months',
    interestRate: '5%',
    installment: '$2,000 / month',
    installmentAmount: 2000,
    isPrimary: false
  },
  {
    id: '05',
    slNo: '05.',
    loanMoney: 50000,
    leftToRepay: 40500,
    duration: '5 Months',
    interestRate: '16%',
    installment: '$10,000 / month',
    installmentAmount: 10000,
    isPrimary: false
  },
  {
    id: '06',
    slNo: '06.',
    loanMoney: 80000,
    leftToRepay: 25500,
    duration: '14 Months',
    interestRate: '8%',
    installment: '$2,000 / month',
    installmentAmount: 2000,
    isPrimary: false
  },
  {
    id: '07',
    slNo: '07.',
    loanMoney: 12000,
    leftToRepay: 5500,
    duration: '9 Months',
    interestRate: '13%',
    installment: '$500 / month',
    installmentAmount: 500,
    isPrimary: false
  },
  {
    id: '08',
    slNo: '08.',
    loanMoney: 160000,
    leftToRepay: 100800,
    duration: '3 Months',
    interestRate: '12%',
    installment: '$900 / month',
    installmentAmount: 900,
    isPrimary: false
  }
];

export const privilegesData = {
  tier: 'Platinum Executive',
  points: 24850,
  nextTierPoints: 30000,
  benefits: [
    { title: 'VIP Airport Lounge Access', desc: 'Unlimited global access to 1,400+ priority lounges.', icon: 'plane' },
    { title: '24/7 Global Concierge', desc: 'Personal travel and dining booking specialist anytime.', icon: 'phone' },
    { title: 'Zero FX Fees Worldwide', desc: 'Exchange currencies at true interbank spot rate.', icon: 'globe' },
    { title: '5% Cashback on Travel & Dining', desc: 'Direct credit back into your primary account.', icon: 'percent' }
  ],
  offers: [
    { id: 'off-1', title: 'Luxury Hotel Upgrade', points: 5000, merchant: 'Four Seasons', discount: 'Free Suite Upgrade' },
    { id: 'off-2', title: 'Aviation Miles Transfer', points: 10000, merchant: 'Delta / Emirates', discount: '15,000 SkyMiles' },
    { id: 'off-3', title: 'Tech Hardware Voucher', points: 8000, merchant: 'Apple Store', discount: '$150 Gift Card' }
  ]
};

export const notificationsList = [
  {
    id: 'notif-1',
    title: 'Deposit Received',
    desc: 'You received $5,400 from Jemi Wilson',
    time: '21 Jan, 10.40 PM',
    unread: true,
    type: 'income'
  },
  {
    id: 'notif-2',
    title: 'PayPal Deposit',
    desc: 'Deposit of $2,500 from PayPal processed successfully',
    time: '25 Jan, 10.40 PM',
    unread: true,
    type: 'income'
  },
  {
    id: 'notif-3',
    title: 'Card Payment',
    desc: 'Deposit from my Card -$850 completed',
    time: '28 Jan, 12.30 AM',
    unread: false,
    type: 'card'
  }
];
