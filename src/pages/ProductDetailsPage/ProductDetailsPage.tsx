import './ProductDetailsPage.scss';
import { ProductDetailsCard } from '../../components/ProductDetailsCard';
import { useAppDispatch, useAppSelector } from '../../customHooks/customHooks';
import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/getProducts';
import { setProducts } from '../../expansions/products';
import { ProductDetails } from '../../types/ProductDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { Loader } from '../../components/Loader';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Slider } from '../../components/Slider';
import { NotFoundPage } from '../NotFoundPage';
import productNotFoundImg from '../../images/product-not-found.png';
import sliderArrow from '../../images/logo/sliderArrow.svg';

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsDetails, setProductsDetails] = useState<ProductDetails[]>([]);
  const navigate = useNavigate();
  const { products } = useAppSelector(state => state.products);
  const { productId = '' } = useParams();
  const { pathname } = useLocation();
  const id = productId.slice(1);
  const currentProduct: ProductDetails | undefined = productsDetails.find(
    item => item.id === id,
  );
  const dispatch = useAppDispatch();

  const path = pathname.slice(1);
  const category = path.split('/').slice(0, 1).join();

  useEffect(() => {
    getProducts()
      .then(resolve => {
        dispatch(setProducts(resolve));
      })
      .catch(() => 'Unable to load data from server!');
  }, [dispatch]);

  useEffect(() => {
    getProductsByCategory(category).then(setProductsDetails);
  }, [category, id]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [currentProduct?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  const productsForSlider = products
    .filter(product => product.itemId !== id)
    .filter(item => item.category === category)
    .filter(
      item =>
        currentProduct && currentProduct?.priceDiscount - item.fullPrice <= 100,
    );

  useEffect(() => {
    getProducts()
      .then(resolve => {
        dispatch(setProducts(resolve));
      })
      .catch(() => 'Unable to load data from server!');
  }, [dispatch]);

  if (!isLoading && !currentProduct) {
    return (
      <NotFoundPage
        title={'Ooops...Product not found!'}
        image={productNotFoundImg}
      />
    );
  }

  return (
    <div className="productDetailsPage">
      <BreadCrumbs currentProduct={currentProduct} />

      <button
        className="productDetailsPage__back_button"
        onClick={() => navigate(-1)}
      >
        <img
          src={sliderArrow}
          alt="Back-button"
          className="productDetailsPage__back_button__img"
        />
        <span className="productDetailsPage__back_button__text">Back</span>
      </button>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductDetailsCard
            products={products}
            currentProductsDetails={currentProduct}
          />
          {currentProduct && (
            <Slider
              products={productsForSlider}
              title={'You may also like'}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </div>
  );
};
