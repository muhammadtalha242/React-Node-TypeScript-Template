import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Select } from 'antd';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

export interface IOptionType {
  value: string;
  label: string;
}

interface Props {
  label?: string;
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
  options: IOptionType[];
}

const SelectFieldContainer = styled.div<{ marginBottom: number | undefined }>`
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
    width: 20px;
    height: 16px;
    margin-top: 16px;
    margin-left: -36px;
  }

  .ant-select-selection-placeholder {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
    }
  }
  .select {
    border: 1px solid ${GREY_PRIMARY};
    border-radius: 8px;
    height: 48px;
    width: 100%;
    padding: 6px 0px;
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
  line-height: 19px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const SelectField: React.FC<Props> = (props) => {
  const [iconActive, setIconActive] = useState(false);

  const onChange = (value: string): void => {
    if (props.setValue) props.setValue({ name: props.name, value: value });
  };

  return (
    <SelectFieldContainer marginBottom={props.marginBottom}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div className={classNames({ error: props.error })}>
        <Select className="select" placeholder={props.placeholder} name={props.name} onChange={onChange} bordered={false} {...props} />
        {props.activeIcon && props.deactiveIcon && <img src={iconActive ? props.deactiveIcon : props.activeIcon} onClick={() => setIconActive(!iconActive)} className="icon" alt="input-icon" />}
        {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </SelectFieldContainer>
  );
};

export default SelectField;
