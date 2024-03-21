import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ActiveButton } from '../ActiveButton';
import { Icon, Typography } from '../../base';

type Props = {
  className?: string;
};

export const ButtonBack: React.FC<Props> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <ActiveButton
      onClickHandler={() => navigate(-1)}
      className={clsx('back-button', className)}
    >
      <Icon id="arrow-left" width={16} height={16} className="arrow__icon" />
      <Typography type="text" size="sm" weight="600">
        Back
      </Typography>
    </ActiveButton>
  );
};
