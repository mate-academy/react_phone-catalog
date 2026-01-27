import { useContext, useEffect, useState } from 'react';
import { ProductDetailContext } from '../../ProductDetailContext';
import { ProductDetail } from '../../types/ProductDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_CATEGORIES_LIST } from '../constants';

export function useSelectedProductDetail() {
  const { products, loading, loaded, error, reloadProducts } =
    useContext(ProductDetailContext);
  const [pageProducts, setProducts] = useState<ProductDetail[] | null>(null);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null,
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  if (
    pathSegments.length != 2 ||
    !HOME_CATEGORIES_LIST.includes(pathSegments[0])
  ) {
    navigate('/404');
  }

  const category = pathSegments[0];
  const itemId = pathSegments[1];

  useEffect(() => {
    if (loading) {
      return;
    }

    if (loaded) {
      const currentPageProducts = products[category];

      if (!currentPageProducts) {
        reloadProducts(category);
      }

      setProducts(currentPageProducts);
    }
  }, [products, category, loading, loaded, reloadProducts]);

  useEffect(() => {
    if (!loaded || !pageProducts) {
      setProductDetail(null);
    } else {
      setProductDetail(
        pageProducts.find(product => product.id === itemId) || null,
      );
    }
  }, [pageProducts, itemId, loaded]);

  return {
    productDetail,
    loading,
    error,
  };
}
