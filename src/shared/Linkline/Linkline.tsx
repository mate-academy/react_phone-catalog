import './Linkline.scss';
import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../constants/icons';
import { GlobalContext } from '../../context/GlobalContext';
import { capitalize } from '../../utils/capitalize';

type Props = {
  productType: string;
  productName?: string;
};

export const Linkline: FC<Props> = ({ productType, productName }) => {
  const { theme } = useContext(GlobalContext);

  const normalizeProductsType = useMemo(
    () => capitalize(productType),
    [productType],
  );

  return (
    <div className="linkline">
      <div className="linkline__container">
        <a
          href="/"
          className="linkline__link-home"
          aria-label="Go to home page"
        >
          <Icon icon={icons.home[theme]} />
        </a>

        <span className="linkline__arrow">
          <Icon icon={icons.arrow_right__disabled[theme]} />
        </span>

        {productName ? (
          <>
            <Link to={`/${productType}`}>
              <span className="linkline__item linkline__item--dark">
                {normalizeProductsType}
              </span>
            </Link>
            <span className="linkline__arrow">
              <Icon icon={icons.arrow_right__disabled[theme]} />
            </span>
            <span className="linkline__item">{productName}</span>
          </>
        ) : (
          <span className="linkline__item">{normalizeProductsType}</span>
        )}
      </div>
    </div>
  );
};
