import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { HumidityControlContainer } from '../../components/container';

import HumidityControlSettings from '../../components/Settings/HumidityControl';

class Dashboard extends React.Component {
  render() {
    return (
      <HumidityControlContainer>
        <HumidityControlSettings />
      </HumidityControlContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
