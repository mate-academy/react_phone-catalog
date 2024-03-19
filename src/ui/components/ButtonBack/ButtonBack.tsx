import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ActiveButton } from '../ActiveButton';
import { Icon } from '../../base';

type Props = {};

export const ButtonBack: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <ActiveButton onClickHandler={() => navigate(-1)} className="back-button">
      <Icon id="arrow-left" width={16} height={16} className="arrow__icon" />
      <span>Back</span>
    </ActiveButton>
  );
};
