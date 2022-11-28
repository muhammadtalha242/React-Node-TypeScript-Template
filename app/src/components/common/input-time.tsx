import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

interface Props {
  label?: string;
  value?: any;
  setValue?: Function;
  placeholder?: string;
  name?: string;
  linkLabel?: string;
  link?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
}

const InputTimeContainer = styled.div<{ marginBottom: number | undefined }>`
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
    border: 1px solid ${GREY_PRIMARY};
    border-radius: 8px;
    height: 48px;
    width: 48px;
    padding: 1px 1px;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.02em;
    text-align: center;
    outline: none;
    color: ${GREY_SECONDARY};

    &:focus {
      border: 1px solid ${GREEN_PRIMARY};
    }

    &.error {
      border: 1px solid ${RED_PRIMARY};
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  span {
    margin: 4px;
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

const InputTime: React.FC<Props> = (props) => {
  const [minutes, setMinutes] = useState<string | number>('00');
  const [hours, setHours] = useState<string | number>('00');
  function imposeMinMax(el: React.ChangeEvent<HTMLInputElement>): void {
    if (el.target.value !== '') {
      if (parseInt(el.target.value) < parseInt(el.target.min)) {
        el.target.value = el.target.min;
      }
      if (parseInt(el.target.value) > parseInt(el.target.max)) {
        el.target.value = el.target.max;
      }
      if (el.target.value.length > el.target.size) {
        el.target.value = el.target.min;
      }
    }
  }

  useEffect(() => {
    if (props.value) {
      const splitted = props.value.split(':');
      setHours(splitted[0]);
      setMinutes(splitted[1]);
    }
  }, [props.value]);

  const onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let minutes;
    if (parseInt(e.target.value) < parseInt(e.target.min)) {
      minutes = e.target.min;
    } else if (parseInt(e.target.value) > parseInt(e.target.max)) {
      minutes = e.target.max;
    } else {
      minutes = e.target.value;
    }
    if (props.setValue) props.setValue(props.name, `${hours}:${minutes}`);
  };

  const onHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hours;
    if (parseInt(e.target.value) < parseInt(e.target.min)) {
      hours = e.target.min;
    } else if (parseInt(e.target.value) > parseInt(e.target.max)) {
      hours = e.target.max;
    } else {
      hours = e.target.value;
    }
    if (props.setValue) props.setValue(props.name, `${hours}:${minutes}`);
  };

  return (
    <InputTimeContainer marginBottom={props.marginBottom}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div>
        <input type="number" className={classNames({ error: props.error })} placeholder={'hh'} name={props.name} onChange={onHourChange} autoComplete="off" min="00" max="23" size={2} value={hours} />
        <span>:</span>
        <input
          type="number"
          className={classNames({ error: props.error })}
          placeholder={'mm'}
          name={props.name}
          onChange={onMinuteChange}
          autoComplete="off"
          min="00"
          max="59"
          size={2}
          value={minutes}
        />
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </InputTimeContainer>
  );
};

export default InputTime;
