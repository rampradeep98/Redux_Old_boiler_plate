import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { roles } from './Access';
import moment from 'moment';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
  return false;
};

export const TextShrinker = ({
  text = '',
  count = 15,
  placement = 'bottom',
  tooltip = true,
}) => {
  return (
    <>
      {text?.length > count ? (
        <>
          {tooltip ? (
            <OverlayTrigger
              delay={{ hide: 450, show: 300 }}
              overlay={(props) => <Tooltip {...props}>{text}</Tooltip>}
              placement={placement}>
              <span>
                {text.substring(0, count)}
                <span className='text-shrinker-ellipsis'>...</span>
              </span>
            </OverlayTrigger>
          ) : (
            <span>
              {text.substring(0, count)}
              <span className='text-shrinker-ellipsis'>...</span>
            </span>
          )}
        </>
      ) : (
        text
      )}
    </>
  );
};

export const ParsedToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Unauthorized Access');
    window.location.href = '/login';
    return;
  }
  const parsedToken = jwtDecode(token);
  return {
    ...parsedToken,
    fullName: `${parsedToken?.fname?.toUpperCase()} ${parsedToken?.lname?.toUpperCase()}`,
  };
};

export const UserRole = (currentPage, right) => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }
  let accessList = [];
  const decodedTokenValue = jwtDecode(token);
  if (decodedTokenValue?.access) {
    let access = decodedTokenValue.access;
    accessList = atob(access);
    accessList = JSON.parse(accessList);
  }

  const currentAccess = `${currentPage}:${right}`;

  const currentPageAccess = accessList.find((acc) => acc == currentAccess);

  if (!currentPageAccess) return false;

  return true;
};

export const dateFormate = (date) => {
  var dateDMY;
  if (date?.length === 10) {
    return (dateDMY = moment(date).format('DD-MM-YYYY'));
  }
  return moment(date).format('DD-MM-YYYY HH:mm:ss');
};
