import styles from './Back.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import { useNavigate } from 'react-router-dom';
import { translate } from '../../utils/translate';
import { useAppSelector } from '../../app/hooks';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

export const Back = () => {
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);
  const { darkTheme } = useAppSelector(state => state.darkTheme);

  return (
    <div className={styles.back}>
      <div
        className={`${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__arrowLeft__dark : stylesIcon.icon__arrowLeft}`}
      ></div>
      <div className={styles.back__text} onClick={() => navigate(-1)}>
        {translate('link.back', lang)}
      </div>
    </div>
  );
};
