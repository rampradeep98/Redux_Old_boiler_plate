import Animation from '../components/Animation';
import AuthInput from '../components/AuthInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/authSlice';
import SelectInput from '../components/SelectInput';
import { fetchRoleData } from '../redux/roleSlice';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const RegisterScreen = () => {
  const [type, setType] = useState('password');

  const { roleData } = useSelector((state) => state.role);
  console.log('roledata', roleData);
  const dispatch = useDispatch();
  const initialFormData = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  console.log('formData', formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createUser(formData));
    setFormData(initialFormData);
    if (!res.error) window.location.href = '/user';
  };

  const options = [
    { value: 'admin', label: 'admin' },
    { value: 'system-admin', label: 'system-admin' },
    { value: 'user', label: 'user' },
  ];
  useEffect(() => {
    dispatch(fetchRoleData());
  }, []);
  return (
    <div className='register-screen'>
      <div className='row'>
        <div className='banner-content-container'>
          <p>
            Welcome to E2M Application, Here you can track your Machine Live
            Data where goes and save it for future.
          </p>
        </div>
        <div className='col-sm-6'>
          <div className='left-container'>
            {/* <div className="logo-container">E2M Application</div> */}

            <div className='image-container'>
              <Animation type='banner' isCard={false} />
            </div>
          </div>
        </div>
        <div className='col-sm-6'>
          <div className='right-container'>
            <div className='terms-link-container'>
              {/* <span onClick={() => navigate('/terms')}>Terms</span> */}
            </div>
            <div className='form-container'>
              <h3 className='title'>Create your account</h3>
              <form method='post' onSubmit={handleSubmit}>
                <AuthInput
                  label='Your Name'
                  value={formData.name}
                  onChange={handleChange}
                  name='name'
                />
                <AuthInput
                  label='User Name'
                  value={formData.username}
                  onChange={handleChange}
                  name='username'
                />
                <AuthInput
                  label='Email Adders'
                  value={formData.email}
                  onChange={handleChange}
                  name='email'
                />
                <div className='form-group hide_icon_sec'>
                  <AuthInput
                    label='Password'
                    value={formData.password}
                    onChange={handleChange}
                    name='password'
                    type={type ? 'password' : 'text'}
                  />
                  <span
                    onClick={() => {
                      setType(!type);
                    }}
                    className='icon_span'>
                    {type ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
                <SelectInput
                  label='Roles'
                  options={roleData}
                  formData={formData.role}
                  handleChange={(e) => {
                    setFormData({ ...formData, role: e.value });
                  }}
                  noOptionsMessage=''
                  name='value'
                  placeholder='Select Your Role'
                />
                <div className='handlers-container'>
                  <button type='submit' className='btn btn-primary'>
                    Create Account
                  </button>
                </div>
              </form>
            </div>
            <div className='footer-container'>
              {/* <p>
                  Already have an account ?
                  <span onClick={() => navigate('/login')}>Login now</span>
                </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
