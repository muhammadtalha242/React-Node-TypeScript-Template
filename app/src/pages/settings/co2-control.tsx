import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { Co2ControlSettingsContainer } from '../../components/container';

import Co2ControlSettings from '../../components/Settings/Co2Control';

class Dashboard extends React.Component {
  render() {
    return (
      <Co2ControlSettingsContainer>
        <Co2ControlSettings />
      </Co2ControlSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
