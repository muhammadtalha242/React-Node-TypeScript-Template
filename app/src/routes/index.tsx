import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import jsCookie from 'js-cookie';

import Dashboard from '../pages/home';
import Growsheets from '../pages/growsheets';
import DeviceSetup from '../pages/settings/device-setup';
import ProfileSettings from '../pages/settings/profile-settings';
import OrganizationSettings from '../pages/settings/org-settings';
import NotificationsSettings from '../pages/settings/notifications';
import Co2ControlSettings from '../pages/settings/co2-control';
import TemperatureControlSettings from '../pages/settings/temperature-control';
import IrrigationControlSettings from '../pages/settings/irrigation-control';
import HumidityControl from '../pages/settings/humidity-control';
import LightingControlSettings from '../pages/settings/lighting-control';
import FertigationControlSettings from '../pages/settings/fertigation-control';
import Overview from '../pages/overview';
import Reports from '../pages/reports';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ResetPassword from '../pages/auth/reset-password';
import NewPassword from '../pages/auth/new-password';
import VerifyAccount from '../pages/auth/verify-account';
import AccessControlSettings from '../pages/settings/access-control';

import { AuthContext } from '../context/auth.context';
import { UserContext } from '../context/user.context';
import * as authActions from '../context/auth.context';
import * as userActions from '../context/user.context';
import auth0Service from '../services/auth0';
import { setHeaders } from '../singletons/axios';
import NotFound from '../pages/404';

interface Props {}

export interface IPage {
  key: string;
  exact: boolean;
  path: string;
  isProtected: boolean;
  allowedViewRoles?: string[];
  component: React.ElementType;
}

const PAGES: IPage[] = [
  {
    key: 'home',
    exact: true,
    path: '/',
    isProtected: true,
    component: Dashboard,
  },
  {
    key: 'device-setup',
    exact: true,
    path: '/settings/device-setup',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin'],
    component: DeviceSetup,
  },
  {
    key: 'user-settings',
    exact: true,
    path: '/settings/user-settings',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin', 'crop_technician'],
    component: ProfileSettings,
  },
  {
    key: 'organization-settings',
    exact: true,
    path: '/settings/organization-settings',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin'],
    component: OrganizationSettings,
  },
  {
    key: 'growsheets',
    exact: true,
    path: '/growsheets',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin'],
    component: Growsheets,
  },
  {
    key: 'overview',
    exact: true,
    path: '/overview/:growspaceId',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin', 'crop_technician'],
    component: Overview,
  },
  {
    key: 'access-settings',
    exact: true,
    path: '/settings/access-settings',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin'],
    component: AccessControlSettings,
  },
  {
    key: 'notifications',
    exact: true,
    path: '/settings/notifications',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin'],
    component: NotificationsSettings,
  },
  {
    key: 'co2-control',
    exact: true,
    path: '/settings/co2-control',
    isProtected: true,
    component: Co2ControlSettings,
  },
  {
    key: 'temperature-control',
    exact: true,
    path: '/settings/temperature-control',
    isProtected: true,
    allowedViewRoles: ['super_admin', 'company_admin'],
    component: TemperatureControlSettings,
  },
  {
    key: 'irrigation',
    exact: true,
    path: '/settings/irrigation',
    isProtected: true,
    component: IrrigationControlSettings,
  },
  { key: 'humidity-control', exact: true, path: '/settings/humidity-control', isProtected: true, component: HumidityControl },
  {
    key: 'lighting-control',
    exact: true,
    path: '/settings/lighting-control',
    isProtected: true,
    component: LightingControlSettings,
  },
  {
    key: 'fertigation',
    exact: true,
    path: '/settings/fertigation',
    isProtected: true,
    component: FertigationControlSettings,
  },
  {   
    key: 'reports',
    exact: true,
    path: '/reports',
    isProtected: true,
    component: Reports,

  },

  /** auth routes */
  {
    key: 'login',
    exact: true,
    path: '/login',
    isProtected: false,
    component: Login,
  },
  {
    key: 'register',
    exact: true,
    path: '/register',
    isProtected: false,
    component: Register,
  },
  {
    key: 'reset-password',
    exact: true,
    path: '/reset-password',
    isProtected: false,
    component: ResetPassword,
  },
  {
    key: 'new-password',
    exact: true,
    path: '/new-password',
    isProtected: false,
    component: NewPassword,
  },
  {
    key: 'verify-account',
    exact: true,
    path: '/verify-account/:email',
    isProtected: false,
    component: VerifyAccount,
  },
];

const Routes: React.FC<Props> = (props) => {
  const history = useHistory();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  useEffect(() => {
    const sessionCheck = async () => {
      const accessToken = jsCookie.get('accessToken');
      const idToken = jsCookie.get('idToken');
      const path = history.location.pathname;
      const route = PAGES.find((page) => page.path === path);
      if (!authState.isAuthenticated && accessToken && idToken) {
        try {
          const data = await auth0Service.validateSession({ accessToken, idToken });
          if (data.isAuthenticated) {
            setHeaders(accessToken);
            authActions.setToken(authDispatch)({ accessToken, idToken, isAuthenticated: true });
            userActions.setUser(userDispatch)(data.user);
          } else history.push('/login');
        } catch {
          history.push('/login');
        }
      } else if (authState.isAuthenticated || !route?.isProtected) {
        history.push(path);
      } else {
        history.push('/login');
      }
    };
    sessionCheck();
  }, [history, authState, authDispatch, userDispatch]);

  const filteredPages: IPage[] = [];
  PAGES.forEach((page) => {
    if (authState.isAuthenticated || !page.isProtected) filteredPages.push(page);
  });

  const Components = filteredPages.map((page) => {
    if (page.isProtected) {
      let isAuthorized = authState.isAuthenticated;
      if (page.allowedViewRoles && !page.allowedViewRoles.includes(userState.role.code)) {
        isAuthorized = false;
      }
      return (
        <Route
          path={page.path}
          exact={page.exact}
          render={(props) => {
            return isAuthorized ? <page.component {...props} /> : <NotFound />;
          }}
        />
      );
    } else {
      return <Route key={page.key} exact path={page.path} render={(props) => <page.component {...props} />} />;
    }
  });

  return <Switch>{Components}</Switch>;
};

export default Routes;
