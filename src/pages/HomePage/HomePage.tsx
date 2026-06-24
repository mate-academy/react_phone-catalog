import React, { useContext, useMemo } from 'react';
import '../../styles/style.scss';
import { CartsContext } from '../../components/Context/CartsContext';
import { FavouritesContext } from '../../components/Context/FavouritesContext';
import { ProductCardItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CategoryCard } from '../../components/CategoryCard';
import { HomeSlider } from '../../components/Slider/HomeSlider';
import { ProductSlider } from '../../components/Slider/ProductSlider';
import { images } from '../../utils/images';
import { useProducts } from '../../utils/getProducts';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const { carts, setCarts } = useContext(CartsContext);
  const { favourites, setFavourites } = useContext(FavouritesContext);

  const { allProducts, loading, error } = useProducts();

  const phones = allProducts.filter(p => p.category === 'phones');
  const tablets = allProducts.filter(p => p.category === 'tablets');
  const accessories = allProducts.filter(p => p.category === 'accessories');

  const toggleCart = (item: ProductCardItem) => {
    setCarts(prev => {
      const exiting = prev.find(c => c.id === item.id);

      if (exiting) {
        return prev.filter(c => c.id !== item.id);
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const toggleFavourite = (item: ProductCardItem) => {
    setFavourites(prev =>
      prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item],
    );
  };

  const mapToCardItem = (product: Product): ProductCardItem => {
    return {
      id: product.itemId,
      itemId: product.itemId,
      name: product.name,
      price: product.price,
      fullPrice: product.fullPrice,
      image: product.image,
      screen: product.screen,
      ram: product.ram,
      capacity: product.capacity,
      category: product.category,
      color: product.color,
    };
  };

  const newestProducts = useMemo(
    () => [...allProducts].sort((a, b) => b.year - a.year),
    [allProducts],
  );
  const newestCards = useMemo(
    () => newestProducts.map(mapToCardItem),
    [newestProducts],
  );

  const favouriteIds = useMemo(
    () => new Set(favourites.map(f => f.id)),
    [favourites],
  );

  const cartIds = useMemo(() => new Set(carts.map(c => c.id)), [carts]);

  const hotProducts = useMemo(() => {
    return allProducts.map(mapToCardItem).sort((a, b) => {
      const dA = a.fullPrice - a.price;
      const dB = b.fullPrice - b.price;

      return dB - dA;
    });
  }, [allProducts]);

  if (loading) {
    return (
      <div className="page home">
        <p>
          <Loader />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page home">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="page home">
        <section className="home__top">
          <h2 className="home__title text-h1">
            Welcome to Nice Gadgets store!
          </h2>
        </section>
        <section className="home__hot-prices"></section>
      </div>
      <section className="home__new-models">
        <HomeSlider>
          <SwiperSlide>
            <div className="home-slide">
              <img src={images.Slide1} alt="" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="home-slide">
              <img src={images.Slide2} alt="" />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="home-slide">
              <img src={images.Slide3} alt="" />
            </div>
          </SwiperSlide>
        </HomeSlider>
      </section>

      <section className="productSlider__product-slider">
        <ProductSlider
          title="Brand new models"
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {newestCards.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                products={product}
                isFavourite={id => favouriteIds.has(id)}
                isCarts={id => cartIds.has(id)}
                handleToggleFavourite={toggleFavourite}
                handleToggleCarts={toggleCart}
              />
            </SwiperSlide>
          ))}
        </ProductSlider>
      </section>

      <section className="home__category">
        <CategoryCard
          title="Phones"
          image={images.Phones}
          count={phones.length}
          mobTitle="Mobile Phones"
        />

        <CategoryCard
          title="Tablets"
          image={images.Tablets}
          count={tablets.length}
        />

        <CategoryCard
          title="Accessories"
          image={images.Accessories}
          count={accessories.length}
        />
      </section>

      <section className="productSlider__product-slider hot-prices">
        <ProductSlider
          title="Hot prices"
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {hotProducts.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                products={product}
                productsDiscount={product.price}
                isFavourite={id => favouriteIds.has(id)}
                isCarts={id => cartIds.has(id)}
                handleToggleFavourite={toggleFavourite}
                handleToggleCarts={toggleCart}
              />
            </SwiperSlide>
          ))}
        </ProductSlider>
      </section>
    </>
  );
};
