import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/common/auth-form';

import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { GREEN_PRIMARY } from '../../styles/colors';

interface Props {}

const fields: IField[] = [
  {
    label: 'Create new password',
    type: 'password',
    name: 'password',
    defaultValue: '',
    placeholder: 'Enter your password',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
  {
    label: 'Repeat new password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'repeatPassword',
    defaultValue: '',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
];

const NewPassword: React.FC<Props> = (props) => {
  return (
    <AuthForm heading="Set up new password" fields={fields} buttonText="Set Up">
      <div>
        <VerticalSpace height={32} />
        Have any questions?{' '}
        <Link to="/login" style={{ color: GREEN_PRIMARY }}>
          Contact support
        </Link>
      </div>
    </AuthForm>
  );
};

export default NewPassword;
