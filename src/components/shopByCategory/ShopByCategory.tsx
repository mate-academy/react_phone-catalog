import React, { useContext } from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsContext } from '../../context/ProductsContext';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const context = useContext(ProductsContext);
  const { isLoading } = context;

  const getGoods = (good: string) => products.filter(p => p.category === good);

  return (
    <section className="shop_by_category">
      <h2 className="shop_by_category-title">Shop by category</h2>

      <div className="shop_by_category-div">
        <Link className="shop_by_category--link" to="/phones">
          <div className="shop_by_category-bg-gold phone-gold" />
          <h3 className="shop_by_category__subtitle">Mobile phones</h3>
          <p className="shop_by_category__models-number">
            {isLoading ? 'Loading...' : `${getGoods('phones').length} models`}
          </p>
        </Link>

        <Link className="shop_by_category--link" to="/tablets">
          <div className="shop_by_category-bg-grey tablet-grey" />
          <h3 className="shop_by_category__subtitle">Tablets</h3>
          <p className="shop_by_category__models-number">
            {isLoading ? 'Loading...' : `${getGoods('tablets').length} models`}
          </p>
        </Link>

        <Link className="shop_by_category--link" to="/accessories">
          <div className="shop_by_category-bg-red phones-red" />
          <h3 className="shop_by_category__subtitle">Accessories</h3>
          <p className="shop_by_category__models-number">
            {isLoading
              ? 'Loading...'
              : `${getGoods('accessories').length} models`}
          </p>
        </Link>
      </div>
    </section>
  );
};
