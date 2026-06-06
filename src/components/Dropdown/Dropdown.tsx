import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';

type Select = {
  title: string;
  option: string;
};

type Props<T extends readonly Select[]> = React.HTMLAttributes<HTMLDivElement> & {
  selects: T;
  selected: NoInfer<T[number]['option']>;
  onSelected?: (value: NoInfer<T[number]['option']>) => void;
};

export const Dropdown = <const T extends readonly Select[]>({
  selects,
  selected,
  onSelected = () => {},
  ...props
}: Props<T>) => {
  const [isActive, setIsActive] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

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
          ref={triggerRef}
          className={styles.trigger}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {selects.find((select) => select.option === selected)?.title}
          <Icon className={styles.triggerIcon} type="arrowRight"></Icon>
        </button>
        <div ref={contentRef} aria-hidden={!isActive} className={styles.content}>
          <ul>
            {selects.map((select, index) => {
              return (
                <li key={selected + index}>
                  <button
                    className={styles.itemButton}
                    onClick={() => {
                      onSelected(select.option);
                      setIsActive(false);
                      triggerRef.current?.focus();
                    }}
                  >
                    {select.title}
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
