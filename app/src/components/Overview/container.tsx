import styled from 'styled-components';

import { NAVY_PRIMARY, GREY_QUINARY, GREEN_PRIMARY, GREY_QUATERNARY, RED_PRIMARY, WHITE, ORANGE_SECONDARY } from '../../styles/colors';

interface MetricContainerProps {
  width?: number | string;
  height?: number | string;
  expanded?: boolean;
}

export const OverviewContainer = styled.div``;

export const OverviewContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const MetricContainer = styled.div<MetricContainerProps>`
  background: ${WHITE};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  width: ${(props) => props.width || '24%'};
  height: ${(props) => props.height || '272px'};
  margin-bottom: 16px;

  .content {
    padding: 12px 16px;

    > .value {
      font-weight: 500;
      font-size: 56px;
      margin-bottom: 12px;

      .unit {
        font-weight: 500;
        font-size: 24px;
      }
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }

  .title {
    font-weight: 500;
    font-size: 18px;
    color: ${NAVY_PRIMARY};
    margin-bottom: 12px;
  }

  .half {
    width: 50%;
  }

  .links {
    display: flex;
    margin-bottom: 12px;

    .link {
      margin-right: 12px;
      font-size: 16px;
      color: ;
      font-weight: 500;
      border-bottom: 1px solid ${GREY_QUINARY};

      &.active {
        color: ${NAVY_PRIMARY};
        font-weight: 600;
        border-bottom: 1px solid ${GREY_QUINARY};
      }
    }
  }

  .meta-name {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: ${GREEN_PRIMARY};
  }

  .small-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  .details {
    background: ${GREY_QUATERNARY};
    padding: 12px;
    border-radius: 12px;
    margin-top: 12px;

    .name {
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      margin-bottom: 12px;
    }

    .field {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 21px;
      margin-bottom: 16px;

      &:last-of-type {
        margin-bottom: 0;
      }

      .col-1 {
        color: ${GREY_QUINARY};
      }

      .col-2 {
        color: ${NAVY_PRIMARY};

        &.red {
          color: ${RED_PRIMARY};
        }
      }
    }
  }
`;

export const DeviceCategoryContainer = styled.div`
  background: ${GREY_QUATERNARY};
  border-radius: 12px;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 12px;

  .w-25 {
    width: 25%;
  }

  .name {
    font-weight: 600;
    font-size: 18px;
    color: ${NAVY_PRIMARY};
  }

  .orange {
    color: ${ORANGE_SECONDARY};
  }

  .mr-10 {
    margin-right: 10px;
  }

  .ml-10 {
    margin-left: 10px;
  }
`;
