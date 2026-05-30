import './Breadcrumbs.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../store/GlobalContext';

type Props = {
  productType: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productType, productName }) => {
  const { theme } = useContext(GlobalContext);

  const normalizeProductsType =
    productType && productType.charAt(0).toUpperCase() + productType.slice(1);

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <a
          href="/"
          className="breadcrumbs__link-home"
          aria-label="Go to home page"
        >
          {theme === 'light' ? (
            <Icon icon={iconsObject.home} />
          ) : (
            <Icon icon={iconsObject.home_dark} />
          )}
        </a>

        <span className="breadcrumbs__arrow">
          {theme === 'light' ? (
            <Icon icon={iconsObject.arrow_right__disabled} />
          ) : (
            <Icon icon={iconsObject.arrow_right_dark__disabled} />
          )}
        </span>

        {productName ? (
          <>
            <Link to={`/${productType}`}>
              <span className="breadcrumbs__item breadcrumbs__item--dark">
                {normalizeProductsType}
              </span>
            </Link>
            <span className="breadcrumbs__arrow">
              {theme === 'light' ? (
                <Icon icon={iconsObject.arrow_right__disabled} />
              ) : (
                <Icon icon={iconsObject.arrow_right_dark__disabled} />
              )}
            </span>
            <span className="breadcrumbs__item">{productName}</span>
          </>
        ) : (
          <span className="breadcrumbs__item">{normalizeProductsType}</span>
        )}
      </div>
    </div>
  );
};
