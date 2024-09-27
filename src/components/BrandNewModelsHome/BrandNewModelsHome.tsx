import React, { useEffect, useMemo, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Products } from '../../types/products';
import { Link, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../LocaleStorage';
import classNames from 'classnames';
import { useWindowResize } from '../../useWindowSize';

type Props = {
  type: 'Hot Prices' | 'Brand new models' | 'You may also like';
};

export const BrandNewModelsHome: React.FC<Props> = ({ type }) => {
  const [width, height] = useWindowResize();

  const [favorites, setFavorites] = useLocalStorage<Products[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<Products[]>('cart', []);

  const [models, setModels] = useState<Products[]>([]);
  const [sortedModels, setSortedModels] = useState<Products[]>([]);
  const location = useLocation()

  function hotPrices(products: Products[]) {
    return [...products].sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;
      return discountB - discountA;
    });
  }

  const toggleFavorite = (product: Products) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const toogleCart = (product: Products) => {
    const isCart = cart.some(el => el.id === product.id);

    if (isCart) {
      setCart(cart.filter(el => el.id !== product.id))
    } else {
      setCart([...cart, product]);
    }
  };

  function brandNewModels(products: Products[]) {
    return [...products].sort((a, b) => {
      return new Date(b.year).getTime() - new Date(a.year).getTime();
    });
  }

  function alsoLike(products: Products[]) {
    return products;
  }

  const slidesPerView = useMemo(() => {
    return width > 1200
      ? 5
      : width > 900
        ? 4
        : width > 800
          ? 3.5
          : width > 700
            ? 3
            : width > 600
              ? 2.5
              : width > 450
                ? 2
                : width > 400
                  ? 1.6
                  : 1.4;
  }, [width]);
  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then(data => {
        setModels(data);
      });
  }, []);

  useEffect(() => {
    let sorted;
    switch (type) {
      case 'Hot Prices':
        sorted = hotPrices(models);
        break;
      case 'Brand new models':
        sorted = brandNewModels(models);
        break;
      case 'You may also like':
        sorted = alsoLike(models);
        break;
      default:
        sorted = models;
    }
    setSortedModels(sorted.slice(0, 10));
  }, [type, models]);

  return (
    <>
      <div className="page-home__new-models">
        <h2 className="page-home__new-models__text">{type}</h2>

        <div className="page-home__new-models--arrow">
          <img
            className="page-home__new-models--arrow-disabled"
            src="./img/Buttons_Slider button - Disabled (right).svg"
            alt="Disabled"
          />
          <img
            className="page-home__new-models--arrow-default"
            src="./img/Buttons_Slider button - Default (right).svg"
            alt="Default"
          />
        </div>
      </div>

      <div className="page-home__list-new">
        {sortedModels.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={40}
            slidesPerView={slidesPerView}
            loop={true}
            navigation={{
              prevEl: '.page-home__new-models--arrow-disabled',
              nextEl: '.page-home__new-models--arrow-default',
            }}
          >
            {sortedModels.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="page-home-card">
                  <Link state={{ from: location.pathname }} to={`/${product.category}/${product.itemId}`}>
                    <img
                      className="page-home-card__image"
                      src={product.image} // Ensure correct image path
                      alt={product.image}
                    />
                  </Link>

                  <p className="page-home-card__name">{product.name}</p>
                  <p className="page-home-card__price-regular">{`${product.price}$`}</p>

                  <div className="page-home-card__line"></div>

                  <div className="page-home-card__screen">
                    <p className="page-home-card__screen-name">Screen</p>
                    <p className="page-home-card__screen-info">
                      {product.screen}
                    </p>
                  </div>

                  <div className="page-home-card__capacity">
                    <p className="page-home-card__capacity-name">Capacity</p>
                    <p className="page-home-card__capacity-info">
                      {product.capacity}
                    </p>
                  </div>

                  <div className="page-home-card__ram">
                    <p className="page-home-card__ram-name">Ram</p>
                    <p className="page-home-card__ram-info">{product.ram}</p>
                  </div>

                  <div className="page-home-card__buy">
                    <button onClick={() => toogleCart(product)} className={classNames({
                      'card__buy-cart': !cart.some(el => product.id === el.id),
                      'added-to-cart': cart.some(el => product.id === el.id)
                    })}>
                      {cart.some(el => el.id === product.id) ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <img onClick={() => toggleFavorite(product)}
                      className='page-home-card__favorite' src={favorites.some(fav => fav.id === product.id)
                        ? "./img/Add to fovourites - Added.svg"
                        : "./img/add-to-cart.svg"}
                      alt="favorite" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
