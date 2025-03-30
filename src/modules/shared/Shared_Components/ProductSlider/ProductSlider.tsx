/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';
import { UpdatedProduct } from '../../Types/types';

interface Props {
  componentTitle: string;
  productList: UpdatedProduct[];
  discount?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  componentTitle,
  productList,
  discount,
}) => {
  const elementsId = componentTitle.replaceAll(' ', '_');
  const cardContainer = document.getElementById(`carousel__${elementsId}`);

  const [scrolledTo, setScrolledTo] = useState({
    left: false,
    right: true,
  });
  const [scrolledBy, setScrolledBy] = useState({
    left: 0,
    right: 0,
  });

  const screenWidth = window.screen.width;

  let width = 0;

  function positionCheck() {
    const firstCard = document.getElementById(
      `card_${productList[0].id}_${elementsId}`,
    );
    const lastCard = document.getElementById(
      `card_${productList[productList.length - 1].id}_${elementsId}`,
    );
    const container = document.getElementById(`carousel__${elementsId}`);

    if (firstCard && lastCard && container) {
      const containerLeft = Math.ceil(container.getBoundingClientRect().left);
      const firstCardLeft = Math.ceil(firstCard.getBoundingClientRect().left);
      const lastCardRight = Math.floor(lastCard.getBoundingClientRect().right);
      const containerRight = Math.ceil(container.getBoundingClientRect().right);

      if (containerLeft === firstCardLeft) {
        setScrolledTo({
          left: false,
          right: true,
        });
      } else if (containerRight > lastCardRight) {
        setScrolledTo({
          left: true,
          right: false,
        });
      } else {
        setScrolledTo({
          left: true,
          right: true,
        });
      }
    }
  }

  const moveLeft = () => {
    setScrolledBy({
      right: scrolledBy.right - width,
      left: scrolledBy.left - width,
    });
    cardContainer?.scrollBy(scrolledBy.left, 0);

    if (screenWidth < 1200) {
      setTimeout(() => {
        positionCheck();
      }, 500);
    }
  };

  const moveRight = () => {
    setScrolledBy({
      left: scrolledBy.left + width,
      right: scrolledBy.right + width,
    });
    cardContainer?.scrollBy(scrolledBy.right, 0);

    if (screenWidth < 1200) {
      setTimeout(() => {
        positionCheck();
      }, 500);
    }
  };

  const listOfFetchProducts = productList.map((item: UpdatedProduct) => (
    <ProductCard
      key={item.itemId}
      item={item}
      cardId={`${item.id}_${elementsId}`}
      discount={discount}
    />
  ));

  useEffect(() => {
    const firstCard = document.getElementById(
      `card_${productList[0].id}_${elementsId}`,
    );
    const container = document.getElementById(`carousel__${elementsId}`);

    if (firstCard) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      width = firstCard.getBoundingClientRect().width;

      setScrolledBy({
        left: -width,
        right: width,
      });
    }

    container?.addEventListener('scrollend', positionCheck);
    container?.addEventListener('touchend', positionCheck);

    return () => {
      container?.removeEventListener('scrollend', positionCheck);
      container?.removeEventListener('touchend', positionCheck);
    };
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__top">
        <h2 className="title title--h2">{componentTitle}</h2>

        <div className="carousel__buttons">
          <button
            className={classNames('carousel__button carousel__button--left', {
              'carousel__button--active-left': scrolledTo.left,
            })}
            disabled={!scrolledTo.left}
            onClick={() => moveLeft()}
          />

          <button
            className={classNames('carousel__button carousel__button--right', {
              'carousel__button--active-right': scrolledTo.right,
            })}
            disabled={!scrolledTo.right}
            onClick={() => moveRight()}
          />
        </div>
      </div>

      <div id={`carousel__${elementsId}`} className="carousel__container">
        <div className="carousel__card-set">
          <div className="carousel__card-container">{listOfFetchProducts}</div>
        </div>
      </div>
    </div>
  );
};
