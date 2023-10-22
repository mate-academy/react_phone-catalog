import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import phonesImage from '../../images/Phones.png';
import tabletsImage from '../../images/Tablets.png';
import accessoriesImage from '../../images/Accessories.png';
import './ShopByCategory.scss';

interface Props {
  amountOfDevices: { phones: number; tablets: number; accessories: number };
}

export const ShopByCategory: FC<Props> = ({ amountOfDevices }) => {
  const { phones, tablets, accessories } = amountOfDevices;
  const [searchParams] = useSearchParams();

  return (
    <div className="shop-by-category">
      <h2 className="shop-by-category__title">Shop by category</h2>
      <div
        className="shop-by-category__wrapper"
        data-cy="categoryLinksContainer"
      >
        <Link
          className="shop-by-category__link"
          to={{
            pathname: '/phones',
            search: searchParams.toString(),
          }}
        >
          <div className="shop-by-category__img-wrapper">
            <img
              className="shop-by-category__img"
              src={phonesImage}
              alt="phones"
            />
            <div className="shop-by-category__img-description">
              <h3 className="shop-by-category__img-title">Mobile phones</h3>
              <p className="shop-by-category__img-amount">{`${phones} models`}</p>
            </div>
          </div>
        </Link>

        <Link
          className="shop-by-category__link"
          to={{
            pathname: '/tablets',
            search: searchParams.toString(),
          }}
        >
          <div className="shop-by-category__img-wrapper">
            <img
              className="shop-by-category__img"
              src={tabletsImage}
              alt="tablets"
            />
            <div className="shop-by-category__img-description">
              <h3 className="shop-by-category__img-title">Tablets</h3>
              <p className="shop-by-category__img-amount">{`${tablets} models`}</p>
            </div>
          </div>
        </Link>

        <Link
          className="shop-by-category__link"
          to={{
            pathname: '/accessories',
            search: searchParams.toString(),
          }}
        >
          <div className="shop-by-category__img-wrapper">
            <img
              className="shop-by-category__img"
              src={accessoriesImage}
              alt="accessories"
            />
            <div className="shop-by-category__img-description">
              <h3 className="shop-by-category__img-title">Accessories</h3>
              <p className="shop-by-category__img-amount">{`${accessories} models`}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
