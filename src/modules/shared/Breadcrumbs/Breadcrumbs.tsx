import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons.config';
import { GlobalContext } from '../../../context/GlobalContext';
import { capitalizeFirstCharacter } from '../../../utils';
import { BreadcrumbsProps } from './types/types';
import './Breadcrumbs.scss';

// Виносимо компонент ArrowIcon
const ArrowIcon: FC<{ theme: string }> = ({ theme }) => (
  <span className="breadcrumbs__arrow">
    <Icon icon={icons.arrow_right__disabled[theme]} />
  </span>
);

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  productType,
  productName,
}) => {
  const { theme } = useContext(GlobalContext);

  const capitalizedProductType = useMemo(
    () => capitalizeFirstCharacter(productType),
    [productType],
  );

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <Link
          to="/"
          className="breadcrumbs__link-home"
          aria-label="Go to home page"
        >
          <Icon icon={icons.home[theme]} />
        </Link>

        <ArrowIcon theme={theme} />

        {productName ? (
          <>
            <Link to={`/${productType}`}>
              <span className="breadcrumbs__item breadcrumbs__item--dark">
                {capitalizedProductType}
              </span>
            </Link>

            <ArrowIcon theme={theme} />

            <span className="breadcrumbs__item">{productName}</span>
          </>
        ) : (
          <span className="breadcrumbs__item">{capitalizedProductType}</span>
        )}
      </div>
    </div>
  );
};
