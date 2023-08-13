import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShopCard } from './ShopCard';
import { getHotPrice, getNewIphones } from './api/iphones';
import { Iphone } from './types/Iphone';
import { TopSlider } from './Slider';
import { Loader } from './Loader';

type Props = {
  selectPhone: (iphoneId: string) => void,
  selectedIphoneId: string | null,
  selectPhoneToBuy: (iphoneId: string) => void,
  selectedIphoneIdToBuy: string | null,
};

export const HomePage: React.FC<Props> = ({
  selectPhone,
  selectedIphoneId,
  selectPhoneToBuy,
  selectedIphoneIdToBuy,
}) => {
  const [newIphones, setNewIphones] = useState<Iphone[]>([]);
  const [hotPricedIphones, setHotPricedIphones] = useState<Iphone[]>([]);

  useEffect(() => {
    getNewIphones().then((items) => setNewIphones(items));
  }, []);

  useEffect(() => {
    getHotPrice().then((items) => setHotPricedIphones(items));
  }, []);

  return (
    <div className="block">

      <TopSlider />

      <section className="page page__body page__section shop">
        <h1 className="page__title">Hot prices</h1>

        <div className="shop__catalog">
          {hotPricedIphones.length > 0 ? (
            hotPricedIphones.map((iphone) => {
              return (
                <ShopCard
                  iphone={iphone}
                  selectPhone={selectPhone}
                  selectedIphoneId={selectedIphoneId}
                  selectPhoneToBuy={selectPhoneToBuy}
                  selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                />
              );
            })

          ) : (
            <Loader />
          ) }
        </div>
      </section>

      <section className="page page__body page__section category">
        <h1 className="page__title">Shop by category</h1>
        <div className="category__catalog">
          <div className="category__card category__card--phones">
            <div className="category__card__img
            category__card__img--phones"
            />
            <div className="category__card-title">
              Phones
            </div>
            <NavLink
              to="/phones"
              className="category__card-link"
            >
              100 models
            </NavLink>
          </div>

          <div className="category__card category__card--tablets">
            <div className="category__card__img
            category__card__img--tablets"
            />
            <div className="category__card-title">
              Tablets
            </div>
            <a
              href="#tablets"
              className="category__card-link"
            >
              24 models
            </a>
          </div>

          <div className="category__card category__card--accessories">
            <div className="category__card__img
            category__card__img--accessories"
            />
            <div className="category__card-title">
              Accessories
            </div>
            <a
              href="#mobiles"
              className="category__card-link"
            >
              100 models
            </a>
          </div>

        </div>
      </section>

      <section className="page page__body page__section new-models">
        <h1 className="page__title">
          Brand new models
        </h1>
        <div className="shop__catalog">
          {newIphones.length > 0 ? (
            newIphones.map((iphone) => {
              return (
                <ShopCard
                  iphone={iphone}
                  selectPhone={selectPhone}
                  selectedIphoneId={selectedIphoneId}
                  selectPhoneToBuy={selectPhoneToBuy}
                  selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                />
              );
            })

          ) : (
            <Loader />
          ) }
        </div>
      </section>

    </div>

  );
};
