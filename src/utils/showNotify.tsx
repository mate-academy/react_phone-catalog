import { Slide, toast } from 'react-toastify';

export function showNotify(message: string, theme: 'dark' | 'light' = 'light') {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme,
    transition: Slide,
  });
}
