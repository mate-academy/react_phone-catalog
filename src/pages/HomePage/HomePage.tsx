import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { SliderImage } from '../../components/SliderImage/SliderImage';
import styles from './HomePage.module.scss';
import { ProductSliderTitles } from '../../types/Types';
import { ShopCategories } from '../../components/ShopCategories/ShopCategories';
import { useMemo } from 'react';
import { useStoreContext } from 'src/context/StoreContext';

const sliderData = [
  {
    src: 'img/banner-tablets.png',
    to: '/tablets',
  },
  {
    src: 'img/banner-accessories.png',
    to: '/accessories',
  },
  {
    src: 'img/banner-phones.png',
    to: '/phones',
  },
];

export const HomePage = () => {
  const { products, productByCategory } = useStoreContext();

  const categoriesData = useMemo(
    () => [
      {
        title: 'Mobile phones',
        quantity: productByCategory.phones.length,
        to: '/phones',
        src: 'img/category-phones-2.png',
      },
      {
        title: 'Tablets',
        quantity: productByCategory.tablets.length,
        to: '/tablets',
        src: 'img/category-tablets-2.png',
      },
      {
        title: 'Accessories',
        quantity: productByCategory.accessories.length,
        to: '/accessories',
        src: 'img/category-accessories-2.png',
      },
    ],
    [productByCategory],
  );

  const brandNewPhones = useMemo(
    () =>
      products.filter(prod => prod.year >= 2022 && prod.category === 'phones'),
    [products],
  );

  const hotPricePhones = useMemo(
    () =>
      products
        .slice()
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 10),
    [products],
  );

  return (
    <section className={styles.homePage}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
        <SliderImage sliderData={sliderData} />
      </section>

      <ProductSlider
        products={brandNewPhones}
        title={ProductSliderTitles.brandNew}
        sliderTitle="brand-new-models"
      />
      <ShopCategories
        title={'Shop by category'}
        categoriesData={categoriesData}
      />

      <ProductSlider
        products={hotPricePhones}
        title={ProductSliderTitles.hotPrices}
        showFullPrice={true}
        sliderTitle={'hotPrices'}
      />
    </section>
  );
};
