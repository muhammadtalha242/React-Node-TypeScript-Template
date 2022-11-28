import React from 'react';

import withDashboardLayout from '../../higher-order-components/with-dashboard-layout';
import { IrrigationControlSettingsContainer } from '../../components/container';

import IrrigationControl from '../../components/Settings/IrrigationControl';

class DashBoard extends React.Component {
  render() {
    return (
      <IrrigationControlSettingsContainer>
        <IrrigationControl />
      </IrrigationControlSettingsContainer>
    );
  }
}
export default withDashboardLayout(DashBoard);
