import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  phonesQuantity: number;
  tabletsQuantity: number;
  accessoriesQuantity: number;
};

export const ShopByCategory: FC<Props> = ({
  phonesQuantity,
  tabletsQuantity,
  accessoriesQuantity,
}) => (
  <>
    <div className="shop-by-category__title">
      <h1>Shop by category</h1>
    </div>
    <div
      className="shop-by-category__links-container"
      data-cy="categoryLinksContainer"
    >
      <Link to="phones" className="shop-by-category__link">
        <div
          className="
            shop-by-category__img
            shop-by-category__img--phones
          "
        />
        <div className="shop-by-category__name">
          <h3>Mobile phones</h3>
        </div>
        <p className="shop-by-category__quantity">
          {`${phonesQuantity} models`}
        </p>
      </Link>

      <Link to="tablets" className="shop-by-category__link">
        <div
          className="
            shop-by-category__img
            shop-by-category__img--tablets
          "
        />
        <div className="shop-by-category__name">
          <h3>Tablets</h3>
        </div>
        <p className="shop-by-category__quantity">
          {`${tabletsQuantity} models`}
        </p>
      </Link>

      <Link to="accessories" className="shop-by-category__link">
        <div
          className="
            shop-by-category__img
            shop-by-category__img--accessories
          "
        />
        <div className="shop-by-category__name">
          <h3>Accessories</h3>
        </div>
        <p className="shop-by-category__quantity">
          {`${accessoriesQuantity} models`}
        </p>
      </Link>
    </div>
  </>
);
