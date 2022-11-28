import React from 'react';
import { useLocation } from 'react-router-dom';

import { SidebarContainer } from './container';
import SidebarHeader from './header';
import SidebarList from './list';

interface Props {
  collapsed: boolean;
  onSidebarStateChange: (collapsed: boolean) => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const location = useLocation();
  const { collapsed } = props;
  return (
    <SidebarContainer
      // onMouseEnter={() => onSidebarStateChange(false)}
      // onMouseLeave={() => onSidebarStateChange(true)}
      collapsed={collapsed}
    >
      <SidebarHeader collapsed={collapsed} />
      <SidebarList collapsed={collapsed} activeLink={location.pathname} />
    </SidebarContainer>
  );
};

export default Sidebar;
