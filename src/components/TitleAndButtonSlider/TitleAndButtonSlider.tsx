import React, { useCallback, useEffect } from 'react';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './TitleAndButtonSlider.module.scss';
import classNames from 'classnames';

type Props = {
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>;
  disabledIds: number[];
  title: string;
  startId: number;
  endId: number;
  containerId: string;
  width?: number;
};

export const TitleAndButtonSlider: React.FC<Props> = ({
  disabledIds,
  setDisabledIds,
  title,
  startId,
  endId,
  containerId,
  width,
}) => {
  const newModels = title === 'Brand new models';
  const handleButtonState = useCallback(
    (element: HTMLElement) => {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;
      const atStart = scrollLeft === 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth;

      let newDisabledIds = [...disabledIds];

      if (atStart && !newDisabledIds.includes(startId)) {
        newDisabledIds.push(startId);
      } else if (!atStart) {
        newDisabledIds = newDisabledIds.filter(id => id !== startId);
      }

      if (atEnd && !newDisabledIds.includes(endId)) {
        newDisabledIds.push(endId);
      } else if (!atEnd) {
        newDisabledIds = newDisabledIds.filter(id => id !== endId);
      }

      if (JSON.stringify(newDisabledIds) !== JSON.stringify(disabledIds)) {
        setDisabledIds(newDisabledIds);
      }
    },
    [disabledIds, setDisabledIds, endId, startId],
  );

  const handleScrollLeft = () => {
    const container = document.getElementById(containerId);

    if (container) {
      container.scrollBy({ left: -220, behavior: 'smooth' });

      setTimeout(() => handleButtonState(container), 100);
    }
  };

  const handleScrollRight = () => {
    const container = document.getElementById(containerId);

    if (container) {
      container.scrollBy({ left: 220, behavior: 'smooth' });

      setTimeout(() => handleButtonState(container), 100);
    }
  };

  useEffect(() => {
    const container = document.getElementById(containerId);

    if (container) {
      const handleScroll = () => handleButtonState(container);

      handleButtonState(container);
      container.addEventListener('scroll', handleScroll);

      return () => container.removeEventListener('scroll', handleScroll);
    }

    return;
  }, [disabledIds, handleButtonState, containerId]);

  return (
    <>
      <div className={`${styles.main_header_container}`}>
        <header
          className={classNames(`${styles.main_header_title_container}`, {
            [styles.new_models]: newModels && width && width < 640,
          })}
        >
          <h2 className={`${styles.main_header_title}`}>{title}</h2>
        </header>
        <section className={`${styles.main_header_button_container}`}>
          <Button
            direction={ButtonDirection.left}
            onClick={handleScrollLeft}
            buttonId={startId}
            disabledIds={disabledIds}
          />
          <Button
            direction={ButtonDirection.right}
            onClick={handleScrollRight}
            buttonId={endId}
            disabledIds={disabledIds}
          />
        </section>
      </div>
    </>
  );
};
