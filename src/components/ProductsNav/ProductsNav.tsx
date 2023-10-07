import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './ProductsNav.scss';
import { Context } from '../../context/Context';
import { getProductDetails } from '../../api/Products';

export const ProductsNav: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useContext(Context);
  const location = useLocation();
  const { productId = '' } = useParams();
  const [isProduct, setIsProduct] = useState(false);

  const pageLink = location.pathname.split('/').slice(1)[0];
  const pageTitle = pageLink.charAt(0).toUpperCase() + pageLink.slice(1);

  const productTitle = useMemo(() => {
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
      <div className="productsNav">
        <Link to="/" className="productsNav__home" />

        {isProduct ? (
          <>
            <Link
              to={`/${pageLink}`}
              className="productsNav__link"
            >
              {pageTitle}
            </Link>

            <p className="productsNav__link productsNav__link--title">
              {productTitle}
            </p>
          </>
        ) : (
          <Link
            to={`/${pageLink}`}
            className="productsNav__link productsNav__link--disabled"
          >
            {pageTitle}
          </Link>
        )}
      </div>
    </>
  );
};
