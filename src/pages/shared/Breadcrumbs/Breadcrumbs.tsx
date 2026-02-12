import './Breadcrumbs.scss';
import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../context/GlobalContext';
import { capitalizeFirstCharacter } from '../../../utils';

type Props = {
  productType: string;
  productName?: string;
};

export const Breadcrumbs: FC<Props> = ({ productType, productName }) => {
  const { theme } = useContext(GlobalContext);

  const normalizeProductsType = useMemo(
    () => capitalizeFirstCharacter(productType),
    [productType],
  );

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <a
          href="/"
          className="breadcrumbs__link-home"
          aria-label="Go to home page"
        >
          <Icon icon={icons.home[theme]} />
        </a>

        <span className="breadcrumbs__arrow">
          <Icon icon={icons.arrow_right__disabled[theme]} />
        </span>

        {productName ? (
          <>
            <Link to={`/${productType}`}>
              <span className="breadcrumbs__item breadcrumbs__item--dark">
                {normalizeProductsType}
              </span>
            </Link>
            <span className="breadcrumbs__arrow">
              <Icon icon={icons.arrow_right__disabled[theme]} />
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
