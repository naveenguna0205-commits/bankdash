import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './components/pages/DashboardPage';
import { TransactionsPage } from './components/pages/TransactionsPage';
import { AccountsPage } from './components/pages/AccountsPage';
import { InvestmentsPage } from './components/pages/InvestmentsPage';
import { CreditCardsPage } from './components/pages/CreditCardsPage';
import { LoansPage } from './components/pages/LoansPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PrivilegesPage } from './components/pages/PrivilegesPage';
import { SettingPage } from './components/pages/SettingPage';

const MainContent = () => {
  const { currentTab } = useApp();

  switch (currentTab) {
    case 'Dashboard':
      return <DashboardPage />;
    case 'Transactions':
      return <TransactionsPage />;
    case 'Accounts':
      return <AccountsPage />;
    case 'Investments':
      return <InvestmentsPage />;
    case 'Credit Cards':
      return <CreditCardsPage />;
    case 'Loans':
      return <LoansPage />;
    case 'Services':
      return <ServicesPage />;
    case 'My Privileges':
      return <PrivilegesPage />;
    case 'Setting':
      return <SettingPage />;
    default:
      return <DashboardPage />;
  }
};

export function App() {
  return (
    <AppProvider>
      <Layout>
        <MainContent />
      </Layout>
    </AppProvider>
  );
}

export default App;
