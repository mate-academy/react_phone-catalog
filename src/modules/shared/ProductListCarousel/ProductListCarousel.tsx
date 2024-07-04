import React, { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard';
import { getPadding } from '../../../services/getPadding';
import { getWidthCard } from '../../../services/getWidthCard';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { Loader } from '../Loader';
import { Product } from '../../../types/Product';
import {
  COLUMN_SIZE_FOR_DESCTOP,
  DESCTOP_COLUMNS,
  GAP_BETWEEN_COLUMNS,
} from '../../constants/PARAMS_OF_PAGE';
import { MoveButton } from '../Buttons/MoveButtons';
import { WindowSizeContext } from '../../../store/WindowSizeContext';
import { getWidtScrollbar } from '../../../services/getWidtScrollbar';

type Props = {
  title: string;
  products: Product[];
  dataLoaded: boolean;
  discount: boolean;
};

export const ProductListCarousel: React.FC<Props> = React.memo(
  ({ title, products, dataLoaded, discount }) => {
    const { windowSize } = useContext(WindowSizeContext);

    const [currentSize, setCurrentSize] = useState<number>(windowSize);

    const [touchStart, setTouchStart] = useState<{ x: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number } | null>(null);

    const widthCard = getWidthCard(windowSize);
    const padding = getPadding(windowSize);
    const widthScrollbar = getWidtScrollbar();

    const [position, setPosition] = useState(getPadding(windowSize));
    const [imgPosition, setImgPosition] = useState<number>(0);

    const windowSizeForDesctop =
      COLUMN_SIZE_FOR_DESCTOP * DESCTOP_COLUMNS +
      GAP_BETWEEN_COLUMNS * (DESCTOP_COLUMNS - 1);

    const windowSizeSlider =
      windowSize < WIDTH_DEVICES.desctop ? windowSize : windowSizeForDesctop;

    const widthOneItem = widthCard + GAP_BETWEEN_COLUMNS;

    const itemsPerStep =
      windowSize < WIDTH_DEVICES.desctop
        ? Math.floor(windowSizeSlider / widthOneItem)
        : Math.floor((windowSizeSlider + GAP_BETWEEN_COLUMNS) / widthOneItem);

    const maxPosition = dataLoaded ? products.length - itemsPerStep : 0;

    const limitOfPosition =
      products.length * widthOneItem -
      GAP_BETWEEN_COLUMNS +
      padding -
      windowSizeSlider +
      widthScrollbar;

    const handleMoveRight = () => {
      if (imgPosition < maxPosition) {
        const newImgPosition = imgPosition + itemsPerStep;
        const newPosition =
          windowSize < WIDTH_DEVICES.desctop
            ? newImgPosition * widthOneItem - GAP_BETWEEN_COLUMNS
            : newImgPosition * widthOneItem;

        setImgPosition(Math.min(newImgPosition, maxPosition));
        setPosition(Math.max(-newPosition, -limitOfPosition));
      }
    };

    const handleMoveLeft = () => {
      if (imgPosition > 0) {
        const newImgPosition = imgPosition - itemsPerStep;
        const newPosition =
          windowSize < WIDTH_DEVICES.desctop
            ? newImgPosition * widthOneItem - GAP_BETWEEN_COLUMNS
            : newImgPosition * widthOneItem;

        setImgPosition(Math.max(newImgPosition, 0));
        setPosition(Math.min(-newPosition, padding));
      }
    };

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
      setTouchStart({ x: event.touches[0].clientX });
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
      setTouchEnd({ x: event.touches[0].clientX });
    };

    const handleTouchEnd = () => {
      if (touchStart && touchEnd) {
        const deltaX = touchEnd.x - touchStart.x;

        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            handleMoveLeft();
          } else {
            handleMoveRight();
          }
        }
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    useEffect(() => {
      if (imgPosition > maxPosition) {
        setImgPosition(maxPosition);

        const newPosition = maxPosition * widthOneItem - GAP_BETWEEN_COLUMNS;

        setPosition(Math.max(-newPosition, -limitOfPosition));

        return;
      } // adapting the position of the picture when the current position
      // becomes larger than the maximum when changing the size of the window

      if (dataLoaded && currentSize !== windowSize && imgPosition !== 0) {
        const newPosition =
          windowSize < WIDTH_DEVICES.desctop
            ? imgPosition * widthOneItem - GAP_BETWEEN_COLUMNS
            : imgPosition * widthOneItem;

        setPosition(Math.max(-newPosition, -limitOfPosition));
        setCurrentSize(windowSize);
      } // adaptation of the current position of pictures
      // when changing the size of the window when the current position !== 0

      if (dataLoaded && position !== padding && imgPosition === 0) {
        setPosition(padding);
        setCurrentSize(windowSize);
      } // adaptation of the current position of pictures
      // when changing the size of the window when the current position === 0
    }, [
      limitOfPosition,
      dataLoaded,
      imgPosition,
      maxPosition,
      widthOneItem,
      padding,
      position,
      currentSize,
      windowSize,
    ]);

    return (
      <div className="carousel">
        <div className="carousel__title-block">
          <h2 className="carousel__title secondary-title">{title}</h2>

          <div className="carousel__slider-control">
            <MoveButton onMove={handleMoveLeft} disabled={imgPosition <= 0} />
            <MoveButton
              onMove={handleMoveRight}
              disabled={imgPosition >= maxPosition}
            />
          </div>
        </div>

        <div className="carousel__imgs-container">
          {!dataLoaded ? (
            <div className="carousel__loader">
              <Loader />
            </div>
          ) : (
            <div
              className="carousel__imgs"
              style={{ left: `${position}px`, gap: `${GAP_BETWEEN_COLUMNS}px` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  widthCard={widthCard}
                  discount={discount}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
