import React, { useContext } from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

import { ModeControllerContainer } from './container';
import { GREY_PRIMARY } from '../../styles/colors';
import { UserContext } from '../../context/user.context';
import userService from '../../services/user';
import * as userActions from '../../context/user.context';

interface Props {
  isDarkMode: boolean;
}

const ModeSwitch = styled(Switch)`
  background-color: ${GREY_PRIMARY};
`;

const Icon = styled.img`
  margin: 0 15px;
`;

const ModeController: React.FC<Props> = (props) => {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const onModeChange = async (mode: boolean) => {
    const data = await userService.updateUser({ userId: userState.id, updates: { inDarkMode: mode } });
    userActions.setUser(userDispatch)(data.user);
  };

  return (
    <ModeControllerContainer>
      <Icon src={`/images/icons/light-mode.svg`} />
      <ModeSwitch checked={userState.inDarkMode} onChange={onModeChange} />
      <Icon src={`/images/icons/dark-mode.svg`} />
    </ModeControllerContainer>
  );
};

export default ModeController;
