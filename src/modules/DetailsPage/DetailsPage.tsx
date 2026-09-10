import { useParams } from 'react-router-dom';

import { Phone } from '../../types/Phone';

import React, { useEffect, useState } from 'react';

import './DetailsPage.scss';

// eslint-disable-next-line max-len
import { BarNavigation } from '../PhonesPage/components/BarNavigation/BarNavigation';

import { SwiperPhoto } from './components/SwiperPhoto/SwiperPhoto';

import { Product } from '../../types/Product';

// eslint-disable-next-line max-len
import { ProductSlider } from '../HomePage/components/ProductSlider/ProductSlider';

// eslint-disable-next-line max-len
import { AvaibleColorsConfigurate } from '../../shared/AvaibleColorsConfigurate/AvaibleColorsConfigurate';

// eslint-disable-next-line max-len
import { SelectCapacityConfigurate } from '../../shared/SelectCapacityConfigurate/SelectCapacityConfigurate';

import { useLocation } from 'react-router-dom';

import { Tablet } from '../../types/Tablet';

import { Accessory } from '../../types/Accessory';

import PriceAndBuy from './components/PriceAndBuy/PriceAndBuy';

import { InfoBlock } from './components/InfoBlock/InfoBlock';

import { AboutBlock } from './components/AboutBlock/AboutBlock';

import { TechBlock } from './components/TechBlock/TechBlock';

import NavToBack from '../../shared/NavToBack/NavToBack';

type Device = Phone | Tablet | Accessory;

type CartItem = {
  item: Product;

  quantity: number;
};

export const Details: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Device[]>([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);

  const location = useLocation();

  const category = location.pathname.split('/')[1];

  const [cart, setCartState] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem('CartStore') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('CartStore', JSON.stringify(cart));
  }, [cart]);

  const [favorite, setFavoriteState] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('FavoriteStore') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('FavoriteStore', JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    setCategoryLoaded(false);

    fetch(`${import.meta.env.BASE_URL}api/${category}.json`)
      .then(res => res.json())

      .then(data => {
        setSelectedCategory(data);
        setCategoryLoaded(true);
      });
  }, [category]);

  const [arrProducts, setArrProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(res => res.json())

      .then(data => setArrProducts(data));
  }, []);

  const { productId } = useParams();

  const selectedItem: Device | undefined = [...selectedCategory].find(
    p => p.id === productId,
  );

  const selectedProduct: Device | undefined = [...arrProducts].find(
    p => p.itemId === productId,
  );

  const parts: string[] | undefined = productId?.split('-');

  const specIndex = parts?.findIndex(
    part => part.includes('gb') || part.includes('tb') || part.includes('mm'),
  );

  const currentMemory = specIndex !== -1 ? parts[specIndex] : undefined;

  const normalizedColor = (color?: string) => {
    if (!color) {
      return undefined;
    }

    return color;
  };

  const currentColor: string | undefined =
    specIndex !== -1 ? normalizedColor(selectedItem?.color) : undefined;

  if (categoryLoaded && !selectedItem) {
    return (
      <div className="details-page__content">
        <NavToBack />
        <p className="text-h2">Product was not found</p>
      </div>
    );
  }

  function shuffle(arr) {
    const result = [...arr];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function getRandomItems(arr, count) {
    return shuffle(arr).slice(0, count);
  }

  const randomProducts = getRandomItems(arrProducts, 20);

  return (
    <div className="details-page__content">
      <BarNavigation nameCategory="Tablets" nameProduct={selectedItem?.name} />

      <NavToBack />

      <div className="details-info">
        <p className="text-h2">{selectedItem?.name}</p>

        <div className="details-info__content">
          <div className="details-info__main">
            <div className="details-info__swiper">
              <SwiperPhoto selectedProduct={selectedItem} />
            </div>

            <div className="details-info__configurate-and-id">
              <div className="id-number">
                <p className="text-small secondary">ID:802390</p>
              </div>

              <div className="details-info__configurate">
                <div className="details-info__configurate-color">
                  <AvaibleColorsConfigurate
                    selectedProduct={selectedItem}
                    currentMemory={currentMemory}
                  />
                </div>

                <div className="details-info__configurate-line"></div>

                <div className="details-info__configurate-memory">
                  <SelectCapacityConfigurate
                    selectedProduct={selectedItem}
                    currentColor={currentColor}
                  />
                </div>

                <div className="details-info__configurate-line"></div>

                <div className="block-buy">
                  <PriceAndBuy
                    cart={cart}
                    selectedProduct={selectedProduct}
                    selectedItem={selectedItem}
                    setCart={setCartState}
                    favorite={favorite}
                    setFavoriteState={setFavoriteState}
                  />
                </div>

                <div className="info">
                  <InfoBlock selectedProduct={selectedItem} />
                </div>
              </div>
            </div>
          </div>

          <div className="details-info__secondary">
            <AboutBlock selectedProduct={selectedItem} />

            <div className="details-info__tech">
              <TechBlock selectedProduct={selectedItem} />
            </div>
          </div>

          <ProductSlider
            anyProducts={randomProducts}
            discount={true}
            title={'You may also like'}
            className="product-slider--detail"
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
