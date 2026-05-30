import React, { useCallback } from 'react';
import './ButtonBack.scss';
import { useNavigate } from 'react-router-dom';
import { icons } from '../../../constants/icons';
import { Icon } from '../Icon';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="button-back" onClick={handleButtonBack}>
      <Icon icon={icons.arrowLeft} />
      <div className="button-back__text">Back</div>
    </div>
  );
};
