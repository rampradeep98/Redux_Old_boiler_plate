import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import User from './User';
import RegisterScreen from './RegisterScreen';
import Role from './Role';

const Index = () => {
  const menuItems = [
    {
      path: '/user',
      element: <User />,
    },
    {
      path: '/register',
      element: <RegisterScreen />,
    },
    {
      path: '/role',
      element: <Role />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ];

  return (
    <div className='main-wrapper'>
      <Sidebar />
      <div className='main-layout'>
        <NavBar />
        <div className='content_layout'>
          <div className='content-wrapper'>
            <Routes>
              {menuItems &&
                menuItems.map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))}
            </Routes>
          </div>
          <div className='copyright'>
            <p>
              &copy; Designed & Developed by{' '}
              <span>Embridge Solutions Pvt Ltd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
