import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { ProfileSettingsContainer } from '../../components/container';

import ProfileSettings from '../../components/Settings/Profile';

class Dashboard extends React.Component {
  render() {
    return (
      <ProfileSettingsContainer>
        <ProfileSettings />
      </ProfileSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
