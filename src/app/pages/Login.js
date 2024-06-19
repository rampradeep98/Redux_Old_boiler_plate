import React, { useEffect, useState } from 'react';
// import LoginImages from '../assets/images/11879384_Work-ai.png';
import { useDispatch } from 'react-redux';
import { LoginDetail } from '../redux/authSlice';
import { isAuthenticated } from '../services/AuthService';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { LogoImg, loginfomImg } from '../assets/images';

const Login = () => {
  const [type, setType] = useState('password');

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    // localStorage.setItem(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ3ejVCM2l5M3JWVFFNYmF3VG5NZWUwZThwWnoyIiwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImZuYW1lIjoiam9obiIsImxuYW1lIjoiZG9lIiwiaWF0IjoxNjgwODc4NDg3LCJleHAiOjIwNDA4Nzg0ODd9.DbotFIDPxhtGlGEG_mG5_uKQfmMXjjfTHi0YEt88zBU'
    // );
    // window.location.href = '/';
    const res = await dispatch(LoginDetail(formData));
    if (!res.error) window.location.href = '/dashboard';
  };

  useEffect(() => {
    if (isAuthenticated()) window.location.href = '/dashboard';
  }, []);

  return (
    <div
      className='login-screen'
      // style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className='container'>
        <div className='col-sm-12'>
          <div className='card card-wrap'>
            <div className='row login_row'>
              <div className='col-sm-6'>
                <div className='welcome-text'>
                  <h4>
                    Wittur <span>Elevator Components</span>
                  </h4>
                </div>
                <div className='form-container'>
                  <form onSubmit={handelLogin}>
                    <div className='col-12 mb-3'>
                      <span>User Name</span>
                      <input
                        className='form-control'
                        name='username'
                        type='text'
                        required
                        placeholder='User Name'
                        onChange={handleChange}
                        value={formData.user}
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <div className='form-group'>
                        <span>Password</span>
                        <input
                          className='form-control'
                          name='password'
                          required
                          type={type ? 'password' : 'text'}
                          placeholder='Password'
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <span
                          onClick={() => {
                            setType(!type);
                          }}
                          className='icon_span'>
                          {type ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </span>
                      </div>
                    </div>
                    <div className='button-group'>
                      <button type='submit' className='btn btn-light'>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className='LoginFooter-container'>
                  <p>
                    Don't have an account ? Contact Administrator
                    {/* <span onClick={() => navigate('/register')}>
                        Create now
                      </span> */}
                  </p>
                </div>
              </div>
              <div className='col-sm-6'>
                <img src={loginfomImg} className='login-images' alt='login' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
