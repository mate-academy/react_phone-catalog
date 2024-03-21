import React, { memo } from 'react';

import './ErrorMessage.scss';

type Props = {
  message: string;
};

export const ErrorMessage: React.FC<Props> = memo(({ message }) => {
  return <div className="ErrorMessage">{message}! Try again later.</div>;
});
