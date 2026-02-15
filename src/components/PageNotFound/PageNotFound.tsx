import styles from './PageNotFound.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { setPhonesAsync } from '../../features/phonesSlice';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  const { tablets } = useAppSelector(state => state.tablets);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tablets.length) {
      dispatch(setPhonesAsync());
    }
  }, [dispatch, tablets.length]);

  return (
    <div className={styles.notFound}>
      <h2 className={styles.notFound__title}>
        {translate('not-found.title', lang)}
      </h2>
      <Link
        to={'/'}
        className={`${styles.notFound__button} ${stylesBtn.button}`}
      >
        {translate('not-found.button', lang)}
      </Link>
      <img
        className={styles.notFound__img}
        src="img/page-not-found.png"
        alt="img page-not-found"
      />
    </div>
  );
};
