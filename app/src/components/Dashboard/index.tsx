import React from 'react';
import styled from 'styled-components';

import { GrowspaceContainer } from './container';
import GrowspaceListHeader from './list-header';
import GrowspaceList from './list';
import GrowspaceForm from './form';
import DashboardHeader from '../common/dashboard-header';
import growControllerService from '../../services/growController';
import * as growControllerActions from '../../context/growspace.context';
import { GrowspaceContext } from '../../context/growspace.context';

import { GREEN_PRIMARY, WHITE } from '../../styles/colors';

interface Props {}

interface State {
  showForm: boolean;
}

export interface IOnSubmitParams {
  name: string;
  location: string;
  identifier: string;
  description: string;
  dayStart: string;
  nightStart: string;
}

const AddGrowspaceButton = styled.button`
  background: ${GREEN_PRIMARY};
  border-radius: 8px;
  color: ${WHITE};
  padding: 4px 8px;
  font-weight: 600;
  font-size: 14px;
  height: 32px;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;

  img {
    padding-right: 8px;
  }
`;

class Growspace extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  setShowForm = (value: boolean): void => {
    this.setState({ showForm: value });
  };

  fetchGrowControllers = async () => {
    const data = await growControllerService.getGrowControllers();
    growControllerActions.setGrowspaces(this.context.dispatch)({ growspaces: data.growControllers });
  };

  onSubmit = async (values: IOnSubmitParams) => {
    await growControllerService.createGrowController(values);
    this.fetchGrowControllers();
  };

  async componentDidMount() {
    this.fetchGrowControllers();
  }

  render() {
    const { showForm } = this.state;
    return (
      <GrowspaceContainer>
        <DashboardHeader title="Total Overview">
          <AddGrowspaceButton onClick={() => this.setShowForm(!showForm)}>
            <img src="/images/icons/add.svg" alt="add" /> Add Growspace
          </AddGrowspaceButton>
        </DashboardHeader>
        {showForm && <GrowspaceForm onSubmit={this.onSubmit} setShowForm={this.setShowForm} />}
        <GrowspaceListHeader />
        <GrowspaceList />
      </GrowspaceContainer>
    );
  }
}

Growspace.contextType = GrowspaceContext;

export default Growspace;
