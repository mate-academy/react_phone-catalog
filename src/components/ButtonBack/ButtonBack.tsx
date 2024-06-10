import React from 'react';
import './ButtonBack.scss';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};

export const ButtonBack: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleBackClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Link
      to="/"
      className="button-back"
      data-cy="backButton"
      onClick={e => handleBackClick(e)}
    >
      <img src="img/ico/arrow-left.svg" alt="arrow" />
      <span>Back</span>
    </Link>
  );
};
