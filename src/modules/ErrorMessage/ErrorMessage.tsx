import React from 'react';

type ErrorMessageProps = {
  onReload: () => void;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ onReload }) => {
  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={onReload}>Reload</button>
    </div>
  );
};

export default ErrorMessage;