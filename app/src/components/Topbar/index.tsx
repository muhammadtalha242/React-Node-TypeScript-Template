import React from 'react';

import { TopbarContainer } from './container';
import ModeController from './mode-controller';
import Notifications from './notifications';

interface Props {
  onSidebarStateChange: (collapsed: boolean) => void;
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
}

class Topbar extends React.Component<Props> {
  render() {
    const { isDarkMode, isSidebarCollapsed, onSidebarStateChange } = this.props;
    return (
      <TopbarContainer>
        <img className="hamburger" onClick={() => onSidebarStateChange(!isSidebarCollapsed)} src={`/images/icons/menu.svg`} alt="menu" />
        <ModeController isDarkMode={isDarkMode} />
        <Notifications />
      </TopbarContainer>
    );
  }
}

export default Topbar;
