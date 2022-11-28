import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

interface Props {
  label?: React.ReactNode | string;
  disabled?: boolean;
  type: string;
  value?: any;
  setValue?: Function;
  placeholder?: string;
  name?: string;
  linkLabel?: string;
  link?: string;
  deactiveIcon?: string;
  activeIcon?: string;
  icon?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  iconWidth?: number;
  inputWidth?: number;
  iconLeft?: number;
}

interface IInputFieldProps {
  marginBottom: number | undefined;
  iconWidth: number | undefined;
  inputWidth: number | undefined;
  iconLeft: number | undefined;
}

const InputFieldContainer = styled.div<IInputFieldProps>`
  margin-bottom: ${(props) => (props.marginBottom || props.marginBottom === 0 ? props.marginBottom : 32)}px;
  font-size: 14px;

  .label-container {
    display: flex;
    justify-content: space-between;
    a {
      color: ${GREEN_PRIMARY};
    }
  }

  .icon {
    position: absolute;
    --widthIcon: ${(props) => (props.iconWidth || props.iconWidth === 0 ? props.iconWidth : 20)}px;
    width: var(--widthIcon);
    height: 16px;
    margin-top: 16px;
    margin-left: calc(0px - calc(var(--widthIcon) + ${(props) => props.iconLeft || 16}px));
  }

  input {
    border: 1px solid ${GREY_PRIMARY};
    border-radius: 8px;
    height: 48px;
    width: ${(props) => (props.inputWidth || props.inputWidth === 0 ? props.inputWidth + 'px' : '100%')};
    padding: 16px 12px;
    outline: none;
    color: ${GREY_SECONDARY};

    &::placeholder {
      color: #bfbfbf;
    }

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

const InputField: React.FC<Props> = (props) => {
  const [iconActive, setIconActive] = useState(false);
  const inputProps = { ...props };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.setValue) props.setValue({ name: props.name, value: (e.target as HTMLInputElement).value });
  };

  if (props.activeIcon && iconActive) {
    inputProps.type = 'text';
  }

  return (
    <InputFieldContainer marginBottom={props.marginBottom} iconWidth={props.iconWidth} inputWidth={props.inputWidth} iconLeft={props.iconLeft}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div>
        <input className={classNames({ error: props.error })} placeholder={props.placeholder} name={props.name} onChange={onChange} autoComplete="off" {...inputProps} />
        {props.activeIcon && props.deactiveIcon && <img src={iconActive ? props.deactiveIcon : props.activeIcon} onClick={() => setIconActive(!iconActive)} className="icon" alt="input-icon" />}
        {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </InputFieldContainer>
  );
};

export default InputField;
