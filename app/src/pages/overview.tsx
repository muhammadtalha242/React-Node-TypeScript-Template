import React from 'react';
import { RouteComponentProps } from 'react-router';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import Overview from '../components/Overview';
import { OverviewContainer } from '../components/container';

interface Props extends RouteComponentProps<{ growspaceId: string }> {}

const Dashboard: React.FC<Props> = (props) => {
  return (
    <OverviewContainer>
      <Overview {...props} />
    </OverviewContainer>
  );
};

export default withDashboardLayout(Dashboard);
