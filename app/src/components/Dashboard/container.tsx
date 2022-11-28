import styled from 'styled-components';

import { GREEN_PRIMARY, GREY_PRIMARY, GREY_SECONDARY, GREY_TERIARY, WHITE } from '../../styles/colors';

export const GrowspaceContainer = styled.div``;

export const GrowspaceListContainer = styled.div``;

export const GrowspaceListHeaderContainer = styled.div`
  padding: 12px 16px 4px 16px;
  display: inline-flex;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: ${GREY_PRIMARY};
  width: 100%;

  .name {
    width: 24%;
  }

  .temperature {
    width: 19%;
  }

  .humidity {
    width: 19%;
  }

  .co2 {
    width: 19%;
  }

  .vpd {
    width: 19%;
  }
`;

export const GrowspaceItemContainer = styled.div`
  padding: 12px 16px;
  background: ${WHITE};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  margin-bottom: 16px;
  cursor: pointer;

  .row {
    line-height: 24px;
    display: inline-flex;
    width: 100%;
    font-weight: 600;

    .name {
      width: 24%;
      font-weight: 500;
      color: ${GREEN_PRIMARY};
    }

    .temperature {
      width: 19%;
    }

    .humidity {
      width: 19%;
    }

    .co2 {
      width: 19%;
    }

    .vpd {
      width: 19%;
    }

    .description {
      color: ${GREY_TERIARY};
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

export const GrowspaceFormContainer = styled.div`
  background: ${WHITE};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 12px 16px 16px 16px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .text {
      font-weight: bold;
      font-size: 18px;
      color: ${GREY_PRIMARY};
    }
  }

  .form {
    .flex {
      display: flex;
    }

    .space-between {
      justify-content: space-between;
    }

    .left-col {
      width: 24%;
    }

    .right-col {
      width: 74%;
    }

    .field {
      margin-bottom: 16px;

      .label {
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
        letter-spacing: 0.05em;
        color: ${GREY_SECONDARY};
      }

      input {
        border: 1px solid ${GREY_PRIMARY};
        border-radius: 8px;
        height: 48px;
        width: 100%;
        padding: 16px 12px;
        outline: none;

        &:focus {
          border-color: ${GREEN_PRIMARY};
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }
`;
