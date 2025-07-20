import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ERRORS_LIST } from '../data/errors-data';

interface ErrorItem {
  code: string;
  message: string;
}

interface AppError {
  code: string;
  [key: string]: unknown;
}

export const handleError = (err: AppError): void => {
  const error: ErrorItem | undefined = ERRORS_LIST.find(
    (error: ErrorItem) => error.code === err.code,
  );

  if (!error) {
    console.error(err);
  } else {
    toast.warn(error.message, {
      closeOnClick: true,
      theme: 'dark',
    });
  }
};
