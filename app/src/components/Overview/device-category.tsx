import React from 'react';

import { DeviceCategoryContainer } from './container';
import Status from '../common/status';

interface Props {
  category: IDeviceCategory;
}

export interface IDeviceCategory {
  categoryName: string;
  online: number;
  offline: number;
}

const DeviceCategory: React.FC<Props> = ({ category }) => {
  const { categoryName, online, offline } = category;
  return (
    <DeviceCategoryContainer>
      <div className="w-25 name">{categoryName}</div>
      <div className="w-25 flex">
        <Status color="green" value={online} />
      </div>
      <div className="w-25 flex">
        <Status color="red" value={offline} />
      </div>
      <div className="w-25 orange flex">
        <img className="mr-10" src={`/images/icons/warning.svg`} alt="" />
        Check
        <img className="ml-10" src={`/images/icons/chevron-right.svg`} alt="" />
      </div>
    </DeviceCategoryContainer>
  );
};

export default DeviceCategory;
