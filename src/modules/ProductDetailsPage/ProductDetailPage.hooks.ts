import { useContext, useEffect, useMemo, useState } from 'react';
import { ProductDetailContext } from '../../ProductDetailContext';
import { ProductDetail } from '../../types/ProductDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getProductDetailId,
  ProductCatalogContext,
} from '../../ProductCatalogContext';

export function useSelectedProductDetail() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [category, itemId] = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);

    return [segments[0] || '', segments[1]];
  }, [pathname]);

  const { products, statuses, reloadProducts } =
    useContext(ProductDetailContext);

  const status = statuses[category] ?? '';

  const { loaded: loadedProductCatalog, productDetailIdToProductId } =
    useContext(ProductCatalogContext);

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null,
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }, [pathname]);

  useEffect(() => {
    if (
      itemId &&
      loadedProductCatalog &&
      !productDetailIdToProductId[getProductDetailId({ category, itemId })]
    ) {
      navigate('/404');
    }
  }, [
    navigate,
    category,
    loadedProductCatalog,
    productDetailIdToProductId,
    itemId,
  ]);

  useEffect(() => {
    if (!status) {
      reloadProducts(category);
    }
  }, [status, products, category, reloadProducts]);

  useEffect(() => {
    if (status === 'loaded' && products[category]) {
      const foundProduct =
        products[category].find(p => p.id === itemId) || null;

      setProductDetail(foundProduct);
      if (!foundProduct) {
        navigate('/404');
      }
    }
  }, [status, products, category, itemId, navigate]);

  const loaded = !(!status || status === 'loading' || status === 'error');

  return {
    productDetail,
    loading: !status || status === 'loading',
    error: status === 'error',
    loaded,
  };
}
