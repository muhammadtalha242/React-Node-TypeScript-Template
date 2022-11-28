import React, { useState } from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

import { GREEN_PRIMARY } from '../../styles/colors';

interface Props {
  isAuto: boolean;
  text?: string;
  marginTop?: number;
  textMarginLeft?: number;
}

interface ISwitchStyleProps {
  marginTop?: number;
  textMarginLeft?: number;
}

const SwitchContainer = styled.div<ISwitchStyleProps>`
  display: flex;
  margin-top: ${(props) => (props.marginTop || props.marginTop === 0 ? props.marginTop : 9)}px;
  align-items: center;
  .switch-text {
    color: ${GREEN_PRIMARY};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    padding-right: 4px;
    margin-left: ${(props) => props.textMarginLeft || 60}px;
  }
`;

const ControlSwitch = styled(Switch)``;

const SwitchController: React.FC<Props> = (props) => {
  const { isAuto, text } = props;
  const [mode, setMode] = useState(isAuto);
  const onModeChange = (mode: boolean) => {
    setMode(mode);
  };

  return (
    <SwitchContainer marginTop={props.marginTop} textMarginLeft={props.textMarginLeft}>
      <ControlSwitch checked={mode} onChange={onModeChange} size="small" />
      <div className="switch-text">{text}</div>
    </SwitchContainer>
  );
};

export default SwitchController;
