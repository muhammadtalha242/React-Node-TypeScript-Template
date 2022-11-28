import React from 'react';
import { Alert } from 'antd';

import { GrowspaceFormContainer } from './container';
import { OutlinedButton, FilledButton } from '../common/button';
import InputTime from '../common/input-time';

import { GREEN_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';
import { HorizontalSpace, VerticalSpace } from '../common/space';

interface IValues {
  name: string;
  location: string;
  identifier: string;
  description: string;
  dayStart: string;
  nightStart: string;
}

interface State {
  values: IValues;
  isError: boolean;
  err: string;
}

interface Props {
  onSubmit: (values: IValues) => void;
  setShowForm: (v: boolean) => void;
}

type IFormKeys = 'name' | 'identifier' | 'location' | 'description';

class GrowspaceForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: {
        name: '',
        location: '',
        identifier: '',
        description: '',
        dayStart: '',
        nightStart: '',
      },
      isError: false,
      err: '',
    };
  }

  onInputChange = (name: IFormKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateState = { ...this.state };
    updateState.values[name] = (e.target as HTMLInputElement).value;
    this.setState(updateState);
  };

  onTimeSet = (name: string, time: string) => {
    this.setState({ values: { ...this.state.values, [name]: time } });
  };

  onSubmit = () => {
    const { name, location, identifier, description } = this.state.values;
    if (!name || !location || !identifier || !description) {
      this.setState({ isError: true, err: 'All fields are required.' });
    } else if (location.split(',').length !== 2) {
      this.setState({ isError: true, err: 'Location has to be comma separated longitude and latitude values e.g: 7765.2123,1224.1189' });
    } else {
      this.props.onSubmit(this.state.values);
    }
  };

  render() {
    const { name, location, identifier, description } = this.state.values;
    return (
      <GrowspaceFormContainer>
        <div className="header">
          <div className="text">New Growspace</div>
          <img onClick={() => this.props.setShowForm(false)} src={`/images/icons/close.svg`} alt="close" />
        </div>
        {this.state.isError && (
          <>
            <Alert
              style={{ borderRadius: 16, textAlign: 'left' }}
              message="Error"
              description={<div>{this.state.err}</div>}
              type="error"
              onClose={() => this.setState({ isError: false, err: '' })}
              closable
            />
            <VerticalSpace height={32} />
          </>
        )}
        <div className="form">
          <div className="flex space-between">
            <div className="left-col">
              <div className="field">
                <div className="label">Growspace Name</div>
                <input className="input" onChange={this.onInputChange('name')} value={name} type="text" placeholder="Name" />
              </div>

              <div className="field">
                <div className="label">Location</div>
                <input className="input" onChange={this.onInputChange('location')} value={location} type="text" placeholder="Location" />
              </div>
            </div>
            <div className="right-col">
              <div className="field">
                <div className="label">Serial Number</div>
                <input className="input" onChange={this.onInputChange('identifier')} value={identifier} type="text" placeholder="Serial Number" />
              </div>

              <div className="field">
                <div className="label">Description</div>
                <input className="input" onChange={this.onInputChange('description')} value={description} type="text" placeholder="Description" />
              </div>
            </div>
          </div>
          <div className="flex">
            <InputTime name="dayStart" setValue={this.onTimeSet} label="Day Start" marginBottom={12} />
            <HorizontalSpace width={12} />
            <InputTime name="nightStart" setValue={this.onTimeSet} label="Night Start" marginBottom={12} />
          </div>
        </div>
        <div className="footer">
          <OutlinedButton color={RED_PRIMARY} onClick={() => this.props.setShowForm(false)}>
            Cancel
          </OutlinedButton>
          <FilledButton background={GREEN_PRIMARY} onClick={this.onSubmit} color={WHITE}>
            Save
          </FilledButton>
        </div>
      </GrowspaceFormContainer>
    );
  }
}

export default GrowspaceForm;
