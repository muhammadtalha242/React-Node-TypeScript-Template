import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { AccessControlSettingsContainer } from '../../components/container';

import AccessControl from '../../components/Settings/AccessControl';

class DashBoard extends React.Component {
  render() {
    return (
      <AccessControlSettingsContainer>
        <AccessControl />
      </AccessControlSettingsContainer>
    );
  }
}
export default withDashboardLayout(DashBoard);
