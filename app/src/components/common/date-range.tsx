import React, { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { DatePicker } from 'antd';
import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

const { RangePicker } = DatePicker;

interface Props {
  label?: string;
  value?: any;
  setValue?: Function;
  placeholder?: [string, string];
  name?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
}

const DateRangeContainer = styled.div<{ marginBottom: number | undefined }>`
  margin-bottom: ${(props) => (props.marginBottom || props.marginBottom === 0 ? props.marginBottom : 32)}px;
  font-size: 14px;

  .date-range {
    border: 1px solid ${GREY_PRIMARY};
    border-radius: 8px;
    height: 48px;
    width: 100%;
    padding: 12px;
    outline: none;
    color: ${GREY_SECONDARY};

    &:focus {
      border: 1px solid ${GREEN_PRIMARY};
    }

    &.error {
      border: 1px solid ${RED_PRIMARY};
    }
  }

  .error-message {
    position: absolute;
    color: ${RED_PRIMARY};
    margin-top: 4px;
    font-size: 12px;
  }
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const CustomDateTimePicker: React.FC<Props> = (props) => {
  const onChange = (date: any, dateString: [string, string]): void => {
    if (props.setValue) props.setValue({ name: props.name, value: date });
  };

  return (
    <DateRangeContainer marginBottom={props.marginBottom}>
      <div className={classNames({ error: props.error })}>
        <RangePicker className="date-range" showTime onChange={onChange} placeholder={props.placeholder} name={props.name} />
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </DateRangeContainer>
  );
};

export default CustomDateTimePicker;
