import React, { createContext, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  accessToken: '',
  idToken: '',
};

type IState = typeof initialState;

type IAction = {
  type: string;
  payload?: any;
};

type ISetTokenParams = {
  accessToken: string;
  idToken: string;
  isAuthenticated?: boolean;
};

const ACTION_TYPES = {
  SET_TOKEN: 'SET_TOKEN',
  UNSET_TOKEN: 'UNSET_TOKEN',
};

const authReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_TOKEN: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        accessToken: action.payload.accessToken,
        idToken: action.payload.idToken,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const setToken =
  (dispatch: React.Dispatch<IAction> | undefined) =>
  ({ accessToken, idToken, isAuthenticated }: ISetTokenParams) => {
    if (dispatch) dispatch({ type: ACTION_TYPES.SET_TOKEN, payload: { accessToken, idToken, isAuthenticated } });
  };

const Context = () => {
  const AuthContext = createContext<{ state: IState; dispatch?: React.Dispatch<IAction> }>(null!);
  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
  };
  return { AuthContext, Provider };
};

export const { AuthContext, Provider } = Context();
