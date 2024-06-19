import React, { useEffect, useRef, useState } from 'react';
import MainWrapper from '../components/MainWrapper';
import SelectInput from '../components/SelectInput';
import TableUI from '../components/TableUI';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import Button from '../components/Button';
import { fetchData, fetchRoleData } from '../redux/roleSlice';
import { userFetch, userUpdate, archive } from '../redux/authSlice';
import { toggleSideModal } from '../redux/layoutSlice';
import { deleteConfirmationAlert } from '../services/AlertService';
import { RiDeleteBin3Line } from 'react-icons/ri';

const User = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const { data, status: downTimeStatus } = useSelector((state) => state.auth);
  const { roleData } = useSelector((state) => state.role);
  const handleRetry = () => dispatch();

  /// api
  const initialValue = {
    name: '',
    userName: '',
    Password: '',
    role: '',
    email: '',
  };
  const [formData, setFormData] = useState(initialValue);

  const handleAdd = () => {
    window.location.href = '/register';
    //dispatch(toggleSideModal());
    //setSidebarAction('add');
  };

  const ToolBar = () => {
    return (
      <>
        <Button
          value='Add User'
          varient='dark ms-2'
          small='true'
          onClick={handleAdd}
        />
      </>
    );
  };

  const header = [
    {
      name: 'id',
      key: 'id',
      options: {
        display: 'excluded',
        filter: false,
        print: false,
        download: false,
      },
    },
    {
      name: 'Name',
      key: 'name',
      options: {
        sort: false,
        display: true,
        setCellProps: () => {
          return {
            style: {
              textAlign: 'left',
              fontWeight: 'bold',
            },
          };
        },
      },
    },
    {
      name: 'User Name',
      key: 'username',
      options: {
        sort: false,
        display: true,
        setCellProps: () => {
          return {
            style: {
              textAlign: 'left',
              fontWeight: 'bold',
            },
          };
        },
      },
    },
    {
      name: 'Email',
      key: 'email',
      options: {
        sort: false,
        display: true,
        setCellProps: () => {
          return {
            style: {
              textAlign: 'left',
              fontWeight: 'bold',
            },
          };
        },
      },
    },
    {
      name: 'isAdmin',
      key: 'isAdmin',
      options: {
        sort: false,
        display: true,
      },
    },
    {
      name: 'Role',
      key: 'role',
      options: {
        sort: false,
        display: true,
      },
    },
  ];

  const Actions = (value, tableMeta, updateValue) => (
    <>
      <div className='row text-center'>
        <div className='col-6' style={{ width: '100%' }}>
          <Button
            icon={<BiEdit />}
            onlyicon='true'
            varient='dark outline'
            small='true'
            onClick={() => handleEdit(tableMeta.rowData)}
          />

          <Button
            icon={<RiDeleteBin3Line />}
            onlyicon='true'
            varient='danger outline'
            small='true'
            data-swal-toast-template='#my-template'
            onClick={() => handleDelete(tableMeta.rowData[0])}
          />
        </div>
      </div>
    </>
  );

  const Controls = (
    <>
      <Button
        type='button'
        varient='dark '
        value={
          sidebarAction === 'add'
            ? 'Save'
            : sidebarAction === 'edit'
            ? 'Update'
            : sidebarAction === 'quality'
            ? 'Update Rejection Qty'
            : ''
        }
        small='true'
        onClick={() => formRef.current.click()}
      />
    </>
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (value) => {
    const newData = {
      id: value[0],
      name: value[1],
      userName: value[2],
      email: value[3],
      role: value[5],
    };
    setFormData(newData);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(userUpdate(formData));
    dispatch(toggleSideModal());
    setFormData(initialValue);
    dispatch(userFetch());
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await deleteConfirmationAlert.fire();
    if (isConfirmed) {
      dispatch(archive(id));
      dispatch(fetchData());
    }
  };

  useEffect(() => {
    dispatch(userFetch());
    dispatch(fetchData());
    dispatch(fetchRoleData());
  }, []);
  return (
    <>
      <MainWrapper title='User'>
        {downTimeStatus === 'succeeded' ? (
          <TableUI
            toolbar={ToolBar}
            actions={Actions}
            header={header}
            data={data}
          />
        ) : downTimeStatus === 'Loading' ? (
          <Animation type='loading' isCenter />
        ) : downTimeStatus === 'failed' ? (
          <Animation type='error' isCenter retry={handleRetry} />
        ) : downTimeStatus === 'idle' ? (
          <Animation type='idle' isCenter titleName={'Select Your Reason'} />
        ) : (
          ''
        )}
      </MainWrapper>
      <SideModal
        buttons={Controls}
        title={
          sidebarAction === 'add'
            ? 'New Role'
            : sidebarAction === 'edit'
            ? 'Update Role'
            : ''
        }>
        {sidebarAction === 'edit' && (
          <form action='#' method='post' onSubmit={handleUpdate}>
            <div className='row'>
              <label
                className='text-center mt-3 bold'
                style={{ fontWeight: 'bold' }}></label>
              <div className='col-6'>
                <Input
                  label='name'
                  type='text'
                  name='name'
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className='col-6'>
                <Input
                  label='userName'
                  type='text'
                  name='userName'
                  onChange={handleChange}
                  value={formData.userName}
                />
              </div>
              <div className='col-6'>
                <Input
                  label='Password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  value={formData.Password}
                />
              </div>
              <div className='col-6'>
                <Input
                  label='Email'
                  type='email'
                  name='email'
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className='col-6'>
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
              </div>
            </div>
            <input
              type='submit'
              style={{ display: 'none' }}
              value='submit'
              ref={formRef}
            />
          </form>
        )}
      </SideModal>
    </>
  );
};

export default User;
