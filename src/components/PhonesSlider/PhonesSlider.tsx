import { useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "../../store";
import { TypeCard } from "../../types/TypeCard";
import {
  itemWidth,
  scrollPositionLeft,
  scrollPositionRight,
} from "../../helpers/changePositionItem";
import { ProductCard } from "../ProductCard/ProductCard";
import "./PhonesSlider.scss";

export enum Phones {
  Discount = "Hot prices",
  New = "Brand new models",
  Random = "You may also like",
}

export const PhonesSlider = ({ type }: { type: Phones }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const phones = useAppSelector((state) => state.phones.items);

  const findLastYear = () => {
    let lastYear = 0;
    const phonesYears = [];

    for (let i = 1; i < phones.length; i += 1) {
      phonesYears.push(phones[i].year);
    }

    for (let i = 1; i < phonesYears.length; i += 1) {
      if (phonesYears[i] > lastYear) {
        lastYear = phonesYears[i];
      }
    }

    return lastYear;
  };

  const phonesToDisplay = (key: string): TypeCard[] => {
    switch (key) {
      case Phones.Discount:
        return phones
          .filter((phone) => phone.fullPrice - phone.price > 0)
          .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
      case Phones.New:
        return phones
          .filter((phone) => phone.year === findLastYear())
          .sort((a, b) => b.price - a.price);
      case Phones.Random:
        return phones;
      default:
        return [];
    }
  };

  return (
    <div
      className="PhonesSlider container"
      style={{
        width: `${4 * itemWidth - 16}px`,
      }}
    >
      <div className="top-container">
        <h1>{type}</h1>

        <div className="top-container__movement">
          <button
            type="button"
            disabled={scrollPosition + itemWidth > 0}
            onClick={() =>
              scrollPositionLeft(
                setScrollPosition,
                scrollPosition,
                itemWidth,
                4,
              )
            }
            className={classNames("top-container__button", {
              disabled: scrollPosition + itemWidth > 0,
            })}
          >
            <img src="./img/ArrowLeft.png" alt="ArrowLeft" />
          </button>
          <button
            type="button"
            onClick={() =>
              scrollPositionRight(
                setScrollPosition,
                scrollPosition,
                itemWidth,
                4,
              )
            }
            disabled={
              scrollPosition - itemWidth <
              -((phonesToDisplay(type).length - 4) * itemWidth)
            }
            className={classNames("top-container__button", {
              disabled:
                scrollPosition - itemWidth <
                -((phonesToDisplay(type).length - 4) * itemWidth),
            })}
          >
            <img src="./img/ArrowRight.png" alt="ArrowRight" />
          </button>
        </div>
      </div>

      <div data-cy="cardsContainer" className="cardsContainer">
        <ul
          className="cardsContainer__list"
          style={{
            transform: `translateX(${scrollPosition}px)`,
            transition: `transform ${1000}ms ease`,
          }}
        >
          {phonesToDisplay(type).map((card) => {
            return (
              <li className="cardsContainer__item" key={card.id}>
                <ProductCard newPhone={type === Phones.Discount} card={card} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
