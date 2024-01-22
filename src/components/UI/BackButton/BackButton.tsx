import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const BackButton: React.FC = memo(() => {
  return (
    <Link to=".." className="back-button">
      <img src="./img/icons/arrow-left-icon.svg" alt="" />

      <span>Back</span>
    </Link>
  );
});
