import React, { useContext, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import AuthForm from '../../components/common/auth-form';

import { IField } from '../../components/common/auth-form';
import { VerticalSpace } from '../../components/common/space';
import { success } from '../../components/common/message';

import auth0Service from '../../services/auth0';
import * as authActions from '../../context/auth.context';
import * as userActions from '../../context/user.context';
import { AuthContext } from '../../context/auth.context';
import { UserContext } from '../../context/user.context';

import { GREEN_PRIMARY } from '../../styles/colors';

interface Props extends RouteComponentProps {}

interface ILoginSubmitParams {
  email: string;
  password: string;
}

const fields: IField[] = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    name: 'email',
    defaultValue: '',
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    defaultValue: '',
    link: '/reset-password',
    linkLabel: 'Forgot password?',
    activeIcon: '/images/icons/show.svg',
    deactiveIcon: '/images/icons/hide.svg',
  },
];

const Login: React.FC<Props> = (props) => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: userDispatch } = useContext(UserContext);
  const [err, setErr] = useState({});
  const onSubmit = async ({ email, password }: ILoginSubmitParams) => {
    if (!email || !password) {
      setErr({
        isError: true,
        description: 'All fields are required to be filled',
        code: 'fields_required',
      });
    } else {
      try {
        const data = await auth0Service.login({
          email,
          password,
        });
        authActions.setToken(authDispatch)({
          accessToken: data.accessToken,
          idToken: data.idToken,
          isAuthenticated: true,
        });
        userActions.setUser(userDispatch)(data.user);
        success(data.message);
        props.history.push('/');
      } catch (e) {
        const { data } = e.response;
        if (data.isError) setErr({ message: data.message, isError: true });
      }
    }
  };

  return (
    <AuthForm heading="Log In" subHeading="Enter your credentials to access your account" fields={fields} buttonText="Sign In" onSubmit={onSubmit} err={err} setErr={setErr}>
      <div>
        <VerticalSpace height={32} />
        New on Scimetic?{' '}
        <Link to="/register" style={{ color: GREEN_PRIMARY }}>
          Create an account
        </Link>
      </div>
    </AuthForm>
  );
};

export default Login;
