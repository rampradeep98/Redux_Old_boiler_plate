import React, { lazy, Suspense } from 'react';
//import Dashboard from './app/pages/Dashboard';

import './app/assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuthenticated } from './app/services/Helpers';
import { Navigate, Route, Routes } from 'react-router-dom';
import Index from './app/pages';

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('./app/pages/Login')), 500);
  });
});

const App = () => {
  let routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
  if (isAuthenticated()) {
    return (
      <Suspense
        fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }>
        <Index />
      </Suspense>

    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }>
          {routes}
        </Suspense>
      </div>
    );
  }
};

export default App;
