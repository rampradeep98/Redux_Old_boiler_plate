import React from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';

const Avatar = ({ name, scale = 70 }) => {
  const avatar = createAvatar(initials, {
    seed: name,
    scale: scale,
    chars: 2,
    fontWeight: 500,
  }).toDataUriSync();
  return <img src={avatar} alt="Avatar" />;
};

export default Avatar;
