import React, { memo } from 'react';

import './WarningMessage.scss';

type Props = {
  message: string;
};

export const WarningMessage: React.FC<Props> = memo(({ message }) => {
  return <div className="WarningMessage">{message}!</div>;
});
