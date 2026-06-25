import { useEffect, useMemo, useState } from 'react';
import { Main } from '../../components/Main/Main';
import { TopContent } from './components/TopContent';
import { ModelsSlider } from '../../components/ModelsSlider';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../shared/types/Product';
import { getSuggestedProducts } from '../shared/utils/getSuggestedProducts';
import { ModelInfo } from './components/ModelInfo';
import { getProducts } from '../shared/utils/fetchClient';
import { Model } from '../shared/types/Model';
import { ErrorContent } from '../../components/ErrorContent/ErrorContent';

export const ProductPage = ({
  productCategory,
}: {
  productCategory: string;
}) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [models, setModels] = useState<Model[]>([]);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    getProducts<Product[]>('api/products.json')
      .then(setProducts)
      .catch(() => setErrorMessage('Similar models not found'));
  }, []);

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);
    getProducts<Model[]>(`api/${productCategory}.json`)
      .then(modelsFromServer => {
        setModels(modelsFromServer);
      })
      .catch(() => setErrorMessage('Download error'))
      .finally(() => setLoading(false));
  }, [productCategory, reload]);

  const currentModel = useMemo(
    () => models.find(m => m.id === productId),
    [models, productId],
  );

  const handleVariantChange = (newColor: string, newCapacity: string) => {
    const found = models.find(
      m =>
        m.namespaceId === currentModel?.namespaceId &&
        m.color === newColor &&
        m.capacity === newCapacity,
    );

    if (!found) {
      setErrorMessage('Product variant not found');

      return;
    }

    navigate(`/${productCategory}/${found.id}`, { replace: true });
  };

  useEffect(() => {
    if (productId && products.length > 0) {
      getSuggestedProducts(productId, products, { count: 4 }).then(
        setSimilarProducts,
      );
    }
  }, [productId, products]);

  if (loading) {
    return <ErrorContent loading={true} error={false} />;
  }

  if (errorMessage || (models.length > 0 && !currentModel)) {
    return (
      <ErrorContent
        loading={false}
        error={true}
        errorMessage={errorMessage || 'Model not found'}
        onClick={() => setReload(prev => prev + 1)}
      />
    );
  }

  return (
    <Main className="model">
      {currentModel && (
        <TopContent
          model={currentModel}
          onVariantChange={handleVariantChange}
        />
      )}
      {currentModel && <ModelInfo model={currentModel} />}
      {similarProducts.length > 0 && (
        <ModelsSlider title="You may also like" products={similarProducts} />
      )}
    </Main>
  );
};
