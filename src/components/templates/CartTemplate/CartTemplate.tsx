import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/app/router';

import { Typography } from '@/components/atoms';
import { BackButton } from '@/components/molecules';
import { Breadcrumbs, CartContent } from '@/components/organisms';

import type { Data } from './CartTemplate.types';

import styles from './CartTemplate.module.scss';

export const CartTemplate = ({ data }: { data: Data }) => {
  const { cartContent } = data;
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[{ label: t('cart') }]}
        className={styles.breadcrumbs}
      />
      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        {t('back')}
      </BackButton>
      <div className={styles.cartHeader}>
        <Typography
          variant="h1"
          className={styles.cart}
        >
          {t('cart')}
        </Typography>
        <Link
          to={ROUTES.HISTORY}
          className={styles.historyButton}
        >
          {t('cartHistory')}
        </Link>
      </div>

      <CartContent data={cartContent} />
    </div>
  );
};
