import React, { useEffect } from 'react';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './MainNewModels.module.scss';

type Props = {
  // setDisabledIds: (arg: number) => void;
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>
  disabledIds: number[];
}

export const MainNewModels: React.FC<Props> = ({ disabledIds, setDisabledIds }) => {
  const handleButtonState = (element: HTMLElement) => {
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;
    const atStart = scrollLeft === 0;
    const atEnd = scrollLeft + clientWidth >= scrollWidth;

    let newDisabledIds = [...disabledIds];

    if (atStart && !newDisabledIds.includes(0)) {
      newDisabledIds.push(0);
    } else if (!atStart) {
      newDisabledIds = newDisabledIds.filter(id => id !== 0);
    }
    
    
    if (atEnd && !newDisabledIds.includes(1)) {
      newDisabledIds.push(1);
    } else if (!atEnd) {
      newDisabledIds = newDisabledIds.filter(id => id !== 1);
    }

    if (JSON.stringify(newDisabledIds) !== JSON.stringify(disabledIds)) {
      setDisabledIds(newDisabledIds);
    }
  }
  const handleScrollLeft = () => {
    const container = document.getElementById('scroll_container_new_models');
    if (container) {
      container.scrollBy({ left: -220, behavior: 'smooth'});

      setTimeout(() => handleButtonState(container), 100);
    }
  }
  const handleScrollRight = () => {
    const container = document.getElementById('scroll_container_new_models');
    if (container) {
      container.scrollBy({ left: 220, behavior: 'smooth'});

      setTimeout(() => handleButtonState(container), 100);
    }
  }

  useEffect(() => {
    const container = document.getElementById('scroll_container_new_models');
    if (container) {
      const handleScroll = () => handleButtonState(container);

      handleButtonState(container);
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
    return;
  }, [disabledIds]);

  return (
    <>
      <div className={`${styles.main_header_container}`}>
        <div className={`${styles.main_header_title_container}`}>
          <h2 className={`${styles.main_header_title}`}>Brand new models</h2>
        </div>
        <div className={`${styles.main_header_button_container}`}>
          <Button
            direction={ButtonDirection.left}
            backToTop={false}
            onClick={handleScrollLeft}
            buttonId={0}
            disabledIds={disabledIds}
          />
          <Button
            direction={ButtonDirection.right}
            backToTop={false}
            onClick={handleScrollRight}
            buttonId={1}
            disabledIds={disabledIds}
          />
        </div>
      </div>
    </>
  );
};
