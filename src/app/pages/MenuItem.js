import React, { useState } from 'react';
//import { Alert } from 'react-bootstrap';
// import {Alert} from '../services/AlertService';
import { Link, useNavigate } from 'react-router-dom';

const MenuItem = ({ item, active }) => {
  const navigate = useNavigate();
  const [style, setStyle] = useState(false);
  const handleDropDown = () => {
    if (style) {
      if (item.title === 'Plan') {
        return alert(
          'error',
          'Plan Entry Feature Not Available.! Plan Should be Automatically Calculated'
        );
      }
      navigate(item.path);
      setStyle(false);
    } else {
      navigate(item.path);
      setStyle(true);
    }
  };
  return (
    <>
      <div className='expand_dropdownsec'>
        <h6
          className={`menu-item ${active ? 'active' : ''}`}
          onClick={handleDropDown}>
          {item?.icon} {item?.title}
        </h6>
        {style && item?.dropdown ? (
          <div>
            <>
              {item.dropdownItems.map((dat, index) => {
                return (
                  <Link key={index} to={dat?.path}>
                    <span className='me-2'>{dat?.icon}</span>
                    {dat?.title}
                  </Link>
                );
              })}
            </>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default MenuItem;
