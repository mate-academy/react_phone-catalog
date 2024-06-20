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
import { getProducts } from '../../services/products';
import { Categories } from '../../types/Categories';
import { Product } from '../../types/Product';
import { ProductDetail } from '../../types/ProductDetail';
import { getSuggestedProducts } from '../../utils/utils';

import { ButtonBack } from '../../ui/ButtonBack';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const fetchSuggestedProducts = useCallback(async () => {
    const result = await getProducts(productDetail?.category as Categories);

    return result;
  }, [productDetail?.category]);

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
    setLoading(true);

    fetchSuggestedProducts()
      .then(products => {
        setSuggestedProducts(getSuggestedProducts(products));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productDetail, fetchSuggestedProducts]);

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

  return (
    <>
      <Breadcrumbs
        category={productDetail?.category}
        productName={productDetail?.name}
      />

      <ButtonBack />

      <p className={styles.Title}>{productDetail?.name}</p>

      <section className={styles.ProductWrapper}>
        <ProductDetailPictures images={productDetail?.images} />
        <ProductDetailPurchase productDetail={productDetail} />
      </section>

      <section
        className={cn(styles.ProductWrapper, styles.ProductWrapperPrimary)}
      >
        <AboutProductDetail description={productDetail?.description} />
        <TechSpecsProduct productDetail={productDetail} />
      </section>

      {loading && <Loader />}

      <ProductList
        title="You may also like"
        products={suggestedProducts}
        isHaveSlider={true}
        isHotPrice={true}
      />
    </>
  );
};
