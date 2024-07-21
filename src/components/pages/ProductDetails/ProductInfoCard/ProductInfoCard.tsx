import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {useAppSelector} from "../../../../app/hooks";

import classNames from "classnames";

import {capacityExtractor} from "../../../../services/capacityExtractor";
import {colorExtractor} from "../../../../services/colorExtractor";

import {AddButton} from "../../../AddButton/AddButton";
import {FavButton} from "../../../FavButton/FavButton";
import {nanoid} from "@reduxjs/toolkit";

export const ProductInfoCard: React.FC = () => {
  const {pathname} = useLocation();
  const {productId} = useParams();
  const navigate = useNavigate();

  const selectedProduct = useAppSelector(
    state => state.selectedProduct.selectedProduct,
  );

  const {
    priceMap: priceList = {},
    colorsAvailable: colors = [],
    capacityAvailable: capacityList = [],
    screen,
    resolution,
    processor,
    ram,
    hex = {},
  } = selectedProduct || {};

  const [selectedColor, setSelectedColor] = useState<string>(
    colorExtractor(productId || ""),
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    capacityExtractor(productId || ""),
  );

  const [price, setPrice] = useState<number>(priceList[selectedCapacity] || 0);

  const getNewPath = (color: string, capacity?: string) => {
    const base = pathname.replace(`/${productId}`, "");
    let newProductId = productId?.replace(/-\w+$/, `-${color}`);

    if (capacity) {
      newProductId = newProductId?.replace(/-\d+GB|-\d+TB/, `-${capacity}`);
    }

    return `${base}/${newProductId}`;
  };

  const handleClickCapacity = (capacity: string) => {
    const newPath = getNewPath(selectedColor, capacity);

    setSelectedCapacity(capacity);
    setPrice(priceList[capacity] || 0);

    navigate(newPath);
  };

  const handleClickColor = (color: string) => {
    const newPath = getNewPath(color, selectedCapacity);

    setSelectedColor(color);
    navigate(newPath);
  };

  return (
    <div className="info__card">
      <div className="info__card__available">
        <div className="available available__colors">
          <h3
            className="
          available__colors__title
          available__title
          "
          >
            Available Colors
          </h3>

          <div className="available__colors__content">
            <ul className="available__list available__colors__list">
              {colors.map(color => (
                <li
                  onClick={() => handleClickColor(color)}
                  key={color}
                  className={classNames(
                    "available__item",
                    "available__colors__item",
                    {
                      "available__item-active": color === selectedColor,
                    },
                  )}
                >
                  <span
                    className="available__colors__item-link"
                    style={{backgroundColor: hex[color]}}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="available available__capacity">
          <h3 className="available__capacity__title available__title">
            Select Capacity
          </h3>

          <div className="available__capacity__content">
            <ul className="available__list available__capacity__list">
              {capacityList.map(capacity => {
                return (
                  <li
                    key={nanoid()}
                    onClick={() => handleClickCapacity(capacity)}
                    className={classNames(
                      "available__item",
                      "available__capacity__item",
                      {
                        "available__item-active": capacity === selectedCapacity,
                      },
                    )}
                  >
                    <span className="available__capacity__item-link">
                      {capacity}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <p className="info__card__price">{price} USD</p>

      <div className="info__card__buttons">
        <AddButton
          product={selectedProduct}
          color={selectedColor}
          capacity={selectedCapacity}
          price={price}
        />

        <FavButton
          product={selectedProduct}
          color={selectedColor}
          capacity={selectedCapacity}
          price={price}
        />
      </div>

      <div className="info__card__description description">
        <div className="description__name">
          <ul className="description__name__list">
            <li className="description__name__item">Screen</li>
            <li className="description__name__item">Resolution</li>
            <li className="description__name__item">Processor</li>
            <li className="description__name__item">RAM</li>
          </ul>
        </div>

        <div className="description__value">
          <ul className="description__value__list">
            <li className="description__value__item">{screen}</li>

            <li className="description__value__item">{resolution}</li>

            <li className="description__value__item">{processor}</li>

            <li className="description__value__item">{ram}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
