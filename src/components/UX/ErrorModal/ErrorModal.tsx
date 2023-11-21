import React, { useEffect } from 'react';
import './error-modal.scss';
import { useCloseClick } from '../../../customHooks/useCloseClick';

type Props = {
  errorMessage: string;
  setErrorMessage: (v: string) => void;
};

export const ErrorModal: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  const [ref, isOpen, setIsOpen] = useCloseClick(true);

  useEffect(() => {
    return () => {
      setErrorMessage('');
    };
  }, [isOpen]);

  return (
    <div className="error-modal" ref={ref}>
      <div className="error-modal__content">
        <h1 className="error-modal__header">Error</h1>
        <p className="error-modal__message">{errorMessage}</p>
        <button
          className="error-modal__button"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
