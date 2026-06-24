import { ICONS } from '../../assets/icons';
import { useTheme } from '../../store/ThemeContext';
import style from './Back.module.scss';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBack} className={style.back}>
      <img src={theme === 'dark' ? ICONS.prev : ICONS.prevActive} alt="back" />
      <p className={style.back__text}>Back</p>
    </button>
  );
};
