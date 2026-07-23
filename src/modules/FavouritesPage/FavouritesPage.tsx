// #regionImport
import React from 'react';
import styles from './FavouritesPage.module.scss';
import stylesCard from '@shared/ui/ProductCard/ProductCard.module.scss';

import { Container } from '@shared/components/Container';
import { useFavourites } from '@shared/context/FavouritesContext';
import { PageHeader } from '@shared/ui/PageHeader';
import { ProductCard } from '@shared/ui/ProductCard';
import { Typography } from '@shared/ui/Typography';
import { FadeIn } from '@shared/ui/FadeIn';
import { useTranslation } from 'react-i18next';
// #endregion

export const FavouritesPage: React.FC = () => {
  const { items } = useFavourites();
  const { t } = useTranslation();

  return (
    <Container>
      <FadeIn>
        <div className={styles.favourites}>
          <PageHeader
            title={t('favourites.title')}
            breadcrumbs={[{ label: t('favourites.title') }]}
            subtitle={
              items.length > 0
                ? `${items.length} ${t('items.item', { count: items.length })}`
                : undefined
            }
          />

          {items.length === 0 ? (
            <Typography variant="h3" className={styles.favouritesMessage}>
              {t('favourites.message')}
            </Typography>
          ) : (
            <div className={styles.favouritesList}>
              {items.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={stylesCard.cardProductsPage}
                />
              ))}
            </div>
          )}
        </div>
      </FadeIn>
    </Container>
  );
};
