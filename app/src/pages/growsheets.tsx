import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import Growsheets from '../components/Growsheets';

import { GrowsheetsContainer } from '../components/container';

class Growsheet extends React.Component {
  render() {
    return (
      <GrowsheetsContainer>
        <Growsheets />
      </GrowsheetsContainer>
    );
  }
}

export default withDashboardLayout(Growsheet);
