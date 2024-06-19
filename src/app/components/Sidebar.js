import React, { useEffect, useState } from 'react';
import { TbLayoutDashboard, TbReport, TbReportSearch } from 'react-icons/tb';
import {
  BsReceiptCutoff,
  BsGear,
  BsBarChartLine,
  BsPatchCheck,
  BsSpeedometer2,
} from 'react-icons/bs';
import { TfiDashboard } from 'react-icons/tfi';
import {
  MdOutlineTimer,
  MdOutlineCancelScheduleSend,
  MdProductionQuantityLimits,
  MdOutlineBrowserUpdated,
} from 'react-icons/md';
import { SiWakatime } from 'react-icons/si';

import { RxCountdownTimer } from 'react-icons/rx';
import MenuItem from '../pages/MenuItem';
import { useLocation } from 'react-router-dom';
import { LogoImg } from '../assets/images';
import { BiShowAlt } from 'react-icons/bi';
import { WiTime11 } from 'react-icons/wi';
import { UserRole } from '../services/Helpers';

const Sidebar = () => {
  const location = useLocation();
  const [path, setPath] = useState(window.location.pathname);

  const menuItems = [

    {
      title: 'Dashboard',
      path: '/home',
      access: 'dashboard',
      icon: <TfiDashboard />,
      dropdown: false,
    },
  ];

  useEffect(() => {
    let newPath = window.location.pathname;
    newPath = newPath.split('/');
    newPath = newPath.filter((pa) => {
      return pa !== '';
    });
    newPath = newPath[0] ? `/${newPath[0]}` : '/';
    setPath(newPath);
  }, [location]);

  return (
    <div className='left-side-bar'>
      <img
        src={LogoImg}
        alt='Logo'
        className='img img-responsive logo'
      // draggable='false'
      />
      <div className='menu-bar'>
        {menuItems &&
          menuItems.map((menuItem, index) => (
            <>
              {UserRole(menuItem.access, 'view') && (
                <MenuItem
                  item={menuItem}
                  key={index}
                  active={menuItem.path === path ? true : false}
                />
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
