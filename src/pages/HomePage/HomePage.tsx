//hooks
import { useEffect, useState } from 'react';

//react-router
import { useNavigate } from 'react-router-dom';

//styles
import styles from './HomePage.module.scss';

//componentes
import { Slider } from './components/Slider';
import { Carousel } from '../../components/Carousel';
import { Categories } from './components/Slider/Categories';
import { ProductCard } from '../../components/ProductCard';

//types
import { ProductDetailed } from '../../types/product';

//services
import { getProductsByType } from '../../services/api';
import { getSortedProducts } from '../../utils/productSortHelper';

//assets
import sliderPhones from '/img/banner-phones.png';
import sliderTablets from '/img/banner-tablets.png';
import sliderAccessories from '/img/banner-accessories.png';

export const HomePage = () => {
  const [recomend, setRecomend] = useState<ProductDetailed[]>([]);
  const [cheap, setCheap] = useState<ProductDetailed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        scrollToTop();
        const [phones, tablets, accessories] = await Promise.all([
          getProductsByType('phones'),
          getProductsByType('tablets'),
          getProductsByType('accessories'),
        ]);

        setRecomend(
          [phones, tablets, accessories].flatMap(items => items.slice(0, 5)),
        );

        setCheap(
          [phones, tablets, accessories].flatMap(items =>
            getSortedProducts(items, 'price').slice(0, 5),
          ),
        );
      } catch {
        navigate('*');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [navigate]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <Slider className={styles.slider}>
        <img src={sliderPhones} alt="phones" />
        <img src={sliderTablets} alt="tablets" />
        <img src={sliderAccessories} alt="accesories" />
      </Slider>

      <Carousel
        title={'Brand new models'}
        isLoading={isLoading}
        loaderStyle={styles.loader}
        className={styles.carousel}
      >
        {recomend.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            className={styles.productCard}
            onClick={() => navigate(`/${p.category}/${p.id}`)}
          />
        ))}
      </Carousel>

      <Categories className={styles.categories} />

      <Carousel
        title={'Hot prices'}
        isLoading={isLoading}
        loaderStyle={styles.loader}
        className={styles.carousel}
      >
        {cheap.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            className={styles.productCard}
            onClick={() => navigate(`/${p.category}/${p.id}`)}
          />
        ))}
      </Carousel>
    </div>
  );
};
