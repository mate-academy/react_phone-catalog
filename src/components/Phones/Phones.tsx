import styles from './Phones.module.scss';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { Navigation } from '../Navigation/Navigation';
import { LangContext } from '../../context/LangContext';
import { Catalog } from '../Catalog/Catalog';
import { setPhonesAsync } from '../../features/phonesSlice';

export const Phones = () => {
  const { phones } = useAppSelector(state => state.phones);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!phones.length) {
      dispatch(setPhonesAsync());
    }
  }, [dispatch, phones.length]);

  return (
    <div className={styles.phones}>
      <div className={styles.phones__container}>
        <Navigation />
        <h2 className={styles.phones__title}>
          {translate('categories.phones', lang)}
        </h2>
        <Catalog items={phones} />
      </div>
    </div>
  );
};
