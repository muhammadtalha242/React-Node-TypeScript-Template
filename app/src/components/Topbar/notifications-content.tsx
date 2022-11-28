import React from 'react';

import Notification from './notification';
import { NotificationsContentContainer, NotificationsContentFooterContainer, NotificationsContentHeaderContainer, NotificationsListContainer } from './container';

interface Props {
  showNotificationsChange: (show: boolean) => void;
}

export interface NotificationItem {
  isGroup: boolean;
  notifier?: {
    name: string;
    profileImage: string;
  };
  group?: {
    name: string;
    profileImages: string[];
  };
  isRead: boolean;
  time: string;
  link: string;
  type: 'task' | 'message' | 'messages';
}

const mockNotificationsData: NotificationItem[] = [
  {
    isGroup: false,
    notifier: {
      name: 'Alissa Mathew',
      profileImage: '/images/icons/profile02.png',
    },
    isRead: false,
    time: '1m',
    link: '/message',
    type: 'message',
  },
  {
    isGroup: false,
    notifier: {
      name: 'Andrew Johnson',
      profileImage: '/images/icons/profile02.png',
    },
    isRead: true,
    time: '4m',
    link: '/message',
    type: 'task',
  },
  {
    isGroup: false,
    notifier: {
      name: 'Kate Morgan',
      profileImage: '/images/icons/profile02.png',
    },
    isRead: true,
    time: '1h',
    link: '/message',
    type: 'messages',
  },
];

const NotificationsContent: React.FC<Props> = (props) => {
  const allRead = false;
  return (
    <NotificationsContentContainer>
      <NotificationsContentHeaderContainer>
        <div className="header">Notifications</div>
        <img onClick={() => props.showNotificationsChange(false)} src={`/images/icons/close.svg`} alt="close" />
      </NotificationsContentHeaderContainer>
      <NotificationsListContainer>
        {mockNotificationsData.map((notification) => {
          return <Notification notification={notification} />;
        })}
      </NotificationsListContainer>
      <NotificationsContentFooterContainer>
        <img src={`/images/icons/${allRead ? 'deactive' : 'active'}/checked.svg`} alt="" />
        {!allRead && <span className="active">Mark all as read</span>}
        {allRead && <span className="deactive">All read</span>}
      </NotificationsContentFooterContainer>
    </NotificationsContentContainer>
  );
};

export default NotificationsContent;
