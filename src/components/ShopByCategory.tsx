import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import './ShopByCategory.scss';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  function getCountProducts(categoryName: string) {
    return products.reduce(
      (count, item) => (item.category === categoryName ? count + 1 : count), 0,
    );
  }

  const phonesCount = getCountProducts('phones');
  const tabletsCount = getCountProducts('tablets');
  const accessoriesCount = getCountProducts('accessories');

  return (
    <div className="shop-by-category">
      <h2 className="shop-by-category__title">Shop by category</h2>

      <div className="shop-by-category__content">
        <Link
          to="/phones"
          className="shop-by-category__category"
          data-cy="categoryLinksContainer"
        >
          <div className="shop-by-category__image-box
            shop-by-category__image-box--phones"
          >
            <img
              className="shop-by-category__image
                shop-by-category__image--phones"
              src="./img/category/category-phones.png"
              alt="Mobile phones"
            />
          </div>

          <h3 className="shop-by-category__name">
            Mobile phones
          </h3>

          <div className="shop-by-category__product-count">
            {`${phonesCount} models`}
          </div>
        </Link>

        <Link
          to="/tablets"
          className="shop-by-category__category"
          data-cy="categoryLinksContainer"
        >
          <div className="
          shop-by-category__image-box shop-by-category__image-box--tablets
          "
          >
            <img
              className="shop-by-category__image
              shop-by-category__image--tablets"
              src="./img/category/category-tablets.png"
              alt="Mobile phones"
            />
          </div>

          <h3 className="shop-by-category__name">
            Tablets
          </h3>

          <div className="shop-by-category__product-count">
            {`${tabletsCount} models`}
          </div>
        </Link>

        <Link
          to="/accessories"
          className="shop-by-category__category"
          data-cy="categoryLinksContainer"
        >
          <div className="
          shop-by-category__image-box shop-by-category__image-box--accessories
          "
          >
            <img
              className="shop-by-category__image
              shop-by-category__image--accessories"
              src="./img/category/category-accessories.png"
              alt="Mobile phones"
            />
          </div>

          <h3 className="shop-by-category__name">
            Accessories
          </h3>

          <div className="shop-by-category__product-count">
            {`${accessoriesCount} models`}
          </div>
        </Link>
      </div>
    </div>
  );
};
