import { defineAbility } from '@casl/ability';
import jwtDecode from 'jwt-decode';

export default defineAbility((can, cannot) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedTokenValue = jwtDecode(token);
    if (decodedTokenValue?.access) {
      let access = decodedTokenValue.access;
      const accessList = atob(access);
      let accessArray = accessList.split(',');
      accessArray = JSON.parse(accessArray);
      accessArray.map((access) => {
        return can(access.split(':')[1], access.split(':')[0]);
      });
      return accessArray;
    }
  }
});
