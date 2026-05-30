import './ButtonBack.scss';
import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { GlobalContext } from '../../../context/GlobalContext';

export const ButtonBack: FC = () => {
  const { theme } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <button className="button" onClick={handleBack} type="button">
      <Icon icon={icons.arrow_left[theme]} />
      <span className="button-title">Back</span>
    </button>
  );
};
