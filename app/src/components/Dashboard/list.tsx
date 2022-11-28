import React from 'react';
import { Link } from 'react-router-dom';

import { GrowspaceContext, IGrowspaceResponse } from '../../context/growspace.context';
import { GrowspaceListContainer } from './container';
import GrowspaceItem from './item';

interface Props {}

class GrowspaceList extends React.Component<Props> {
  static contextType = GrowspaceContext;
  render() {
    const { state } = this.context;
    return (
      <GrowspaceListContainer>
        {state.growspaces.map((growspace: IGrowspaceResponse) => (
          <Link key={growspace.id} to={`/overview/${growspace.identifier}`}>
            <GrowspaceItem growspace={growspace} />
          </Link>
        ))}
      </GrowspaceListContainer>
    );
  }
}

export default GrowspaceList;
