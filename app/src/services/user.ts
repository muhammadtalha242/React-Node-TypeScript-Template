import axios from '../singletons/axios';

import REACT_APP_API_URL from '../constants/api';

interface IGetUserParams {
  userId: number;
}

interface IUpdateUserParams {
  userId: number | null;
  updates: {
    inDarkMode?: boolean;
    name?: string;
    email?: string;
    recoveryEmail?: string;
    mobile?: string;
  };
}

interface IUpdateProfileImageParams {
  userId: number | null;
  data: FormData;
}

interface IGetCompanyParams {
  companyId: number | null;
}
interface IUpdateCompanyParams {
  companyId: number | null;
  updates: {
    address: string;
    email: string;
    licenseNumber: string;
    registrationNumber: string;
    mobileNumber: string;
    name: string;
    website: string;
  };
}

interface IUpdateCompanyLogoParams {
  companyId: number | null;
  data: FormData;
}

const getUser = async ({ userId }: IGetUserParams) => {
  const res = await axios.get(`${REACT_APP_API_URL}/user/${userId}`);
  return res.data;
};

const updateUser = async ({ userId, updates }: IUpdateUserParams) => {
  const res = await axios.put(`${REACT_APP_API_URL}/user/${userId}`, updates);
  return res.data;
};

const uploadProfileImage = async ({ userId, data }: IUpdateProfileImageParams) => {
  const res = await axios.post(`${REACT_APP_API_URL}/user/${userId}/upload`, data);
  return res.data;
};

const getCompany = async ({ companyId }: IGetCompanyParams) => {
  const res = await axios.get(`${REACT_APP_API_URL}/company/${companyId}`);
  return res.data;
};

const updateCompany = async ({ companyId, updates }: IUpdateCompanyParams) => {
  const res = await axios.put(`${REACT_APP_API_URL}/company/${companyId}`, updates);
  return res.data;
};

const uploadCompanyLogo = async ({ companyId, data }: IUpdateCompanyLogoParams) => {
  const res = await axios.put(`${REACT_APP_API_URL}/company/${companyId}/upload`, data);
  return res.data;
};

const exports = {
  getUser,
  updateUser,
  uploadProfileImage,
  getCompany,
  updateCompany,
  uploadCompanyLogo,
};

export default exports;
