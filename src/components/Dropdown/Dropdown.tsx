import { useEffect, useRef, useState } from 'react';
import styled from './dropwdown.module.scss';
import arrow from '@Images/icons/dropdown-arrow.svg';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

type Props<T extends string | number> = {
  sort: T[];
  onSelect: (v: T) => void;
  selected: T;
};

export const Dropdown = <T extends string | number>({
  sort,
  onSelect,
  selected,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const handle = (e: Event) => {
      if (!dropdownRef.current) {
        return;
      }

      const target = e.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handle);

    return () => document.removeEventListener('click', handle);
  }, []);

  return (
    <>
      <div
        ref={dropdownRef}
        className={cn(styled.dropdown, {
          [styled['dropdown-active']]: isOpen,
        })}
      >
        <div
          className={styled['dropdown-btn']}
          onClick={() => setIsOpen(!isOpen)}
        >
          {t(`sortBy.${selected}`)}
          <span className={styled.arrow}>
            <img
              className={cn(styled.img, {
                [styled['img-active']]: isOpen,
              })}
              src={arrow}
              alt="arrow-dropdown"
            />
          </span>
        </div>
        {isOpen && (
          <div
            className={cn(styled['dropdown-content'], {
              [styled['dropdown-content--active']]: isOpen,
            })}
          >
            {sort.map((s, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    onSelect(s);
                    setIsOpen(false);
                  }}
                  className={styled['dropdown-item']}
                >
                  {t(`sortBy.${s.toString()}`)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
