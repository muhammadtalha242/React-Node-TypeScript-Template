import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './components/container';
import Routes from './routes';

import { Provider as AuthProvider } from './context/auth.context';
import { Provider as GrowspaceProvider } from './context/growspace.context';
import { Provider as UserProvider } from './context/user.context';
import { Provider as CompanyProvider } from './context/company.context';
import { Provider as DeviceProvider } from './context/settings/device.context';
import { Provider as ReportProvider } from './context/report.context';
import { Provider as AccessProvider } from './context/settings/access.context';
import { Provider as GrowsheetProvider } from './context/growsheet.context';

import './App.css';

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <AuthProvider>
          <GrowspaceProvider>
            <UserProvider>
              <ReportProvider>
                <CompanyProvider>
                  <DeviceProvider>
                    <AccessProvider>
                      <GrowsheetProvider>
                        <Routes />
                      </GrowsheetProvider>
                    </AccessProvider>
                  </DeviceProvider>
                </CompanyProvider>
              </ReportProvider>
            </UserProvider>
          </GrowspaceProvider>
        </AuthProvider>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
