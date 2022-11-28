import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { DashboardContainer } from '../../components/container';
import DeviceSetup from '../../components/Settings/Device';

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardContainer>
        <DeviceSetup />
      </DashboardContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
