import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NewModelCard } from '../NewModelCard';
import { Phone } from '../../../types';
import { getPadding } from '../../../services/getPadding';
import { getWidthCard } from '../../../services/getWidthCard';

type Props = { windowSize: number };

const GAP = 16;

export const NewModelsListSlider: React.FC<Props> = React.memo(
  ({ windowSize }) => {
    const phoneModel = 14;

    const [newModels, setNewModels] = useState<Phone[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [size, setSize] = useState<number>(windowSize);

    const [touchStart, setTouchStart] = useState<{ x: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number } | null>(null);

    const widthCard = getWidthCard(windowSize);
    const padding = getPadding(windowSize);

    const [position, setPosition] = useState(getPadding(windowSize));
    const [imgPosition, setImgPosition] = useState<number>(0);

    const oneItem = widthCard + GAP;
    const itemsPerStep = Math.floor(windowSize / oneItem);
    const maxPosition = dataLoaded ? newModels.length - itemsPerStep : 0;
    const boundary = newModels.length * oneItem - GAP + padding - windowSize;

    const moveRight = () => {
      if (imgPosition < maxPosition) {
        const newImgPosition = imgPosition + itemsPerStep;
        const newPosition = newImgPosition * oneItem - GAP;

        setImgPosition(Math.min(newImgPosition, maxPosition));
        setPosition(Math.max(-newPosition, -boundary));
      }
    };

    const moveLeft = () => {
      if (imgPosition > 0) {
        const newImgPosition = imgPosition - itemsPerStep;
        const newPosition = newImgPosition * oneItem - GAP;

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
            moveLeft();
          } else {
            moveRight();
          }
        }
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    useEffect(() => {
      setDataLoaded(false);

      fetch('/api/phones.json')
        .then(response => response.json())
        .then((data: Phone[]) => {
          const phones = data.filter(phone =>
            phone.namespaceId.includes(`${phoneModel}`),
          );

          setNewModels(phones);
          setDataLoaded(true);
        })
        .catch(() => {});
    }, []);

    useEffect(() => {
      if (imgPosition > maxPosition) {
        setImgPosition(maxPosition);

        const newPosition = maxPosition * oneItem - GAP;

        setPosition(Math.max(-newPosition, -boundary));

        return;
      }

      if (dataLoaded && size !== windowSize && imgPosition !== 0) {
        const newPosition = imgPosition * oneItem - GAP;

        setPosition(Math.max(-newPosition, -boundary));
        setSize(windowSize);
      }

      if (dataLoaded && position !== padding && imgPosition === 0) {
        setPosition(padding);
        setSize(windowSize);
      }
    }, [
      boundary,
      dataLoaded,
      imgPosition,
      maxPosition,
      oneItem,
      padding,
      position,
      size,
      windowSize,
    ]);

    return (
      <div className="new-models">
        <div className="new-models__title-block">
          <h2 className="new-models__title secondary-title">
            Brand new models
          </h2>

          <div className="new-models__slider-control slider-new-models">
            <button
              type="button"
              className={cn('slider-new-models__move', {
                disabled: imgPosition <= 0,
              })}
              onClick={moveLeft}
            >
              &lt;
            </button>

            <button
              type="button"
              className={cn('slider-new-models__move', {
                disabled: imgPosition >= maxPosition,
              })}
              onClick={moveRight}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="new-models__imgs-container">
          <div
            className="new-models__imgs"
            style={{ left: `${position}px`, gap: `${GAP}px` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {newModels.map(phone => (
              <NewModelCard
                phone={phone}
                key={phone.id}
                widthCard={widthCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
