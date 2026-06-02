import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';

type Props<T extends readonly string[]> = React.HTMLAttributes<HTMLDivElement> & {
  selects: T;
  selected: NoInfer<T[number]>;
  onSelected?: (value: NoInfer<T[number]>) => void;
};

export const Dropdown = <const T extends readonly string[]>({
  selects,
  selected,
  onSelected = () => {},
  ...props
}: Props<T>) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selected);

  const contentRef = useRef<HTMLDivElement | null>(null);

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

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [isActive]);

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    content.style.overflowY = 'hidden';

    if (!isActive) {
      return;
    }

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== content) {
        return;
      }

      if (event.propertyName !== 'opacity') {
        return;
      }

      content.style.overflowY = 'auto';
      content.removeEventListener('transitionend', handleTransitionEnd);
    };

    content.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      content.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isActive]);

  return (
    <div {...props}>
      <div
        className={classNames(styles.dropdown, { [styles.isActive]: isActive })}
        ref={dropdownRef}
      >
        <button
          className={styles.trigger}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {selectedItem}
            <Icon className={styles.triggerIcon} type="arrowRight"></Icon>
        </button>
        <div ref={contentRef} aria-hidden={!isActive} className={styles.content}>
          <ul className={styles.list}>
            {selects.map((select, index) => {
              return (
                <li key={select + index} className={styles.item}>
                  <button
                    className={styles.itemButton}
                    onClick={() => {
                      onSelected(select);
                      setSelectedItem(select);
                      setIsActive(false);
                    }}
                  >
                    {select}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
