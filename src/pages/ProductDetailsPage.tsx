import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getProductDetails,
  getSuggestedProducts,
} from '../helper/fetchProducts';
import { ProductDetails } from '../types/ProductDetails';
import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider';
import { Product } from '../types/Product';
import { Details } from '../components/Details';
import '../App.scss';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const { productId } = useParams<{ productId?: string }>();
  const [currentImage, setCurrentImage] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState('');
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [productNotFound, setProductNotFound] = useState(false);

  const location = useLocation();
  const productCategory = location.pathname.slice(
    1,
    location.pathname.indexOf('/', 1),
  );

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setProductNotFound(false);
    if (productId) {
      setProductDetailsLoading(true);
      getProductDetails(productId, productCategory)
        .then(productData => {
          if (productData !== null) {
            setProduct(productData);
            setCurrentImage(
              productData.images.length > 0 ? productData.images[0] : '',
            );
            setActiveColor(
              productData.colorsAvailable.length > 0
                ? productData.colorsAvailable[0]
                : '',
            );
            setActiveCapacity(
              productData.capacityAvailable.length > 0
                ? productData.capacityAvailable[0]
                : '',
            );
          } else {
            setProductNotFound(true);
          }
        })
        .catch()
        .finally(() => {
          setProductDetailsLoading(false);
        });
    }

    getSuggestedProducts(10).then(data => setRandomProducts(data));
  }, [productId]);

  return (
    <>
      <div className="brandcrumbs details__url">
        <Link to="/">
          <img src="./icons/Home.svg" alt="home" className="details__home" />
        </Link>
        <img
          src="./icons/Chevron-Arrow-Right--disabled.svg"
          alt="arrow"
          className="details__url-arrow"
        />
        <button
          type="button"
          className="brandcrumbs__name details__url-pathname"
          onClick={goBack}
          data-cy="backButton"
        >
          {productCategory}
        </button>
        <img
          src="./icons/Chevron-Arrow-Right--disabled.svg"
          alt="arrow"
          className="details__url-arrow"
        />
        <p className="brandcrumbs__name details__url-searchname">
          {product?.name}
        </p>
      </div>

      <div className="back">
        <img
          src="./icons/Chevron-Arrow-Right.svg"
          alt="arrow"
          className="back__arrow"
        />
        <button
          type="button"
          className="back__button"
          onClick={goBack}
          data-cy="backButton"
        >
          Back
        </button>
      </div>

      {productDetailsLoading && <Loader />}
      {productNotFound && (
        <p className="details__not-found">Phone was not found</p>
      )}
      {!productDetailsLoading && !productNotFound && product !== null && (
        <Details
          product={product}
          currentImage={currentImage}
          activeCapacity={activeCapacity}
          activeColor={activeColor}
          setImage={setCurrentImage}
          setCapacity={setActiveCapacity}
          setColor={setActiveColor}
        />
      )}
      <div className="you-may-like">
        <ProductsSlider
          products={randomProducts}
          unitName="You may also like"
        />
      </div>
    </>
  );
};
