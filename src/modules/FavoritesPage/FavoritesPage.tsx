import { PageContainer } from '../shared/components/PageContainer';
import { Path } from '../shared/components/Path';
import { Title } from '../shared/components/Title';
import { FC } from 'react';
import { Product } from '../../types/Product';
import { CatalogProducts } from '../shared/components/CatalogProducts';
import { useAppSelector } from '../../app/hooks';
import './../../styles/global.scss';

type Props = {
  products: Product[];
};

export const FavoritesPage: FC<Props> = ({ products }) => {
  const favoritesIds = useAppSelector(state => state.favorites);

  const favoritesProducts = products.filter(product =>
    favoritesIds.includes(product.itemId),
  );

  return (
    <PageContainer>
      <Path pathName={'favorites'} />
      <Title title={'Favorites'} amountPage={favoritesProducts.length} />
      {favoritesProducts.length > 0 ? (
        <CatalogProducts visibleProducts={favoritesProducts} />
      ) : (
        <h2 className="message">You don't have favorite products!</h2>
      )}
    </PageContainer>
  );
};
