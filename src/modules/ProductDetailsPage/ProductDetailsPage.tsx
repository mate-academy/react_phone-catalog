import { Breadcrumbs } from '../shared/Breadcrumbs';
import './ProductDetailsPage.scss';
import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SpecificProduct } from '../../types/SpecificProduct';

import { ProductContentTop } from './components/ProductContentTop';
import { ProductContentBottom } from './components/ProductContentBottom';
import { getSpecificProducts, GlobalContext } from '../../store/GlobalContext';
import { ProductsSlider } from '../shared/ProductsSlider';
import { Loader } from '../shared/Loader';

export const ProductDetailsPage: React.FC = () => {
  const { products } = useContext(GlobalContext);

  const [selectedProduct, setSelectedProduct] =
    useState<SpecificProduct | null>(null);

  const [specificProducts, setSpecificProducts] = useState<SpecificProduct[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { productsType, productItemId } = useParams();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const suggestedProducts = useMemo(() => {
    const filteredProducts = products.filter(
      product =>
        product.category === productsType && product.itemId !== productItemId,
    );

    return filteredProducts.sort(() => 0.5 - Math.random());
  }, [products, productsType, productItemId]);

  useEffect(() => {
    if (!productsType) {
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      getSpecificProducts(productsType)
        .then(fetchedSpecificProducts => {
          setSpecificProducts(fetchedSpecificProducts);
        })
        .catch(er => {
          setError(`Ошибка загрузки продуктов: ${er.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [productsType]);

  const currentProductObject = specificProducts.find(
    product => product.id === productItemId,
  );

  useEffect(() => {
    if (currentProductObject) {
      setSelectedProduct(currentProductObject);
    }
  }, [productItemId, currentProductObject]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedProduct) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className="detailsPage">
      <Breadcrumbs
        productType={productsType!}
        productName={selectedProduct.name}
      />
      <button className="detailsPage__button-back" onClick={handleBack}>
        Back
      </button>
      <h2 className="detailsPage__title">{selectedProduct.name}</h2>

      <ProductContentTop selectedPhone={selectedProduct} />

      <ProductContentBottom selectedPhone={selectedProduct} />

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
