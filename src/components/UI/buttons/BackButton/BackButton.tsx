import React, { memo } from 'react';

import './BackButton.scss';
import ArrowIcon from '../../Icons/ArrowIcon';
import { useAppLocation } from '../../../../enhancers/hooks/appLocation';
import { useNavigate } from 'react-router-dom';
import { useDirection } from '../../../../enhancers/hooks/direction';

interface Props {
  className?: string,
}

export const BackButton: React.FC<Props> = memo(({ className }) => {
  const direction = useDirection();
  const { state } = useAppLocation();
  const navigate = useNavigate();

  const goBack = () => {
    if (state && state.prevPage) {
      navigate(direction(state.prevPage));
    } else {
      navigate(-1);
    }
  };

  return (
    <button className={`back-button ${className || ''}`} onClick={goBack}>
      <ArrowIcon className='back-button__icon' />
      <span>Back</span>
    </button>
  );
});
