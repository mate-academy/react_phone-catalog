import React, { FC } from 'react';
import './Empty.scss';
type Props = {
  srcImage: string;
};

export const Empty: FC<Props> = ({ srcImage }) => {
  if (!srcImage) {
  }

  return (
    <div className="empty">
      <img src={`${srcImage}`} alt="emptyCard" className="empty__img" />
    </div>
  );
};
