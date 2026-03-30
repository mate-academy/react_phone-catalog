//hooks
import { useEffect, useMemo } from 'react';
import { useProducts } from '../../hooks/useProducts';

//react-router
import { useNavigate } from 'react-router-dom';

//styles
import styles from './HomePage.module.scss';

//componentes
import { Slider } from './components/Slider';
import { Carousel } from '../../components/Carousel';
import { Categories } from './components/Slider/Categories';
import { ProductCard } from '../../components/ProductCard';

//services
import { getSortedProducts } from '../../utils/productSortHelper';

//assets
import sliderPhones from '/img/banner-phones.png';
import sliderTablets from '/img/banner-tablets.png';
import sliderAccessories from '/img/banner-accessories.png';

export const HomePage = () => {
  const navigate = useNavigate();

  const { data: allProducts = [], isLoading } = useProducts();

  const { cheap, recommend } = useMemo(() => {
    const categories = ['phones', 'tablets', 'accessories'];

    return {
      cheap: categories.flatMap(category =>
        getSortedProducts(
          allProducts.filter(p => p.category === category),
          'price',
        ).slice(0, 5),
      ),

      recommend: categories.flatMap(category =>
        allProducts.filter(p => p.category === category).slice(0, 5),
      ),
    };
  }, [allProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

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
        {recommend.map(p => (
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
