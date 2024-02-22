import { useMemo } from 'react';
import { Banner } from '../Banner';
import { ShopByCategory } from '../ShopByCategory';
import { ProductsSlider } from '../ProductsSlider';
import { Product } from '../../types';
import { useAppSelector } from '../../app/hooks';

export const getHotPriceProducts = (products: Product[]) => {
  const productsWithAbsoluteDiscount
    = products
      .filter(product => product.discount > 0)
      .sort((pr1, pr2) => (
        pr1.price * (pr1.discount / 100) - pr2.price * (pr2.discount / 100)
      ));

  return productsWithAbsoluteDiscount;
};

export const getBrandNewProducts = (products: Product[]) => {
  const productsWithoutDiscount
    = products
      .filter(product => !product.discount)
      .sort((pr1, pr2) => (
        pr1.price - pr2.price
      ));

  return productsWithoutDiscount;
};

export const HomePage = () => {
  const { allProducts: products } = useAppSelector(store => store.products);

  const productsWithHotPrice = useMemo(() => {
    return getHotPriceProducts(products);
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return getBrandNewProducts(products);
  }, [products]);

  return (
    <>
      <Banner />
      <ProductsSlider
        title="Hot prices"
        items={productsWithHotPrice}
        classNames="main__hot-prices"
      />
      <ShopByCategory />
      <ProductsSlider
        items={brandNewProducts}
        title="Brand new models"
        classNames="main__brand-new-models"
      />
    </>
  );
};
