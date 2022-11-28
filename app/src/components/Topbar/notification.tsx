import React from 'react';
import classNames from 'classnames';

import { NotificationContainer } from './container';
import { NotificationItem } from './notifications-content';

interface Props {
  notification: NotificationItem;
}

interface TypeToSubtextMapItem {
  subText: string;
  linkText: string;
}

interface TypeToSubtextMap {
  task: TypeToSubtextMapItem;
  message: TypeToSubtextMapItem;
  messages: TypeToSubtextMapItem;
}

const typeToSubtextMap: TypeToSubtextMap = {
  task: {
    subText: 'Assigned to you a new ',
    linkText: 'task',
  },
  message: {
    subText: 'Sent you a ',
    linkText: 'message',
  },
  messages: {
    subText: 'Sent you a ',
    linkText: 'message',
  },
};

const Notification: React.FC<Props> = (props) => {
  const { notification } = props;
  const subTextMap = typeToSubtextMap[notification.type];
  return (
    <NotificationContainer className={classNames({ read: notification.isRead })}>
      <div className="details-container">
        {notification.notifier && <img className="image" src={notification.notifier.profileImage} alt="profile" />}
        <div className="details">
          {notification.notifier && <div className="name">{notification.notifier.name}</div>}
          {notification.group && <div className="name">{notification.group.name}</div>}
          <div className="subtext">
            {subTextMap.subText} <a href={notification.link}>{subTextMap.linkText}</a>
          </div>
        </div>
      </div>
      <div className="time">{notification.time}</div>
    </NotificationContainer>
  );
};

export default Notification;
