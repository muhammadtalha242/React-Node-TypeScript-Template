import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { LightingControlSettingsContainer } from '../../components/container';

import LightingControlSettings from '../../components/Settings/LightingControl';

class Dashboard extends React.Component {
  render() {
    return (
      <LightingControlSettingsContainer>
        <LightingControlSettings />
      </LightingControlSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
