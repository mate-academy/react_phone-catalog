import './Home.style.scss';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Slider } from '../../shared/Slider/Slider';
import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';
import { CustomSwiper } from '../../shared/Swiper/Swiper';

import { Categories } from '../../../types/Categories';

import phones from '../../../../public/img/phones.png';
import tablets from '../../../../public/img/tablets.png';
import accessories from '../../../../public/img/accessories.png';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../shared/Routs/Routs';
import { useProductNumbers } from '../../../utils/customHooks';

export const Home = () => {
  const dispatch = useAppDispatch();

  const hotPrices = useAppSelector(state => state.products.products)
    .toSorted((a , b) => a.price - b.price)
    .slice(0, 20);

  const newModels = useAppSelector(state => state.products.products)
  .toSorted((a, b) => b.year - a.year)
  .slice(0, 20);

  const navigate = useNavigate();

  const productNumber = useProductNumbers();

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <div className="home">
      <h1 className="home__h1">Welcome to Nice Gadgets store!</h1>

      <div className="home__swiper">
        <CustomSwiper />
      </div>

      <div className="home__new-models">
        {hotPrices.length > 0 && (
          <Slider category={'newModels'} products={newModels} />
        )}
      </div>

      <div className="home__categories categories">
        <h2 className="categories__title">Shop by category</h2>

        <div className="categories__blocks blocks">
          {Object.keys(Categories)
            .filter(key => key !== 'home')
            .map(key => {
              return (
                <div
                  key={key}
                  className="blocks__block block"
                  onClick={() => navigate(routes[key])}
                >
                  <img
                    className="block__img"
                    src={
                      key === 'phones'
                        ? phones
                        : key === 'tablets'
                          ? tablets
                          : accessories
                    }
                    alt={`go to ${key === 'phones' ? 'phones' : key === 'tablets' ? 'tablets' : 'accessories'}`}
                  ></img>
                  <h4 className="block__name">
                    {`${key === 'phones' ? 'Mobile phones' : key.slice(0, 1).toUpperCase().concat(key.slice(1))}`}
                  </h4>
                  <p className="block__items-number">{`${productNumber[key]} models`}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="home__hot-prices">
        {hotPrices.length > 0 && (
          <Slider category={'hotPrices'} products={hotPrices} />
        )}
      </div>
    </div>
  );
};
