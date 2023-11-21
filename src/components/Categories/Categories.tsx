import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product, ProductType } from '../../types/Product';
import './Categories.scss';

export const Categories: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getQuantity = (type: ProductType) => products
    .filter(product => product.category === type).length;

  const phonesCount = getQuantity('phones');
  const tabletsCount = getQuantity('tablet');
  const accesoriesCount = getQuantity('accessory');

  useEffect(() => {
    getProducts()
      .then(setProducts);
  });

  return (
    <div className="categories">
      <h1 className="categories__title">
        Shop by category
      </h1>

      <div
        data-cy="categoryLinksContainer"
        className="categories__links"
      >
        <Link
          to="/phones"
          className="categories__link"
        >
          <div
            className="categories__photo-container
            categories__photo-container--yelow"
          >
            <img
              src="img/category-phones.png"
              alt="phone"
              className="categories__photo"
            />
          </div>
          <h3 className="categories__product-title">
            Mobile phones
          </h3>

          <p className="categories__product-quantity">
            {phonesCount}
          </p>
        </Link>

        <Link
          to="/tablets"
          className="categories__link"
        >
          <div
            className="categories__photo-container
            categories__photo-container--grey"
          >
            <img
              src="img/category-tablets.png"
              alt=""
              className="categories__photo"
            />
          </div>
          <h3 className="categories__product-title">
            Tablets
          </h3>

          <p className="categories__product-quantity">
            {tabletsCount}
          </p>
        </Link>

        <Link
          to="/accessories"
          className="categories__link"
        >
          <div
            className="categories__photo-container
            categories__photo-container--red"
          >
            <img
              src="img/category-accessories.png"
              alt=""
              className="categories__photo"
            />
          </div>
          <h3 className="categories__product-title">
            Accessories
          </h3>

          <p className="categories__product-quantity">
            {accesoriesCount}
          </p>
        </Link>

      </div>
    </div>
  );
};
