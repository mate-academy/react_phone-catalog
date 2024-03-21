import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './BackBtn.scss';

export const BackBtn: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <button
      type="button"
      aria-label="Go back"
      className="BackBtn"
      onClick={() =>
        navigate({
          pathname: state?.prevPathname || '..',
          search: state?.search || null,
        })
      }
      data-cy="backBtn"
    >
      <i className="fas fa-chevron-left BackBtn__chevron" />
      <span className="BackBtn__name">Back</span>
    </button>
  );
};
