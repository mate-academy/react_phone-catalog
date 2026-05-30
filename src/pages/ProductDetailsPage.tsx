import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getSuggestedProducts } from '../helper/fetchProducts';
import { ProductsSlider } from '../components/ProductsSlider';
import { Product } from '../types/Product';
import { Details } from '../components/Details';
import '../App.scss';
import { CatalogContext } from '../components/CatalogContext';

export const ProductDetailsPage = () => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const { product } = useContext(CatalogContext);

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
    getSuggestedProducts(10).then(data => setRandomProducts(data));
  }, []);

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

      <div className="back details__back">
        <img
          src="./icons/Chevron-Arrow-Left.svg"
          alt="arrow"
          className="details__arrow-back"
          onClick={goBack}
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

      <Details />

      <div className="details__slider slider">
        <ProductsSlider
          products={randomProducts}
          unitName="You may also like"
        />
      </div>
    </>
  );
};
