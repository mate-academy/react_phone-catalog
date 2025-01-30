import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../Icons';
import './BackButton.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={classNames('back-button', className)}
      onClick={() => navigate(-1)}
    >
      <ArrowLeftIcon />
      <span className="back-button__title">Back</span>
    </button>
  );
};
