import { useEffect, useMemo, useState } from 'react';
import style from './Home.Page.module.scss';
import { PicturesSlider } from './PicturesSlider';
import { Products } from '../../types/Types';
import { getData } from '../../api/data';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { HotPrice } from '../../components/HotPrice';

export const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMesage] = useState('');

  useEffect(() => {
    getData<Products>('/products.json')
      .then(data => {
        setProducts(data);
      })
      .catch(() => setErrorMesage('Something went wrong. Please try again'))
      .finally(() => setIsLoading(false));
  }, []);

  const brendNewProducts = useMemo(
    () =>
      [...products]
        .sort((productA, productB) => productB.year - productA.year)
        .map(item => ({ ...item, fullPrice: item.price })),
    [products],
  );

  const hotPriceProducts = useMemo(
    () =>
      [...products].sort(
        (productA, productB) =>
          productB.fullPrice -
          productB.price -
          (productA.fullPrice - productA.price),
      ),
    [products],
  );

  return (
    <div className={style.homePage}>
      <h1 className={style['homePage__title-hidden']}>Product Catalog</h1>
      <h2 className={style.homePage__title}>
        Welcome to Nice <br className={style.homePage__breake} />
        Gadgets store!
      </h2>

      <PicturesSlider />

      {!isLoading && (
        <ProductsSlider
          titleLine1="Brand new"
          titleLine2="models"
          products={brendNewProducts}
        />
      )}

      {errorMessage && (
        <div className={style.homePage__error}>{errorMessage}</div>
      )}

      <ShopByCategory />

      <HotPrice title="Hot price" products={hotPriceProducts} />

      {errorMessage && (
        <div className={style.homePage__error}>{errorMessage}</div>
      )}
    </div>
  );
};
