import styled from 'styled-components';

import { GREEN_PRIMARY, GREY_PRIMARY, GREY_QUATERNARY, GREY_QUINARY, GREY_SECONDARY, GREY_SENARY, NAVY_PRIMARY, WHITE } from '../../styles/colors';

import { topbar } from '../../styles/constants';

export const TopbarContainer = styled.div`
  height: 56px;
  margin: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburger {
    cursor: pointer;
  }
`;

export const ModeControllerContainer = styled.div``;

export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  .identity {
    width: 212px;
    margin-right: 12px;
    text-align: right;

    .name {
      font-weight: 500;
      color: ${NAVY_PRIMARY};
      font-size: 18px;
      line-height: 27px;
    }

    .role {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      color: ${GREY_SECONDARY};
    }
  }
`;

export const NotificationsDetailsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NotificationsContentContainer = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  width: ${topbar.notificationsPopoverWidth}px;
`;

export const NotificationsContentHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .header {
    font-size: ;
  }
`;

export const NotificationsContentFooterContainer = styled.div`
  text-align: center;
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;

  img {
    margin-right: 8px;
  }

  .active {
    color: ${GREEN_PRIMARY};
  }

  .deactive {
    color: ${GREY_PRIMARY};
  }
`;

export const NotificationsListContainer = styled.div``;

export const NotificationContainer = styled.div`
  margin: 0 8px 8px 8px;
  padding: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  background: ${WHITE};

  &:last-child {
    margin-bottom: 0;
  }

  &.read {
    background: ${GREY_QUATERNARY};
    box-shadow: none;
  }

  .details-container {
    display: flex;
    align-items: center;

    .details {
      margin-left: 8px;

      .name {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
      }

      .subtext {
        color: ${GREY_QUINARY};
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;

        a {
          color: ${GREEN_PRIMARY};
        }
      }
    }
  }

  .time {
    color: ${GREY_SENARY};
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
  }
`;
