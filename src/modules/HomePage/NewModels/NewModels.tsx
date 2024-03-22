import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NewModelCard } from '../NewModelCard';
import { Phone } from '../../../types';
import { PADDINGS } from '../../constants/PADDINGS';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { WIDTH_CARD } from '../../constants/WIDTH_CARD';
import { getPadding } from '../../../services/getPadding';
import { getWidthCard } from '../../../services/getWidthCard';

export const NewModels: React.FC = React.memo(() => {
  const phoneModel = 14;

  const [newModels, setNewModels] = useState<Phone[]>([]);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [widthCard, setWidthCard] = useState<number>(getWidthCard(windowSize));
  const [dataLoaded, setDataLoaded] = useState(false);
  const [padding, setPadding] = useState<number>(getPadding(windowSize));

  // #region working
  const [position, setPosition] = useState(getPadding(windowSize)); // working
  const [imgPosition, setImgPosition] = useState<number>(0); // working

  const oneItem = widthCard + padding; // working
  const itemsPerStep = Math.floor(windowSize / oneItem); // working
  const maxPosition = newModels.length - itemsPerStep; // working
  // const boundary = newModels.length * oneItem - padding + padding - windowSize; // working
  const boundary = newModels.length * oneItem - windowSize; // working

  const moveRight = () => {
    if (imgPosition <= maxPosition) {
      setImgPosition(currentImg =>
        Math.min(currentImg + itemsPerStep, maxPosition),
      );
    }
  }; // working

  const moveLeft = () => {
    if (imgPosition >= 0) {
      setImgPosition(currentImg => Math.max(currentImg - itemsPerStep, 0));
    }
  }; // working
  // #endregion

  // const moveRight = () => {
  //   if (imgPosition < maxPosition) {
  //     const newImgPosition = imgPosition + itemsPerStep;
  //     const newPosition = newImgPosition * oneItem - padding;

  //     setImgPosition(Math.min(newImgPosition, maxPosition));
  //     setPosition(Math.max(-newPosition, -boundary));
  //   }
  // };

  // const moveLeft = () => {
  //   if (imgPosition > 0) {
  //     const newImgPosition = imgPosition - itemsPerStep;
  //     const newPosition = newImgPosition * oneItem - padding;

  //     setImgPosition(Math.max(newImgPosition, 0));
  //     setPosition(Math.min(-newPosition, padding));
  //   }
  // };

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
    const handleResize = () => {
      if (dataLoaded) {
        setWindowSize(document.documentElement.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dataLoaded]);

  useEffect(() => {
    if (windowSize <= WIDTH_DEVICES.mobile && padding !== PADDINGS.mobile) {
      setPadding(PADDINGS.mobile);
      setWidthCard(WIDTH_CARD.mobile);
    }

    if (
      windowSize > WIDTH_DEVICES.mobile &&
      windowSize < WIDTH_DEVICES.desctop &&
      padding !== PADDINGS.tablet
    ) {
      setPadding(PADDINGS.tablet);
      setWidthCard(WIDTH_CARD.tablet);
    }

    if (windowSize >= WIDTH_DEVICES.desctop && padding !== PADDINGS.desctop) {
      setPadding(PADDINGS.desctop);
      setWidthCard(WIDTH_CARD.desctop);
    }
  }, [padding, windowSize]); // setCurrentPadding

  useEffect(() => {
    if (windowSize !== document.documentElement.clientWidth && !dataLoaded) {
      setWindowSize(document.documentElement.clientWidth);
    }
  }, [dataLoaded, windowSize]);

  // #region working
  useEffect(() => {
    if (dataLoaded) {
      const newPosition = imgPosition * oneItem - padding;

      setPosition(Math.max(-newPosition, -boundary));
    }
  }, [boundary, dataLoaded, imgPosition, oneItem, padding, position]); // working
  // #endregion

  // console.log(maxPosition);
  // console.log(imgPosition);
  // console.log(windowSize, oneItem);
  // console.log(windowSize);

  return (
    <div className="new-models">
      <div className="new-models__title-block">
        <h2 className="new-models__title secondary-title">Brand new models</h2>

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
          style={{ left: `${position}px`, gap: `${padding}px` }}
        >
          {newModels.map(phone => (
            <NewModelCard phone={phone} key={phone.id} widthCard={widthCard} />
          ))}
        </div>
      </div>
    </div>
  );
});
