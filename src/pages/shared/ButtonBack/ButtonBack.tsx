import './ButtonBack.scss';
import { FC, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../context/GlobalContext';

export const ButtonBack: FC = () => {
  const { theme } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="button" onClick={handleBack}>
      <Icon icon={icons.arrow_left[theme]} />

      <div className="button-title">Back</div>
    </div>
  );
};
