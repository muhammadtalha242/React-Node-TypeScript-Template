import React, { useContext, useState } from 'react';
import { Badge, Popover, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import jsCookie from 'js-cookie';

import * as authActions from '../../context/auth.context';
import { AuthContext } from '../../context/auth.context';
import NotificationsContent from './notifications-content';
import { NotificationsDetailsContainer, DetailsContainer } from './container';
import { GREY_QUINARY } from '../../styles/colors';

interface NotificationsProps {}

const NotificationsBadge = styled(Badge)`
  height: 24px;
  width: 24px;
`;

const NotificationsPopover = styled(Popover)`
  .ant-popover-inner {
    border-radius: 16px !important;
  }
`;

const MenuPopover = styled(Menu)`
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);

  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 12px;
    color: ${GREY_QUINARY};
  }
`;

const NotificationsDetails: React.FC<NotificationsProps> = (props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const MenuOverlay = () => {
    const onLogout = () => {
      jsCookie.remove('accessToken');
      jsCookie.remove('idToken');
      authActions.setToken(authDispatch)({
        accessToken: '',
        idToken: '',
        isAuthenticated: false,
      });
    };

    return (
      <MenuPopover>
        <Menu.Item onClick={onLogout}>
          <div>
            <img src={'/images/icons/logout.svg'} alt="logout" /> <span>Log Out</span>
          </div>
        </Menu.Item>
      </MenuPopover>
    );
  };

  return (
    <NotificationsDetailsContainer>
      <NotificationsPopover
        content={<NotificationsContent showNotificationsChange={setShowNotifications} />}
        trigger="click"
        visible={showNotifications}
        onVisibleChange={setShowNotifications}
        overlayStyle={{ borderRadius: '16px' }}
      >
        <div>
          <NotificationsBadge count={23} size="small">
            <img src={`/images/icons/notifications.svg`} alt="notifications" />
          </NotificationsBadge>
        </div>
      </NotificationsPopover>
      <Dropdown placement="bottomRight" overlay={MenuOverlay}>
        <DetailsContainer>
          <div className="identity">
            <div className="name">Nathan Brackett</div>
            <div className="role">Admin</div>
          </div>
          <img width={56} height={56} src={`/images/icons/profile01.png`} alt="profile" />
        </DetailsContainer>
      </Dropdown>
    </NotificationsDetailsContainer>
  );
};

export default NotificationsDetails;
