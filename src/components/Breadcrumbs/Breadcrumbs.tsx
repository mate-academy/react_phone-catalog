import {
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  Link,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { useAppSelector } from '../../app/hooks';
import { getProductDetails } from '../../api/products';
import { capitalizeFirstLetter } from '../../utils/capitalizedText';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { product } = useAppSelector(state => state.selectedProduct);

  const location = useLocation();
  const pageName = location.pathname.split('/').slice(1)[0];

  const { productId = '' } = useParams();

  const [isSelected, setIsSelected] = useState(false);

  const pageTitle = capitalizeFirstLetter(pageName);

  const productName = useMemo(() => {
    if (!product && productId) {
      getProductDetails(productId);
    }

    return product?.name;
  }, [product, productId]);

  useEffect(() => {
    if (productId) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, []);

  return (
    <div
      className="
        page-status
        grid__item--desktop-1-24"
      data-cy="breadCrumbs"
    >
      <Link
        to="/"
        className="page-status__home"
      >
        <Icon type={IconType.HOME} />
      </Link>

      <Icon type={IconType.ARROW_RIGHT_DISABLED} />

      {isSelected ? (
        <>
          <Link
            to={`/${pageName}`}
            className="page-status__link-title"
          >
            {pageTitle}
          </Link>

          <Icon type={IconType.ARROW_RIGHT_DISABLED} />

          <span className="page-status__title">
            {productName}
          </span>
        </>
      ) : (
        <span className="page-status__title">
          {pageTitle}
        </span>
      )}
    </div>
  );
};
