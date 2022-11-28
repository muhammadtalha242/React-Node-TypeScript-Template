import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import { ReportsContainer } from '../components/container';
import Reports from '../components/Reports';

class Report extends React.Component {
  render() {
    return (
      <ReportsContainer>
        <Reports />
      </ReportsContainer>
    );
  }
}

export default withDashboardLayout(Report);
