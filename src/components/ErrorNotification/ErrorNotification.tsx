import React, { useEffect } from 'react';
import { ErrorType } from '../../enums/ErrorType';

type Props = {
  errorType: number,
  setErrorType: CallableFunction,
};

export const ErrorNotification: React.FC<Props> = (props) => {
  const { errorType, setErrorType } = props;

  useEffect(() => {
    setTimeout(() => {
      setErrorType(ErrorType.Default);
    }, 3000);
  }, []);

  const getErrorText = (): string => {
    switch (errorType) {
      case ErrorType.LoadFromServer:
        return 'Unable to load products';
      case ErrorType.ItemsLengthZero:
        return 'There is no products on the server';
      case ErrorType.Default:
      default:
        return '';
    }
  };

  return (
    <div className="notification notification--error">
      {getErrorText()}
    </div>
  );
};
