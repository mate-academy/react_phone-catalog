import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { Navigation } from '../Navigation/Navigation';
import styles from './Tablets.module.scss';
import { LangContext } from '../../context/LangContext';
import { Catalog } from '../Catalog/Catalog';
import { setPhonesAsync } from '../../features/phonesSlice';

export const Tablets = () => {
  const { tablets } = useAppSelector(state => state.tablets);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tablets.length) {
      dispatch(setPhonesAsync());
    }
  }, [dispatch, tablets.length]);

  return (
    <div className={styles.tablets}>
      <div className={styles.tablets__container}>
        <Navigation />
        <h1 className={styles.tablets__title}>
          {translate('categories.tablets', lang)}
        </h1>
        <Catalog items={tablets} />
      </div>
    </div>
  );
};
