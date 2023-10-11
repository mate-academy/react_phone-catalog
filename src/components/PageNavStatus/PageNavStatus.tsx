import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Context } from '../Context';
import { Icon } from '../Icon';
import { getProductDetails } from '../../api/products';
import { capitalizeFirstLetter } from '../../utils/styleString';
import { IconType } from '../../types/Icon';
import './PageNavStatus.scss';

export const PageNavStatus: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(Context);
  const { productId = '' } = useParams();
  const location = useLocation();

  const [isProduct, setIsProduct] = useState(false);

  const currentPage = location.pathname.split('/').slice(1)[0];
  const currentPageTitle = capitalizeFirstLetter(currentPage);

  const currentProductTitle = useMemo(() => {
    if (!selectedProduct && productId) {
      getProductDetails(productId)
        .then((productItem) => {
          setSelectedProduct(productItem);
        });
    }

    return selectedProduct?.name;
  }, [selectedProduct, productId]);

  useEffect(() => {
    if (productId.length > 0) {
      setIsProduct(true);
    } else {
      setIsProduct(false);
    }
  }, []);

  return (
    <>
      <div
        className="
          category-page__status
          status
          grid__item--tablet-1-12
          grid__item--desktop-1-24"
        data-cy="breadCrumbs"
      >
        <Link
          to="/"
          className="status__home"
        >
          <Icon
            type={IconType.HOME}
          />
        </Link>

        <Icon
          type={IconType.ARROW_RIGHT}
          addClassName="status__arrow"
        />

        {!isProduct
          && (
            <p className="status__title">
              {currentPageTitle}
            </p>
          )}

        {isProduct
          && (
            <Link
              to={`/${currentPage}`}
              className="status__parent-title"
            >
              {currentPageTitle}
            </Link>
          )}

        {isProduct
          && (
            <>
              <Icon
                type={IconType.ARROW_RIGHT_DISABLED}
                addClassName="status__arrow"
              />

              <p className="status__title">
                {currentProductTitle}
              </p>
            </>
          )}
      </div>
    </>
  );
};
