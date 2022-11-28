import axios from 'axios';
import jsCookie from 'js-cookie';

import REACT_APP_API_URL from '../constants/api';
import responseCodes from '../constants/res-codes';
import { setHeaders } from '../singletons/axios';

interface ILoginParams {
  email: string;
  password: string;
}

interface IValidateSessionParams {
  accessToken: string;
  idToken: string;
}

interface ILoginResponseData {
  accessToken: string;
  idToken: string;
  message: string;
  user: any;
}

interface IResetPasswordParams {
  email: string;
}

interface IRegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  connection: string;
}

interface IVerifyAccountParams {
  code: number;
  email: string;
}

const login = async ({ email, password }: ILoginParams): Promise<ILoginResponseData> => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
    username: email,
    password,
  });
  if (responseCodes.SUCCESS.includes(res.status)) {
    jsCookie.set('accessToken', res.data.accessToken);
    jsCookie.set('idToken', res.data.idToken);
    setHeaders(res.data.accessToken);
  }
  return res.data;
};

const validateSession = async ({ accessToken, idToken }: IValidateSessionParams) => {
  const res = await axios.get(`${REACT_APP_API_URL}/auth/validate`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-id-token': idToken,
    },
  });
  return res.data;
};

const resetPassword = async ({ email }: IResetPasswordParams) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/reset_password`, {
    email,
  });
  return res.data;
};

const register = async ({ email, password, firstName, lastName, connection }: IRegisterParams) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/register`, {
    firstName,
    lastName,
    email,
    password,
    connection,
  });
  return res.data;
};

const verifyAccount = async ({ code, email }: IVerifyAccountParams) => {
  const res = await axios.post(`${REACT_APP_API_URL}/auth/verify_account`, {
    email,
    code,
  });
  return res.data;
};

const exports = {
  login,
  register,
  validateSession,
  resetPassword,
  verifyAccount,
};

export default exports;
