import React, { useEffect } from 'react';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import styles from './HotPrices.module.scss';

type Props = {
  setDisabledIds: React.Dispatch<React.SetStateAction<number[]>>
  disabledIds: number[];
}

export const HotPrices: React.FC<Props> = ({setDisabledIds, disabledIds}) => {
  const handleButtonState = (element: HTMLElement) => {
      const scrollLeft = element.scrollLeft;
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;
      const atStart = scrollLeft === 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth;
  
      let newDisabledIds = [...disabledIds];
  
      if (atStart && !newDisabledIds.includes(2)) {
        newDisabledIds.push(2);
      } else if (!atStart) {
        newDisabledIds = newDisabledIds.filter(id => id !== 2);
      }
      
      
      if (atEnd && !newDisabledIds.includes(3)) {
        newDisabledIds.push(3);
      } else if (!atEnd) {
        newDisabledIds = newDisabledIds.filter(id => id !== 3);
      }
  
      if (JSON.stringify(newDisabledIds) !== JSON.stringify(disabledIds)) {
        setDisabledIds(newDisabledIds);
      }
    }
    const handleScrollLeft = () => {
      const container = document.getElementById('scroll_container_hot_prices');
      if (container) {
        container.scrollBy({ left: -220, behavior: 'smooth'});
  
        setTimeout(() => handleButtonState(container), 100);
      }
    }
    const handleScrollRight = () => {
      const container = document.getElementById('scroll_container_hot_prices');
      if (container) {
        container.scrollBy({ left: 220, behavior: 'smooth'});
  
        setTimeout(() => handleButtonState(container), 100);
      }
    }
  
    useEffect(() => {
      const container = document.getElementById('scroll_container_hot_prices');
      if (container) {
        const handleScroll1 = () => handleButtonState(container);
  
        handleButtonState(container);
        container.addEventListener('scroll', handleScroll1);
        return () => container.removeEventListener('scroll', handleScroll1);
      }
      return;
    }, [disabledIds]);
  return (
    <>
      <div className={`${styles.main_header_container}`}>
        <div className={`${styles.main_header_title_container}`}>
          <h2 className={`${styles.main_header_title}`}>Hot Prices</h2>
        </div>
        <div className={`${styles.main_header_button_container}`}>
          <Button
            direction={ButtonDirection.left}
            onClick={handleScrollLeft}
            buttonId={2}
            disabledIds={disabledIds}
          />
          <Button
            direction={ButtonDirection.right}
            onClick={handleScrollRight}
            buttonId={3}
            disabledIds={disabledIds}
          />
        </div>
      </div>
    </>
  );
};
