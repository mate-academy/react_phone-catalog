/* eslint-disable prettier/prettier */

import styles from './ErrorMessage.module.scss';

const { errorBlock, errorText, reloadBtn } = styles;

interface Props {
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({
  message = 'Something went wrong. Please try again later.',
}) => {
  const handleReload = () => {
    window.location.reload(); 
  };

  return (
    <div className={errorBlock}>
      <p className={errorText}>{message}</p>
      <button type="button" className={reloadBtn} onClick={handleReload}>
        Try again
      </button>
    </div>
  );
};
