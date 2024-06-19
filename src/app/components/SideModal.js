import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { toggleSideModal } from '../redux/layoutSlice';
const SideModal = ({ children, buttons, title }) => {
  const dispatch = useDispatch();
  const { sideModalStatus } = useSelector((state) => state.layout);
  return (
    <>
      {sideModalStatus && <div className='overlay'></div>}
      <div className={`side-modal ${sideModalStatus ? 'show' : ''}`}>
        <div className='sidebar-heading'>
          <div
            className='sidebar-control'
            onClick={() => dispatch(toggleSideModal())}>
            <TbLayoutSidebarRightCollapse />
          </div>
          <div className='sidebar-buttons'>{buttons}</div>
        </div>
        <div className='sidebar-body'>
          <h3 className='sidebar-title'>{title}</h3>
          <div className='sidebar-content'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default SideModal;
