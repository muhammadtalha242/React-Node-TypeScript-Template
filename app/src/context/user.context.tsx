import React, { createContext, useReducer } from 'react';

export interface IState {
  id: number | null;
  companyId: number | null;
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  inDarkMode: boolean;
  firstName: string;
  lastName: string;
  recoveryEmail: string;
  mobile: string;
  image: string;
  role: {
    id: number | null;
    code: string;
    name: string;
  };
}

export const initialState: IState = {
  id: null,
  companyId: null,
  auth0Id: '',
  email: '',
  emailVerified: false,
  inDarkMode: false,
  firstName: '',
  lastName: '',
  recoveryEmail: '',
  mobile: '',
  image: '',
  role: {
    id: null,
    code: '',
    name: '',
  },
};

type IAction = {
  type: string;
  payload?: any;
};

type ISetUserParams = {
  id: number;
  auth0Id: string;
  email: string;
  emailVerified: boolean;
  inDarkMode: boolean;
  name: string;
};

const ACTION_TYPES = {
  SET_USER: 'SET_USER',
  SET_USER_IMAGE: 'SET_USER_IMAGE',
};

const authReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPES.SET_USER_IMAGE: {
      return {
        ...state,
        image: action.payload.url,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const setUser = (dispatch: React.Dispatch<IAction> | undefined) => (params: ISetUserParams) => {
  const splittedName = params.name.split(' ');
  if (dispatch) dispatch({ type: ACTION_TYPES.SET_USER, payload: { ...params, firstName: splittedName[0], lastName: splittedName.slice(1).join(' ') } });
};

export const setUserImage = (dispatch: React.Dispatch<IAction> | undefined) => (url: string) => {
  if (dispatch) dispatch({ type: ACTION_TYPES.SET_USER_IMAGE, payload: { url } });
};

const Context = () => {
  const UserContext = createContext<{ state: IState; dispatch?: React.Dispatch<IAction> }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
  };
  return { UserContext, Provider };
};

export const { UserContext, Provider } = Context();
