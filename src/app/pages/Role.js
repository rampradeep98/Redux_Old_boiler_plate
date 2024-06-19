import React, { useEffect, useRef, useState } from 'react';
import MainWrapper from '../components/MainWrapper';
import TableUI from '../components/TableUI';
import Animation from '../components/Animation';
import SideModal from '../components/SideModal';
import Input from '../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import Button from '../components/Button';
import { archive, createRole, fetchData, updateRole } from '../redux/roleSlice';
import { toggleSideModal } from '../redux/layoutSlice';
import { Alert, deleteConfirmationAlert } from '../services/AlertService';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { fetchScope } from '../redux/roleSlice';
import SelectMulti from '../components/SelectMulti';

const Role = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [sidebarAction, setSidebarAction] = useState('add');
  const [selected, setSelected] = useState([]);
  const {
    data,
    status: downTimeStatus,
    scope,
  } = useSelector((state) => state.role);
  const handleRetry = () => dispatch();

  /// api
  const initialValue = {
    name: '',
  };
  const [formData, setFormData] = useState(initialValue);

  const handleAdd = () => {
    dispatch(toggleSideModal());
    setSidebarAction('add');
  };

  const ToolBar = () => {
    return (
      <>
        <Button
          value='Add New Role'
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
      name: 'Role Name',
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
  ];

  const Actions = (value, tableMeta, updateValue) => (
    <>
      <div className='row text-center'>
        <div className='col-6' style={{ width: '100%' }}>
          {/* <Button
            icon={<BiEdit />}
            onlyicon='true'
            varient='dark outline'
            small='true'
            onClick={() => handleEdit(tableMeta.rowData)}
          /> */}
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
    };
    setFormData(newData);
    dispatch(toggleSideModal());
    setSidebarAction('edit');
  };

  const submitRole = async (e) => {
    e.preventDefault();
    let selectedValue = [];
    selected?.map((item) => {
      selectedValue?.push(item?.label);
    });
    if (data.find((da) => da.name === formData.name))
      return Alert('error', 'Role Name already exists');
    const newData = {
      ...formData,
      permissionData: selectedValue,
    };
    dispatch(createRole(newData));
    dispatch(toggleSideModal());
    setFormData(initialValue);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // if (data.find((da) => da.name === formData.name))
    // return Alert('error', 'Role Name already exists');
    dispatch(updateRole(formData));
    dispatch(fetchData());
    dispatch(toggleSideModal());
    setFormData(initialValue);
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await deleteConfirmationAlert.fire();
    if (isConfirmed) {
      dispatch(archive(id));
      dispatch(fetchData());
    }
  };

  useEffect(() => {
    if (downTimeStatus === 'idle') {
      dispatch(fetchData());
    }
    dispatch(fetchScope());

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <MainWrapper title='Role'>
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
        {sidebarAction === 'add' && (
          <form action='#' method='post' onSubmit={submitRole}>
            <div className='row'>
              <div className='col-12'>
                <Input
                  label='Role'
                  type='text'
                  placeholder='role name'
                  onChange={handleChange}
                  name='name'
                  value={formData.name}
                />
              </div>
              <div className='col-12'>
                <SelectMulti
                  label='Permissions'
                  name='value'
                  options={scope}
                  value={selected}
                  handleChange={setSelected}
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
        {sidebarAction === 'edit' && (
          <form action='#' method='post' onSubmit={handleUpdate}>
            <div className='row'>
              <label
                className='text-center mt-3 bold'
                style={{ fontWeight: 'bold' }}></label>
              <div className='col-6'>
                <Input
                  label='Role'
                  type='text'
                  name='name'
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
            </div>
            <div className='col-12'>
              <SelectMulti
                label='Permissions'
                name='value'
                options={scope}
                value={selected}
                handleChange={setSelected}
              />
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

export default Role;
