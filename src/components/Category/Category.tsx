import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FullCard } from '../../types/fullInfoCard';
import styles from './Category.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  category: string;
  title: string;
};

export const Category: React.FC<Props> = ({ category, title }) => {
  const { productId } = useParams();
  const [curModel, setCurModel] = useState<FullCard | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`/api/${category}.json`)
      .then(res => res.json())
      .then(data => {
        setCurModel(data.find((item: FullCard) => item.id === productId));
      })
      .catch(() => {
        throw new Error('Fetch data error');
      });
  }, [productId, category]);

  return (
    <div className={styles.category}>
      <div className={styles.category__navigation}>
        <NavLink to={'/'} className={styles.category__navigation__home} />
        <div className={styles.category__navigation__arrow}></div>
        {!curModel ? (
          <p className={styles.category__navigation__text__active}>
            {t(title)}
          </p>
        ) : (
          <NavLink
            to={`/${category}`}
            className={styles.category__navigation__text}
          >
            {t(title)}
          </NavLink>
        )}

        {curModel && (
          <>
            <div className={styles.category__navigation__arrow}></div>
            <p
              className={
                styles.category__navigation__text__active +
                ' ' +
                styles.ellipsis
              }
            >
              {curModel.name}
            </p>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};
