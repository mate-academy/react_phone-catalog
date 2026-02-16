import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useColorChange } from './hooks/useColorChange';
import { getApi } from '../../../shared/api/api';
import { ProductPage } from '../../../shared/types/ProductPage';
import { PictureSlider } from '../../../shared/components/PictureSlider';
import { ProductType } from '../../../shared/types/ProductType';
import { MainControls } from './components/MainControls/MainControls';
import { About } from './components/About/About';
import { Caracteristiques } from './components/Caracteristiques/Caracteristiques';
import { Cards } from '../../HomePage/components/Cards';

import './ProductDetailsPage.scss';
import '../globals.scss';
import { useCapacityChange } from './hooks/useCpacityChange';
import { LoaderDetailsPage } from './components/LoaderDetailsPage/LoaderDetailsPage';
import { LoaderCards } from '../../../shared/components/LoaderCards';
import { ProductNotFound } from './components/ProductNotFound/ProductNotFound';

export const ProductDetailsPage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [product, setProduct] = useState<ProductType>({});
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsItems, setProductsItems] = useState<ProductPage[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [errorSuggest, setErrorSuggest] = useState<string>('');
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!category || !slug) {
      setError('Missing category or slug');
      setLoading(false);

      return;
    }

    getApi<ProductType[]>(`/${category}.json`)
      .then(productsData => {
        setProducts(productsData);
        const found = productsData.find(p => p.id === slug);

        if (found) {
          setProduct(found);
          setSelectedCapacity(found.capacity);
        } else {
          setError('Product was not found');
        }
      })
      .catch(err => {
        setError('Failed to load product');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [category, slug]);

  useEffect(() => {
    getApi<ProductPage[]>('/products.json')
      .then(products => {
        if (product) {
          const found1 = products.filter(
            item => item.category === product.category,
          );
          const suggestedItems = found1.sort(() => Math.random() - 0.5);

          setProductsItems(suggestedItems);
        }
      })
      .catch(error => {
        setErrorSuggest('Failed to load products');
        console.error('Failed to load suggestions:', error);
      });
  }, [product.category, product.id]);
  const handleColorChange = useColorChange(product, products, selectedCapacity);
  const handleCapacityChange = useCapacityChange(product, products);

  if (loading) {
    return <LoaderDetailsPage />;
  }

  if (error) {
    return <ProductNotFound />;
  }

  return (
    <section className="details-page">
      <div className="grid">
        <div className="breadcrumbs">
          <Link to={'/'}>
            <img src="/img/shared/Home.svg" alt="" />
            <img
              src="/img/shared/next-breadcrumbs.svg"
              alt=""
              className="next-breadcrumbs"
            />
          </Link>
          <Link to={`/${product.category}`} className="breadcrumbs-text">
            {product.category}
            <img
              src="/img/shared/next-breadcrumbs.svg"
              alt=""
              className="next-breadcrumbs"
            />
          </Link>
          <Link to={'#'}>
            {product.name}
            <img
              src="/img/shared/next-breadcrumbs.svg"
              alt=""
              className="next-breadcrumbs"
            />
          </Link>
        </div>
        <button onClick={() => navigate(-1)} className="go-back">
          <img src="/img/chevron-right.svg" alt="" />
          Back
        </button>

        <h1 className="product-title">{product.name}</h1>

        <PictureSlider
          imgs={product.images}
          start={touchStart}
          end={touchEnd}
          onAnimated={setIsAnimating}
          ShowDotsImg={true}
        />
        <MainControls
          products={product}
          activeColor={product.color}
          colors={product.colorsAvailable}
          capacitys={product.capacityAvailable}
          activeCapacity={selectedCapacity}
          onColor={handleColorChange}
          onCapacity={handleCapacityChange}
          itemsProducts={productsItems}
        />
        <About products={product} />

        <Caracteristiques products={product} />
        {loading && <LoaderCards />}

        {productsItems.length > 0 && !loading && (
          <section className="suggestions">
            <Cards
              title={'You may also like'}
              items={productsItems}
              isFullPrice={false}
            />
          </section>
        )}
        {errorSuggest !== '' && <p className="error">{errorSuggest}</p>}
      </div>
    </section>
  );
};
