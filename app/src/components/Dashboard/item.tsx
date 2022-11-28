import React from 'react';
import { IGrowspaceResponse } from '../../context/growspace.context';

import { GrowspaceItemContainer } from './container';

interface Props {
  growspace: IGrowspaceResponse;
}

const GrowspaceItem: React.FC<Props> = (props) => {
  const { name, description, climate } = props.growspace;
  const { co2, temperature, humidity, vpd } = climate || {};
  return (
    <GrowspaceItemContainer>
      <div className="row">
        <div className="name">{name}</div>
        <div className="temperature">
          {temperature ? temperature : '-'} <span>&#176;</span> C
        </div>
        <div className="humidity">{humidity ? humidity : '-'} %</div>
        <div className="co2">{co2 ? co2 : '-'} ppm</div>
        <div className="vpd">{vpd ? vpd : '-'} kPa</div>
      </div>
      <div className="description">{description}</div>
    </GrowspaceItemContainer>
  );
};

export default GrowspaceItem;
