import React from 'react';
import { CardsSlider } from '../../components/CardsSlider/CardsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { CatalogPropsType } from '../../interfaces';
import './HomePage.scss';
import { PromoSlider } from '../../components/PromoSlider/PromoSlider';


export const HomePage = ({
  products,
  cart,
  setCart,
  favorites,
  setFavorites
}: CatalogPropsType) => {

  const slides = [
    'img/Banner1.png',
    'img/Banner2.jpg',
    'img/Banner3.jpg',
    'img/Banner4.jpg',
    'img/Banner5.jpg',
    'img/Banner6.jpg',
  ]



  return (
    <div className="HomePage">
      <PromoSlider slides={slides} />
      <CardsSlider
        title={"Hot prices"}
        products={[...products].sort((a, b) => (
          a.price * (100 - a.discount) / 100 - b.price * (100 - b.discount) / 100))}
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
      />

      <ShopByCategory products={products} />

      <CardsSlider
        title={"Brand new models"}
        products={[...products].sort((a, b) => (a.age - b.age))}
        cart={cart}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
      />

    </div>

  )
}
