import React from 'react';
import { AiFillDiff, AiFillFileAdd } from 'react-icons/ai';
import { MdVerticalSplit } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
const NotificationItem = ({ notification }) => {
  let detail = {
    icon: '',
    title: notification.title,
    desc: notification.desc,
    color: '#000',
  };

  switch (notification.type) {
    case 'transfer-in':
      detail = { ...detail, color: '#102542', icon: <AiFillFileAdd /> };
      break;
    case 'transfer-out':
      detail = { ...detail, color: '#373D20', icon: <AiFillDiff /> };
      break;
    case 'plan-creation':
      detail = { ...detail, color: '#8D5B4C', icon: <MdVerticalSplit /> };
      break;
    case 'plan-admin':
      detail = { ...detail, color: '#669BBC', icon: <RiAdminLine /> };
      break;

    default:
      break;
  }

  return (
    <div className='notification-item-wrapper'>
      <div className='notification-content-wrapper'>
        <div className='notification-icon'>
          <span style={{ backgroundColor: detail.color }}>{detail.icon}</span>
        </div>
        <div className='notification-content'>
          <h3>{detail.title}</h3>
          <p>{detail.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
