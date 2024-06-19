import { Navigate } from 'react-router-dom';

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString =localStorage.getItem('token');
  if (!tokenDetailsString) {
    // dispatch(logout(history));
    alert('logout');
    return;
  }
}

export const isAuthenticated = () => {
  let token = localStorage.getItem('token');
  if (token) return true;
  return false;
};

export const Logout = () => {
  // let isConfirmed = window.confirm('Do you really want to logout?');
  // if (!isConfirmed) return;
  localStorage.removeItem('token');
  window.location.href = '/login';
  console.log('haiii');
};
