import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { FertigationControlSettingsContainer } from '../../components/container';

import FertigationControlSettings from '../../components/Settings/FertigationControl';

class Dashboard extends React.Component {
  render() {
    return (
      <FertigationControlSettingsContainer>
        <FertigationControlSettings />
      </FertigationControlSettingsContainer>
    );
  }
}

export default withDashboardLayout(Dashboard);
