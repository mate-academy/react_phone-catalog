import styles from './Categories.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { translate } from '../../utils/translate';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';
import { navigationSlice } from '../../features/navigationSlice';

const categories = ['phones', 'tablets', 'accessories'];

export const Categories = () => {
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);
  const { lang } = useContext(LangContext);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.categories}>
      {categories.map(category => (
        <div className={styles.category} key={category}>
          <Link to={`/${category}`} className={styles.categories__imgBox}>
            <img
              className={styles.categories__img}
              src={`img/categories-${category}-new.png`}
              alt={`category ${category}`}
              onClick={() => {
                window.scrollTo(0, 0);
                dispatch(navigationSlice.actions.clearLinks());
                dispatch(navigationSlice.actions.addLink(category));
              }}
            />
          </Link>
          <Link
            to={`/${category}`}
            className={styles.categories__titleBox}
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(navigationSlice.actions.clearLinks());
              dispatch(navigationSlice.actions.addLink(category));
            }}
          >
            <h4 className={styles.categories__title}>
              {translate(`categories.${category}`, lang)}
            </h4>
          </Link>
          <p className={styles.categories__text}>{`${
            category === 'phones'
              ? phones.length
              : category === 'tablets'
                ? tablets.length
                : accessories.length
          } ${translate('categories.models', lang)}`}</p>
        </div>
      ))}
    </div>
  );
};
