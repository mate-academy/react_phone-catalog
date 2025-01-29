import styles from './ProductNotFoundPage.module.scss';
import ProductNotFoundImg from '../../images/product-not-found.png';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoBackButton } from '../../components/GoBackButton';
import { useNavigate } from 'react-router-dom';

type Props = {
  title?: string;
};

export const ProductNotFoundPage: React.FC<Props> = React.memo(({ title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onGoBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.productNotFoundPage} id="productNotFoundPage">
      <p className={styles.message}>{t('notFoundPage.message')}</p>
      <img
        src={ProductNotFoundImg}
        alt="Product Not Found 404"
        className={styles.image}
      />
      <h1 className={styles.title}>{title}</h1>

      <GoBackButton
        onClick={onGoBackHome}
        title={t('notFoundPage.backHome')}
        link={'/'}
      />
    </div>
  );
});

ProductNotFoundPage.displayName = 'ProductNotFoundPage';
