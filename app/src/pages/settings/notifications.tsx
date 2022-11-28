import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { NotificationSettingsContainer } from '../../components/container';

import NotificationSettings from '../../components/Settings/Notifications';

class Dashboard extends React.Component {
  render() {
    return (
      <NotificationSettingsContainer>
        <NotificationSettings />
      </NotificationSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
