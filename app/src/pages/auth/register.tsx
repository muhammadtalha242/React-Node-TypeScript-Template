import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthForm from '../../components/common/auth-form';
import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { success } from '../../components/common/message';

import { GREEN_PRIMARY } from '../../styles/colors';

import auth0Service from '../../services/auth0';

interface Props {}

interface IRegisterSubmitParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
}

const fields: IField[] = [
  {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    name: 'name',
    defaultValue: '',
  },
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    defaultValue: '',
  },
  {
    label: 'Create password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    defaultValue: '',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
  {
    label: 'Repeat password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'repeatPassword',
    defaultValue: '',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
];

const Register: React.FC<Props> = (props) => {
  const history = useHistory();
  const [err, setErr] = useState({});
  const onSubmit = async ({ email, password, repeatPassword, name }: IRegisterSubmitParams) => {
    setErr({});
    const nameArr = name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr.length > 1 ? nameArr.slice(1, nameArr.length).join(' ') : '';
    if (!firstName || !email || !password || !repeatPassword) {
      setErr({
        isError: true,
        description: 'All fields are required to be filled',
        code: 'fields_required',
      });
    } else {
      try {
        const data = await auth0Service.register({
          email,
          password,
          firstName,
          lastName,
          connection: 'Username-Password-Authentication',
        });
        success(data.message);
        history.push(`/verify-account/${email}`);
      } catch (e) {
        const { data } = e.response;
        if (data.isError) setErr({ message: data.message, isError: true });
      }
    }
  };
  return (
    <AuthForm heading="Register new account" subHeading="Enter your credentials to create new account" fields={fields} buttonText="Register" onSubmit={onSubmit} err={err} setErr={setErr}>
      <div>
        <VerticalSpace height={32} />
        Already have an account?{' '}
        <Link to="/login" style={{ color: GREEN_PRIMARY }}>
          Log in
        </Link>
      </div>
    </AuthForm>
  );
};

export default Register;
