import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { TemperatureControlSettingsContainer } from '../../components/container';

import TemperatureControlSettings from '../../components/Settings/Temperature';

class Dashboard extends React.Component {
  render() {
    return (
      <TemperatureControlSettingsContainer>
        <TemperatureControlSettings />
      </TemperatureControlSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
