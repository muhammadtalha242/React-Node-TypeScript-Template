import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import { DashboardContainer } from '../components/container';
import Dashboard from '../components/Dashboard';

interface Props {}

const HomePage: React.FC<Props> = (props) => {
  return (
    <DashboardContainer>
      <Dashboard />
    </DashboardContainer>
  );
};

export default withDashboardLayout(HomePage);
