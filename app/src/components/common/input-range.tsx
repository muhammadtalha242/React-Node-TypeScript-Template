import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { GREY_PRIMARY, GREY_SEPTENARY, GREEN_PRIMARY, WHITE, GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

interface Props {
  label?: string;
  min: string;
  max: string;
  defaultValue?: number;
  value?: any;
  setValue?: Function;
  name?: string;
  linkLabel?: string;
  link?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
}

const InputFieldContainer = styled.div<{ marginBottom: number | undefined }>`
  margin-bottom: ${(props) => (props.marginBottom || props.marginBottom === 0 ? props.marginBottom : 32)}px;
  font-size: 14px;

  .label-container {
    display: flex;
    justify-content: space-between;
    a {
      color: ${GREEN_PRIMARY};
    }
  }

  input {
    width: 100%;
    background: ${GREY_SEPTENARY};
    border-radius: 8px;
    height: 8px;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;

    &.error {
      border: 1px solid ${RED_PRIMARY};
    }
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 3px solid ${GREEN_PRIMARY};
    border-radius: 50%;
    height: 16px;
    width: 16px;
    background: ${WHITE};
    box-sizing: border-box;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
  }

  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    border: 3px solid ${GREEN_PRIMARY};
    border-radius: 50%;
    height: 16px;
    width: 16px;
    background: ${WHITE};
    box-sizing: border-box;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
  }

  .error-message {
    position: absolute;
    color: ${RED_PRIMARY};
    margin-top: 4px;
    font-size: 12px;
  }
  .min-max {
    display: flex;
    justify-content: space-between;
    color: ${GREY_PRIMARY};
    letter-spacing: 0.05em;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.05em;
    margin-top: 4px;
  }
`;

const CurrentValue = styled.div`
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREEN_PRIMARY};
`;
export const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const InputRange: React.FC<Props> = (props) => {
  const [currentValue, setcurrentValue] = useState(props.defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setcurrentValue(e.target.valueAsNumber);
    if (props.setValue) props.setValue({ name: props.name, value: (e.target as HTMLInputElement).value });
  };

  return (
    <InputFieldContainer marginBottom={props.marginBottom}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div>
        <CurrentValue>{currentValue} %</CurrentValue>
        <input type="range" min={props.min} max={props.max} defaultValue={currentValue} onChange={onChange} className={classNames({ error: props.error })} name={props.name} />
        <div className="min-max">
          <span>{props.min} %</span>
          <span>{props.max} %</span>
        </div>
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </InputFieldContainer>
  );
};

export default InputRange;
