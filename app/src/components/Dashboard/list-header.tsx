import React from 'react';

import { GrowspaceListHeaderContainer } from './container';

interface Props {}

const GrowspaceListHeader: React.FC<Props> = (props) => {
  return (
    <GrowspaceListHeaderContainer>
      <div className="name">Name</div>
      <div className="temperature">Temperature</div>
      <div className="humidity">Humidity</div>
      <div className="co2">CO2</div>
      <div className="vpd">VPD</div>
    </GrowspaceListHeaderContainer>
  );
};

export default GrowspaceListHeader;
