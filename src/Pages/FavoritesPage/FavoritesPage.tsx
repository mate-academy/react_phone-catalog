import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { History } from '../../Components/History/HistoryNav';
import { NoResult } from '../../Components/NoResult/NoResult';
import { SearchProducts } from '../../Components/SearchProducts/SearchProducts';
import { Product } from '../../helpers/types/Product';
import { getSearchProducts } from '../../helpers/utils/searchHelper';
/* eslint-disable-next-line */
import { getLinkForProductCard } from '../../helpers/utils/getLinkForProductCard';
/* eslint-disable-next-line */
import { ProductCardInfo } from '../../Components/ProductCardInfo/ProductCardInfo';

type Props = {
  favoriteProducts: Product[],
  setFavorite: (item: Product) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const FavoritesPage: FC<Props> = ({
  favoriteProducts,
  setFavorite,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  if (!favoriteProducts.length) {
    return <NoResult message="Favourites product not selected" />;
  }

  if (query) {
    return (
      <SearchProducts
        products={getSearchProducts(favoriteProducts, query)}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        favoriteProducts={favoriteProducts}
        setFavorite={setFavorite}
      />
    );
  }

  return (
    <div className="productPage">
      <History pages={['Favourites']} />
      <h1 className="productPage__title">Favourites</h1>
      <p className="productPage__subTitle">{`${favoriteProducts.length} models`}</p>
      <div className="productPage__productList">
        {favoriteProducts.map(product => (
          <Link
            to={`/${getLinkForProductCard(product.type)}/${product.id}`}
            className="productCard"
            key={product.id}
            data-cy="cardsContainer"
          >
            <ProductCardInfo
              favoriteProducts={favoriteProducts}
              product={product}
              setFavorite={setFavorite}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
