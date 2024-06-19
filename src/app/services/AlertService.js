import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

export const Alert = (type, payload, isCenter = false) => {
  let optionsNotCenter = {
    position: 'top-center',
    autoClose: 5000,
    theme: 'colored',
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      padding: '16px',
    },
  };
  let optionsCenter = {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    style: {
      padding: '16px',
    },
  };

  const options = !isCenter ? optionsNotCenter : optionsCenter;
  if (!payload) return;

  switch (type) {
    case 'success':
      toast.success(`${payload}!`, options);
      break;
    case 'error':
      if (typeof payload === 'object') {
        payload.map((error) => {
          return toast.error(error.msg, options);
        });
      } else {
        toast.error(`${payload}!`, options);
      }
      break;
    case 'info':
      toast.info(`${payload}!`, options);
      break;
    case 'warning':
      toast.custom(
        <div
          style={{
            background: 'yellow',
            position: 'absolute',
            width: '250px',
            transition: 'all 0.5s ease-out',
          }}>
          {payload}
        </div>,
        options
      );
      break;
    default:
      toast.info(`${payload}!`, options);
      break;
  }
};

export const handleGoogleError = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      Alert('error', 'Invalid Email ! Please try again');
      break;
    case 'auth/user-not-found':
      Alert('error', 'User not found ! Please try again');
      break;
    case 'auth/wrong-password':
      Alert('error', 'Wrong Password ! Please try again');
      break;
    case 'auth/user-disabled':
      Alert('error', 'User disabled ! Please Contact Admin');
      break;
    case 'auth/too-many-requests':
      Alert('Sorry !', 'Too many attempts ! Please try again later');
      break;
    case 'auth/email-already-in-use':
      Alert('error', 'Email already in use ! Please Login');
      break;
    case 'auth/api-error':
      Alert('error', 'Server Error. Please try again later');
      break;
    default:
      Alert('error', 'Something went wrong ! Please try again');
      break;
  }
};

export const deleteConfirmationAlert = Swal.mixin({
  position: 'top-end',
  buttonsStyling: false,
  title: 'Are you sure?',
  icon: 'question',
  text: "You won't be able to revert this!",
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true,

  width: 350,
  padding: '10px',
  customClass: {
    container: 'exp-container',
    header: 'exp-header',
    title: 'exp-title',
    icon: 'exp-icon',
    htmlContainer: 'exp-htmlContainer',
    confirmButton: 'exp-btn btn btn-sm custom-btn-danger     ',
    cancelButton: 'exp-btn btn  btn-sm custom-btn-dark outline',
    actions: 'exp-actions',
  },
  showClass: {
    popup: 'animate__animated animate__slideInDown',
  },
  hideClass: {
    popup: 'animate__animated animate__slideOutUp',
  },
});
