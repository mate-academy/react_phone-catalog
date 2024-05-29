import React, {useState} from "react";
import {Link} from "react-router-dom";

import {useAppSelector, useVissibleCards} from "../../../app/hooks";

import {Slicer} from "./Slicer/Slicer";
import { Card } from "../../Card/Card";

import { nanoid } from "@reduxjs/toolkit";

import {Category as CategoryType} from "../../../types/Category";
import { Category } from "./Category/Category";

const MAX_CARD_WIDTH = 265;
const GAP = 13;

const sliceImg = [
  "../../img/promo/1.webp",
  "../../img/promo/1.jpg",
  "../../img/promo/2.jpeg",
  "../../img/promo/4.jpeg",
  "../../img/promo/5.jpeg",
];


const categories: CategoryType[] = [
  {
    id: "phones",
    title: "Mobile phones",
    image: "../../img/category/1.jpeg",
  },
  {
    id: "tablets",
    title: "Tablets",
    image: "../../img/category/2.jpeg",
  },
  {
    id: "accessories",
    title: "Accessories",
    image: "../../img/category/3.jpeg",
  },
];

export const Home: React.FC = () => {
  const [isActiveIndex, setIsActiveIndex] = useState(0);

  const phones = useAppSelector(state => state.products.phones);

  const {visibleCards, containerRef} = useVissibleCards(MAX_CARD_WIDTH, GAP);

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
        <Slicer pictures={sliceImg} />
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
              <img src={"../../img/promo/icons/arrow-left.svg"} alt="arrow-left" />
            </button>

            <button
              className="cards__buttons__next"
              onClick={() => handleNext()}
            >
              <img src={"../../img/promo/icons/arrow.svg"} alt="arrow-right" />
            </button>
          </div>

          <ul className="cards__list">
            {phones.map(phone => {

              return (
                <li
                  key={`phone-${nanoid()}`}
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
                  key={`categories-${nanoid()}`}
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
