import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AboutProductDetail } from '../../components/AboutProductDetail';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader/Loader';
import { ProductDetailPictures } from '../../components/ProductDetailPictures';
import { ProductDetailPurchase } from '../../components/ProductDetailPurchase';
import { ProductList } from '../../components/ProductList';
import { TechSpecsProduct } from '../../components/TechSpecsProduct';

import { getAccessories, getPhones, getTablets } from '../../services/devices';
import { Categories } from '../../types/Categories';
import { ProductDetail } from '../../types/ProductDetail';
import { getSuggestedProducts } from '../../utils';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProductsByCategory } from '../../store/slices/productsSlice';
import { ButtonBack } from '../../ui/ButtonBack';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const { items } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const suggestedProducts = getSuggestedProducts(items);

  const fetchAllProducts = useCallback(async () => {
    dispatch(fetchProductsByCategory(productDetail?.category as Categories));
  }, [dispatch, productDetail?.category]);

  const fetchPhones = async () => {
    const result = await getPhones();

    return result;
  };

  const fetchTablets = async () => {
    const result = await getTablets();

    return result;
  };

  const fetchAccessories = async () => {
    const result = await getAccessories();

    return result;
  };

  const fetchProducts = useCallback(() => {
    return Promise.all([fetchPhones(), fetchTablets(), fetchAccessories()]);
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [productDetail, dispatch, fetchAllProducts]);

  useEffect(() => {
    setLoading(true);

    fetchProducts()
      .then(products => {
        const result = products.flat();
        const product = result.find(item => item.id.toString() === productId);

        if (product) {
          setProductDetail(product);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId, fetchProducts]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumbs
        category={productDetail?.category}
        productName={productDetail?.name}
      />

      <ButtonBack />

      <p className={styles.title}>{productDetail?.name}</p>

      <section className={styles.productWrapper}>
        <ProductDetailPictures images={productDetail?.images} />
        <ProductDetailPurchase products={items} productDetail={productDetail} />
      </section>

      <section
        className={cn(styles.productWrapper, styles.productWrapperPrimary)}
      >
        <AboutProductDetail description={productDetail?.description} />
        <TechSpecsProduct productDetail={productDetail} />
      </section>

      <ProductList
        title="You may also like"
        products={suggestedProducts}
        isHaveSlider={true}
        isHotPrice={true}
      />
    </>
  );
};
