import './ProductDetailsPage.scss';
import { useContext, useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { SpecificProduct } from '../../types/SpecificProduct';
import { ProductContentTop } from './components/ProductContentTop';
import { ProductContentBottom } from './components/ProductContentBottom';
import { GlobalContext } from '../../store/GlobalContext';
import { ProductsSlider } from '../shared/ProductsSlider';
import { Loader } from '../shared/Loader';
import { ButtonBack } from '../shared/ButtonBack';
import { getSpecificProducts } from '../../utils/productApi';

export const ProductDetailsPage: React.FC = () => {
  const { products } = useContext(GlobalContext);
  const { productsType, productItemId } = useParams();

  const [selectedProduct, setSelectedProduct] =
    useState<SpecificProduct | null>(null);
  const [specificProducts, setSpecificProducts] = useState<SpecificProduct[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const suggestedProducts = useMemo(() => {
    return products
      .filter(
        product =>
          product.category === productsType && product.itemId !== productItemId,
      )
      .sort(() => 0.5 - Math.random());
  }, [products, productsType, productItemId]);

  useEffect(() => {
    if (!productsType) {
      setError('Тип продукта не указан');

      return;
    }

    setIsLoading(true);
    setError(null);

    const timeout = setTimeout(() => {
      getSpecificProducts(productsType)
        .then(fetchedSpecificProducts => {
          setSpecificProducts(fetchedSpecificProducts);

          const currentProduct = fetchedSpecificProducts.find(
            product => product.id === productItemId,
          );

          if (currentProduct) {
            setSelectedProduct(currentProduct);
            setError(null);
          } else {
            setSelectedProduct(null);
            setError('Продукт не найден');
          }
        })
        .catch(er => {
          setError(`Ошибка загрузки продуктов: Категории продуктов "${productsType}" не существует. ${er.message}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [productsType]);

  useEffect(() => {
    if (!productItemId || !specificProducts.length) {
      return;
    }

    const currentProduct = specificProducts.find(
      product => product.id === productItemId,
    );

    if (currentProduct) {
      setSelectedProduct(currentProduct);
      setError(null);
    } else {
      setSelectedProduct(null);
      setError('Продукт не найден');
    }
  }, [productItemId, specificProducts]);

  if (!productsType) {
    return (
      <div className="error-message">
        <h2>Ошибка: Тип продукта не указан.</h2>
        {/* Дополнительно можно добавить кнопку для возврата */}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />; // Показываем лоадер во время загрузки
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
        <Link to="/">Go to HomePage</Link>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="error-message">
        <h2>Продукт не найден</h2>
        <Link to="/">Go to HomePage</Link>
      </div>
    );
  }

  return (
    <div className="detailsPage">
      <Breadcrumbs
        productType={productsType}
        productName={selectedProduct.name}
      />

      <ButtonBack />

      <h2 className="detailsPage__title">{selectedProduct.name}</h2>

      <ProductContentTop
        selectedProduct={selectedProduct}
        specificProducts={specificProducts}
      />

      <ProductContentBottom selectedProduct={selectedProduct} />

      <div className="detailsPage__like-block">
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
          displayType="with-discount"
        />
      </div>
    </div>
  );
};
