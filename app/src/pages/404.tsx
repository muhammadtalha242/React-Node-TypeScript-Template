import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FilledButton } from '../components/common/button';
import { VerticalSpace } from '../components/common/space';
import { GREEN_PRIMARY, WHITE } from '../styles/colors';

interface Props {}

const NotFoundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFound: React.FC<Props> = (props) => {
  return (
    <NotFoundContainer>
      <div>
        <div>Route not found OR Not authorized to access this page</div>
        <VerticalSpace height={24} />
        <div>
          <Link to="/">
            <FilledButton background={GREEN_PRIMARY} color={WHITE} width="100%">
              Back to Home
            </FilledButton>
          </Link>
        </div>
      </div>
    </NotFoundContainer>
  );
};

export default NotFound;
