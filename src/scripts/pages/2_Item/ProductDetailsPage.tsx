import React, { useEffect, useState, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getItem } from '../../helpers/api/goods';
import { IDescrition } from '../../helpers/types/IDescription';
import { IGood } from '../../helpers/types/IGood';
import { Section } from '../../components/3_Section/Section';
import { Slider } from '../../components/1_Slider/1_Slider';
import { Context } from '../../helpers/context/context';

import './productDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const {
    goods,
    toggleFav,
    toggleCart,
    favList,
    cartList,
  } = useContext(Context);

  const titleItem = useParams().id;

  const [good, setGood] = useState<IGood>();
  const [itemInfo, setItemInfo] = useState<IDescrition | never>();

  const loadingGoods = async () => {
    const goodServer = await getItem(titleItem);

    setItemInfo(goodServer);
  };

  useEffect(() => {
    loadingGoods();
    setGood(goods.find((item: {
      id: string | undefined;
    }) => item.id === titleItem));
  }, []);

  return (
    <div className="catalog">
      {(itemInfo && good) && (
        <>
          <div className="catalog__header">
            <NavLink
              to="home"
              className="catalog__home-button"
              title="home icon"
            >
              <span className="catalog__home-icon" />
            </NavLink>
            <div className="catalog__header-container">
              <span className="catalog__header-arrow" />
            </div>
            <p className="catalog__title">
              {itemInfo.name}
            </p>
          </div>

          <div className="catalog__back">
            <NavLink
              to="/"
              className="catalog__home-button"
              title="home icon"
            >
              <span className="catalog__left" />
            </NavLink>
            <div className="catalog__header-container">
              <span className="catalog__header-arrow" />
            </div>
            <p className="catalog__title">
              Back
            </p>
          </div>

          <h1>{good.name}</h1>

          <div className="item">
            <>
              <div className="item__description">
                <Slider image={itemInfo.images} />
              </div>

              <div className="item__description">
                <h2 className="item__title">Description</h2>

                <div className="item__ProductsList">
                  <p className="ProductsList__info-title">
                    ID:
                    {' '}
                    {itemInfo.id}
                  </p>
                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Available colors
                    </p>
                  </div>

                  <div className="item__container-checkbox">
                    <div className="item__checkbox">
                      <div className="item__1" />
                    </div>
                    <div className="item__checkbox">
                      <div className="item__2" />
                    </div>
                    <div className="item__checkbox">
                      <div className="item__3" />
                    </div>
                    <div className="item__checkbox">
                      <div className="item__4" />
                    </div>
                  </div>

                  <div className="item__description">
                    <div className="item__ProductsList">
                      <div className="ProductsList__price">
                        <h2 className="ProductsList__real">
                          {`${good.price - (good.price * good.discount) / 100}`}
                        </h2>
                        {good.discount > 0 && (
                          <h2 className="ProductsList__withoutDisc">
                            {`$${good.price}`}
                          </h2>
                        )}
                      </div>

                      <div className="ProductsList__info">
                        <div className="ProductsList__info-description">
                          <p className="ProductsList__info-title">
                            Screen
                          </p>
                          <p className="ProductsList__info-value">
                            {good.screen}
                          </p>
                        </div>

                        <div className="ProductsList__info-description">
                          <p className="ProductsList__info-title">
                            Capacity
                          </p>
                          <p className="ProductsList__info-value">
                            {good.capacity}
                          </p>
                        </div>

                        <div className="ProductsList__info-description">
                          <p className="ProductsList__info-title">
                            RAM
                          </p>
                          <p className="ProductsList__info-value">
                            {good.ram}
                          </p>
                        </div>

                      </div>

                      <div className="ProductsList__action">

                        {cartList.includes(good) ? (
                          <button
                            className="ProductsList__button-added"
                            type="button"
                            onClick={() => toggleCart(good)}
                          >
                            Added to cart
                          </button>
                        ) : (
                          <button
                            className="ProductsList__button"
                            type="button"
                            onClick={() => toggleCart(good)}
                          >
                            Add to cart
                          </button>
                        )}

                        {favList.includes(good) ? (
                          <a
                            className="ProductsList__button-hurt"
                            title="favourites"
                            href="#favourites"
                            onClick={() => toggleFav(good)}
                          >
                            <span className="ProductsList__favourites-red" />
                          </a>
                        ) : (
                          <a
                            className="ProductsList__button-hurt"
                            title="favourites"
                            href="#favourites"
                            onClick={() => toggleFav(good)}
                          >
                            <span className="ProductsList__favourites" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item__description">
                <h2 className="item__title">About</h2>
                <p className="item__text">
                  {good.snippet}
                </p>
                <p className="item__text">
                  {itemInfo.description}
                </p>
              </div>

              <div className="item__description">
                <h2 className="item__title">Tech specs</h2>
                <div className="ProductsList__info">
                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Screen
                    </p>
                    <p className="ProductsList__info-value">
                      {good.screen}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Resolution
                    </p>
                    <p className="ProductsList__info-value">
                      {itemInfo.display.screenResolution}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Processor
                    </p>
                    <p className="ProductsList__info-value">
                      {itemInfo.hardware.cpu}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      RAM
                    </p>
                    <p className="ProductsList__info-value">
                      {good.ram}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Built in memory
                    </p>
                    <p className="ProductsList__info-value">
                      {itemInfo.storage.flash}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Camera
                    </p>
                    <p className="ProductsList__info-value">
                      {itemInfo.camera.primary}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Zoom
                    </p>
                    <p className="ProductsList__info-value">
                      {itemInfo.camera.features[0]}
                    </p>
                  </div>

                  <div className="ProductsList__info-description">
                    <p className="ProductsList__info-title">
                      Cell
                    </p>
                    <p className="ProductsList__info-value">
                      {itemInfo.connectivity.cell}
                    </p>
                  </div>

                </div>
              </div>
            </>
          </div>

          <Section title="You may also like" />
        </>
      )}
    </div>
  );
};

// {/* <NavLink
//               to={good.id}
//             > */}
