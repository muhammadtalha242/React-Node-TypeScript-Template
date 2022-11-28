import React from 'react';
import { RouteComponentProps } from 'react-router';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { DashboardMainContainerContainer, DashboardContentContainer } from '../components/container';

import { sidebar } from '../styles/constants';

export interface IWrappedComponentProps extends RouteComponentProps {}

interface State {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const withDashboardLayout = (WrappedComponent: React.ComponentType<any>): React.ComponentType<IWrappedComponentProps> => {
  return class extends React.Component<IWrappedComponentProps, State> {
    state = { isSidebarCollapsed: false, isDarkMode: false };

    onSidebarStateChange = (collapsed: boolean) => {
      this.setState({ isSidebarCollapsed: collapsed });
    };

    render() {
      const { isSidebarCollapsed, isDarkMode } = this.state;
      const sidebarWidth = isSidebarCollapsed ? sidebar.collapsed.width : sidebar.width;
      return (
        <>
          <Sidebar collapsed={isSidebarCollapsed} onSidebarStateChange={this.onSidebarStateChange} />
          <DashboardMainContainerContainer sidebarWidth={sidebarWidth}>
            <Topbar isDarkMode={isDarkMode} isSidebarCollapsed={isSidebarCollapsed} onSidebarStateChange={this.onSidebarStateChange} />
            <DashboardContentContainer>
              <WrappedComponent {...this.props} />
            </DashboardContentContainer>
          </DashboardMainContainerContainer>
        </>
      );
    }
  };
};

export default withDashboardLayout;
