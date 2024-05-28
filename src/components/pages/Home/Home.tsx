import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
  useVissibleCards,
} from "../../../app/hooks";

import {Banner} from "./Banner/Banner";
import {Card} from "../../Card/Card";
import {Category} from "./Category/Category";

import {actions as bannersActions} from "../../../features/bannersSlice";

const MAX_CARD_WIDTH = 265;
const GAP = 13;

export const Home: React.FC = () => {
  const [isActiveIndex, setIsActiveIndex] = useState(0);

  const dispatch = useAppDispatch();

  const phones = useAppSelector(state => state.products.phones);
  const categories = useAppSelector(state => state.categories.categories);
  const banners = useAppSelector(state => state.banners.banners);

  const {visibleCards, containerRef} = useVissibleCards(MAX_CARD_WIDTH, GAP);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/banners.json");
        const data = await response.json();

        dispatch(bannersActions.setBanners(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanners();
  }, []);

  const handleNext = () => {
    if (isActiveIndex < phones.length - visibleCards) {
      setIsActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (isActiveIndex > 0) {
      setIsActiveIndex(prev => prev - 1);
    }
  };

  const calcTranslateX = () => {
    const maxOffset = (phones.length - visibleCards) * (MAX_CARD_WIDTH + GAP);
    const offset = isActiveIndex * (MAX_CARD_WIDTH + GAP);

    return Math.min(offset, maxOffset);
  };

  return (
    <div className="container">
      <section className="banner">
        <h1 className="title title-banner">
          Store.{" "}
          <span className="title-custom">
            The best way to buy the
            <br />
            products you love.
          </span>
        </h1>
        <Banner pictures={banners} />
      </section>

      <section className="cards" ref={containerRef}>
        <h2
          className="
          title
          title-cards
          title-custom
          "
        >
          New Products
        </h2>

        <div className="cards__container">
          <div className="cards__buttons">
            <button
              className="cards__buttons__prev"
              onClick={() => handlePrev()}
            >
              <img src={"/img/banner/icons/arrow-left.svg"} alt="arrow-left" />
            </button>

            <button
              className="cards__buttons__next"
              onClick={() => handleNext()}
            >
              <img src={"/img/banner/icons/arrow.svg"} alt="arrow-right" />
            </button>
          </div>

          <ul className="cards__list">
            {phones.map(phone => {
              const {id} = phone;

              return (
                <li
                  key={`phone-${id}`}
                  className="cards__item"
                  style={{
                    transform: `translateX(-${calcTranslateX()}px)`,
                  }}
                >
                  <Card index={isActiveIndex} product={phone} />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="categories">
        <h2
          className="
          title
          title-categories
          title-custom
          "
        >
          Shop by Category
        </h2>
        <div className="categories__container">
          <ul className="categories__list">
            {categories.map(category => {
              const {id} = category;

              return (
                <li
                  key={id}
                  className={`categories__item categories__item-${id}`}
                >
                  <Link to={`/${id}`} className="categories__link">
                    <Category category={category} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
