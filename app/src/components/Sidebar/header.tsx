import React from 'react';

import { SidebarHeaderContainer } from './container';

interface Props {
  collapsed: boolean;
}

const SidebarHeader: React.FC<Props> = (props) => {
  const { collapsed } = props;
  return (
    <SidebarHeaderContainer collapsed={collapsed}>
      <img src={`/images/icons/${collapsed ? 'logo' : 'scimetic'}.svg`} alt="logo" />
      {!collapsed && <img src="/images/icons/pin.svg" alt="pin" />}
    </SidebarHeaderContainer>
  );
};

export default SidebarHeader;
