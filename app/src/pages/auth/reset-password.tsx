import React from 'react';
import { Link } from 'react-router-dom';

import AuthForm from '../../components/common/auth-form';

import auth0Service from '../../services/auth0';
import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { GREEN_PRIMARY, RED_PRIMARY } from '../../styles/colors';

interface Props {}

const fields: IField[] = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    defaultValue: '',
  },
];

const ResetPassword: React.FC<Props> = (props) => {
  const onSubmit = async ({ email }: { email: string }) => {
    await auth0Service.resetPassword({
      email,
    });
  };
  return (
    <AuthForm
      heading="Reset password"
      subHeading="Enter the email address associated with your account and we’llsend you a link to reset your password"
      fields={fields}
      buttonText="Continue"
      onSubmit={onSubmit}
    >
      <div>
        <VerticalSpace height={32} />
        <div>
          New on Scimetic?{' '}
          <Link to="/register" style={{ color: GREEN_PRIMARY }}>
            Create an account
          </Link>
        </div>
        <VerticalSpace height={32} />
        <img src={`/images/icons/arrow-back.svg`} style={{ marginRight: 8 }} alt="back" />
        <Link to="/login" style={{ color: RED_PRIMARY }}>
          Back to login
        </Link>
      </div>
    </AuthForm>
  );
};

export default ResetPassword;
