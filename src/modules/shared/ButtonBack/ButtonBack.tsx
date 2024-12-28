import React, { useCallback } from 'react';
import './ButtonBack.scss';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';
import { useNavigate } from 'react-router-dom';

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="button" onClick={handleBack}>
      <Icon icon={iconsObject.arrow_left} />
      <span className="button-title">Back</span>
    </div>
  );
};
