import { useContext, useEffect } from 'react';
import { SectionSlider } from '../../sectionSlider';
import { ShopByCategory } from '../../shopByCategory';
import { getAllProducts } from '../../../utils/api';
import { ProductContext } from '../../../context/ProductContext';
import { Slider } from '../../slider';
import styles from './homePage.module.scss';
import { Title } from '../../title';
import { titles } from '../../../constants/titles';

export const HomePage = () => {
  const { products, setProduct, setIsLoading, setErrorMessage } =
    useContext(ProductContext);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    setProduct([]);
    getAllProducts()
      .then(setProduct)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setProduct, setErrorMessage, setIsLoading]);

  const hotPrices = [...products]
    .filter(product => product.year !== 2019)
    .sort((prod1, prod2) => prod2.price - prod1.price);

  const filteredNewBrand = [...products].filter(prod => prod.year === 2019);

  return (
    <div className={styles.homePage}>
      <div className={styles.homeTop}>
        <Title title={titles.homePageTitle} />
        <Slider />
      </div>
      <SectionSlider product={filteredNewBrand} />
      <ShopByCategory />
      <SectionSlider product={hotPrices} hotPrice />
    </div>
  );
};
