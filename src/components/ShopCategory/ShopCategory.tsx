import { Link } from 'react-router-dom';
import phones_banner from '../../images/phones-banner.png';
import tablets_banner from '../../images/tablets-banner.png';
import accessories_banner from '../../images/accessories-banner.png';
import { Product } from '../../types/Products';
import './ShopCategory.scss';

type Props = {
  products: Product[],
};

export const ShopCategory: React.FC<Props> = ({ products }) => {
  const phonesDescription = [...products]
    .filter(item => item.category === 'phones');
  const tabletsDescription = [...products]
    .filter(item => item.category === 'tablets');
  const accessoriesDescription = [...products]
    .filter(item => item.category === 'accessories');

  return (
    <div
      data-cy="categoryLinksContainer"
      className="shop-category"
    >
      <div className="shop-category__container">
        <div className="shop-category__title">Shop by category</div>
        <div className="shop-category__row">
          <div className="shop-category__item item-shop-category">
            <Link
              to="/phones"
              className="item-shop-category__image"
            >
              <img
                src={phones_banner}
                alt="BannerImage"
                className="item-shop-category__img"
              />

            </Link>
            <div className="item-shop-category__body">
              <div className="item-shop-category__title">Mobile phones</div>
              <div className="item-shop-category__description">
                {phonesDescription.length}
                {' '}
                models
              </div>
            </div>
          </div>
          <div className="shop-category__item item-shop-category">
            <Link
              to="/tablets"
              className="item-shop-category__image"
            >
              <img
                src={tablets_banner}
                alt="TabletsBannerImage"
                className="item-shop-category__img"
              />
            </Link>
            <div className="item-shop-category__body">
              <div className="item-shop-category__title">Tablets</div>
              <div className="item-shop-category__description">
                {tabletsDescription.length}
                {' '}
                models
              </div>
            </div>
          </div>
          <div className="shop-category__item item-shop-category">
            <Link
              to="/accessories"
              className="item-shop-category__image"
            >
              <img
                src={accessories_banner}
                alt="AccessoriesBannerImage"
                className="item-shop-category__img"
              />
            </Link>
            <div className="item-shop-category__body">
              <div className="item-shop-category__title">Accessories</div>
              <div className="item-shop-category__description">
                {accessoriesDescription.length}
                {' '}
                models
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
