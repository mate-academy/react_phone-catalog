import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { ProductCardInfo } from '../ProductCardInfo/ProductCardInfo';
/* eslint-disable-next-line */
import { getLinkForProductCard } from '../../helpers/utils/getLinkForProductCard';

type Props = {
  products: Product[],
  favoriteProducts: Product[],
  setFavorite: (item: Product) => void,
  selectedProducts: Product[],
  setSelectedProducts: (item: Product) => void,
};

export const SearchProducts: FC<Props> = ({
  products,
  favoriteProducts,
  setFavorite,
  selectedProducts,
  setSelectedProducts,
}) => (
  <div className="searchProducts">
    <p className="searchProducts__subTitle">{`${products.length} results`}</p>
    <div className="searchProducts__productList">
      {products.map(product => (
        <Link
          to={`/${getLinkForProductCard(product.type)}/${product.id}`}
          className="productCard"
          key={product.id}
        >
          <ProductCardInfo
            setSelectedProducts={setSelectedProducts}
            selectedProducts={selectedProducts}
            favoriteProducts={favoriteProducts}
            product={product}
            setFavorite={setFavorite}
          />
        </Link>
      ))}
    </div>
  </div>
);
