import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import home from '../../images/icons/Home.svg';
import arrow from '../../images/icons/disable_arrow.png';

import './ProductDetailsPage.scss';
import { getProductByID } from '../../api/products';
import { PhoneDetails } from '../../types/PhoneDetails';

import cn from 'classnames';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();

  const [currentProduct, setCurrentProduct] = useState<PhoneDetails | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (productId) {
      getProductByID(productId)
        .then(product => {
          setCurrentProduct(product);
          setCurrentImage(product.images[0]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  return (
    <div className="productDetails">
      <div className="productDetails__header">
        <Link to="/">
          <img
            src={home}
            alt="home"
            className="productDetails__icons"
          />
        </Link>
        <img
          src={arrow}
          alt="arrow"
          className="productDetails__icons"
        />
        <Link to="/phones" className="productDetails__currentPage">Phones</Link>
        <img
          src={arrow}
          alt="arrow"
          className="productDetails__icons"
        />
        <p className="productDetails__currentPage">{currentProduct?.name}</p>
      </div>
      <div className="productDetails__back">
        <img
          src={arrow}
          alt="arrow"
          className="productDetails__icons-left"
        />
        <Link to="/phones" className="productDetails__currentPage">Back</Link>
      </div>
      <p className="productDetails__title">{currentProduct?.name}</p>
      <ul className="productDetails__imagesList">
        {currentProduct?.images.map(image => (
          <li key={image} className="productDetails__listItem">
            <Link
              to={{ pathname }}
              className="productDetails__link"
            >
              <img
                src={`_new/${image}`}
                alt={image}
                className="productDetails__image"
              />
            </Link>
          </li>
        ))}
      </ul>
      <img src={`_new/${currentImage}`} alt={currentImage} />
    </div>
  );
};
