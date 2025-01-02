import React, { useCallback, useContext } from 'react';
import './ButtonBack.scss';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../store/GlobalContext';

export const ButtonBack: React.FC = () => {
  const { theme } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="button" onClick={handleBack}>
      {theme === 'light' ? (
        <Icon icon={iconsObject.arrow_left} />
      ) : (
        <Icon icon={iconsObject.arrow_left_dark} />
      )}
      <span className="button-title">Back</span>
    </div>
  );
};
