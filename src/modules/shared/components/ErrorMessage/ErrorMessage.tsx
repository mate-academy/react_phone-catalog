import React, { useState } from 'react';
import '@/styles/main.scss';
import styles from './ErrorMessage.module.scss';
import classNames from 'classnames';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  const [show, setShow] = useState<boolean>(true);

  const hideError = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div
          className={classNames(styles.error, {
            [styles.error__visible]: show,
          })}
        >
          <h4>{message}</h4>
          <i onClick={hideError} className="icon icon--close"></i>
        </div>
      )}
    </>
  );
};
