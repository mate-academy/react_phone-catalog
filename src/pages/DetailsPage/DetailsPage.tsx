import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import './DetailsPage.scss';
import {
  ArrowRightGrayImg,
  ArrowLeftGrayImg,
  homeImg,
} from '../../utils/indes';
import { getSuggestedProducts } from '../../servises';
import { StateProduct } from '../../context/ProductContext';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductById } from '../../api/httpClient';
import ImageContant from './ImageContant/ImageContant';
import DescriptionContant from './DescriptionContant/DescriptionContant';
import TechspecsContant from './TechspecsContant/TechspecsContant';
import MainControls from './MainControls/MainControls';
import Loader from '../../components/Loader/Loader';

const DetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const { products, handleAction, isError } = useContext(StateProduct);

  const paths = pathname.slice(1).split('/');

  const suggestedProducts = getSuggestedProducts(products, productId);
  const productFromStorage = products.find(item => item.itemId === productId);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const newProduct = await getProductById(productId);

        setProduct(newProduct);
      } catch (error) {
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [productId]);

  const onFavouritesClick = () => {
    if (productFromStorage) {
      handleAction(productFromStorage, 'favourites');
    }
  };

  const onCartClick = () => {
    if (productFromStorage) {
      handleAction(productFromStorage, 'cart');
    }
  };

  return (
    <div className="detailsPage">
      {!isLoading && isError && (
        <>
          {' '}
          <div>Somthing weng wrong</div>{' '}
        </>
      )}
      {isLoading && (
        <div className="detailsPage__loader">
          <Loader />
        </div>
      )}
      {!isLoading && !isError && (
        <div className="detailsPage__block">
          <div className="detailsPage__navigation">
            <Link to="/">
              <img src={homeImg} alt="Home" />
            </Link>
            <img src={ArrowRightGrayImg} alt="ArrowRight" />
            <Link to={`/${paths[0]}`} className="detailsPage__navigation-link">
              <p className="detailsPage__navigation-title">{paths[0]}</p>
            </Link>
            <img src={ArrowRightGrayImg} alt="ArrowRight" />
            <p className="detailsPage__navigation-title">
              {paths[1].split('-').join(' ')}
            </p>
          </div>
          <div className="detailsPage__navigation">
            <Link to=".." className="detailsPage__navigation-link">
              <img src={ArrowLeftGrayImg} alt="AroowLeft" />
            </Link>
            <Link to=".." className="detailsPage__navigation-link">
              <p className="detailsPage__navigation-title">{'Back'}</p>
            </Link>
          </div>

          {product && productFromStorage ? (
            <>
              <h2 className="detailsPage__name">{product.name}</h2>
              <ImageContant images={product.images} itemName={product.name} />
              <MainControls
                product={product}
                productFromStorage={productFromStorage}
                onFavouritesClick={onFavouritesClick}
                onCartClick={onCartClick}
                pathname={pathname}
              />
              <div className="detailsPage__id">
                <p>{`ID: ${productFromStorage.id}`}</p>
              </div>
              <DescriptionContant itemDetails={product.description} />
              <TechspecsContant itemDetails={product} />
            </>
          ) : (
            <div>Somthing weng wrong</div>
          )}
        </div>
      )}
      {!isLoading && (
        <ProductSlider title="You may also like" products={suggestedProducts} />
      )}
    </div>
  );
};

export default DetailsPage;
