import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ability from './app/services/newaccess/ability';
import { AbilityContext } from './app/services/newaccess/Can';
import { AccessContext } from './app/services/newaccess/accessHelpers';

import access from './app/services/newaccess/access';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AbilityContext.Provider value={ability}>
          <AccessContext.Provider value={access}>
            <App />
          </AccessContext.Provider>
        </AbilityContext.Provider>
      </Provider>
      <Toaster position='top-right' reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>
);
