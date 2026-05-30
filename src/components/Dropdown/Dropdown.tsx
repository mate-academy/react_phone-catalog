import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);;

  useEffect(() => {
   const el = contentRef.current;
   if (!el) return;
 
   const handleWheel = (e: WheelEvent) => {
     e.preventDefault();
 
     el.scrollBy({
       top: e.deltaY * 0.2,
       behavior: 'smooth',
     });
   };
 
   el.addEventListener('wheel', handleWheel, { passive: false });
 
   return () => {
     el.removeEventListener('wheel', handleWheel);
   };
 }, []);

  return (
    <div>
      <div className={classNames(styles.dropdown, { [styles.isActive]: isActive })}>
        <button
          className={styles.trigger}
          onClick={(e) => {
            if (isActive && e.currentTarget === e.target && contentRef.current) {
              contentRef.current.style.overflowY = 'hidden';
            }
            setIsActive(!isActive);
          }}
        >
          Кнопка
        </button>
        <div
          ref={contentRef}
          aria-hidden={!isActive}
          className={styles.content}
          onTransitionEnd={(e) => {
            if (e.currentTarget !== e.target) {
              return;
            }

            if (isActive) {
              e.currentTarget.style.overflowY = 'auto';
            }
          }}
        >
          <ul className={styles.list}>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 1</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
            <li className={styles.item}>
              <button className={styles.itemButton}>value 2</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
