import { useLocation, useNavigate } from 'react-router-dom';
import s from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const backPath = location.state?.from || '/home';

    navigate(backPath);
  };

  return (
    <button className={s.backButton} onClick={handleClick} type="button">
      <span className={s.backButtonIcon}>‹</span>
      <span>Back</span>
    </button>
  );
};
