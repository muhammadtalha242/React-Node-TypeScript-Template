import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { OrganizationSettingsContainer } from '../../components/container';

import OrganizationSettings from '../../components/Settings/Organization';

class Dashboard extends React.Component {
  render() {
    return (
      <OrganizationSettingsContainer>
        <OrganizationSettings />
      </OrganizationSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
