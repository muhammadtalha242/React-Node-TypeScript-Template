import styled from 'styled-components';

import { GREEN_PRIMARY, GREY_PRIMARY, NAVY_PRIMARY, WHITE } from '../styles/colors';

interface DashboardMainContainerProps {
  sidebarWidth: number;
}

export const AppContainer = styled.div``;

export const DashboardContainer = styled.div``;

export const OverviewContainer = styled.div``;

export const GrowsheetsContainer = styled.div``;

export const ReportsContainer = styled.div``;

export const ProfileSettingsContainer = styled.div``;

export const OrganizationSettingsContainer = styled.div``;

export const DashboardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .left-col {
    display: flex;
    align-items: center;

    .header-text {
      margin: 0 16px 0 0;
      font-weight: bold;
      font-size: 28px;
      line-height: 42px;
      color: ${NAVY_PRIMARY};
    }
  }

  .right-col {
    display: flex;
    align-items: center;
    font-weight: 500;

    .date {
      font-size: 16px;
      margin-right: 16px;
    }

    .time {
      font-size: 28px;
      line-height: 42px;
      color: ${GREEN_PRIMARY};
    }
  }
`;

export const DashboardMainContainerContainer = styled.div<DashboardMainContainerProps>`
  margin-left: ${(props) => `${props.sidebarWidth}px`};
`;

export const DashboardContentContainer = styled.div`
  margin: 8px 32px;
`;

export const AuthFormContainer = styled.div`
  text-align: center;
  .content {
    padding: 32px;
    background: ${WHITE};
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin: 0 auto;
    width: 560px;
    text-align: center;

    .heading {
      font-size: 28px;
      line-height: 42px;
      color: ${NAVY_PRIMARY};
      font-weight: bold;
    }

    .sub-heading {
      margin-top: 8px;
      font-size: 14px;
      line-height: 21px;
      color: ${NAVY_PRIMARY};

      .green {
        color: ${GREEN_PRIMARY};
      }
    }

    .form-container {
      text-align: left;

      .verify-input-container {
        text-align: center;
        display: flex;
        justify-content: space-between;
        width: 420px;
        margin: 0 auto;
        margin-bottom: 28px;

        input {
          width: 48px;
          height: 48px;
          border: 1px solid ${GREY_PRIMARY};
          border-radius: 8px;
          text-align: center;
        }
      }
    }
  }
`;

export const AccessControlSettingsContainer = styled.div``;

export const NotificationSettingsContainer = styled.div``;

export const Co2ControlSettingsContainer = styled.div``;

export const TemperatureControlSettingsContainer = styled.div``;

export const IrrigationControlSettingsContainer = styled.div``;

export const HumidityControlContainer = styled.div``;

export const LightingControlSettingsContainer = styled.div``;

export const FertigationControlSettingsContainer = styled.div``;
