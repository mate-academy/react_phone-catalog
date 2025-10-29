import { FC, useEffect, useRef, useState } from 'react';
import styled from './dropwdown.module.scss';
import arrow from '@Images/icons/dropdown-arrow.svg';
import cn from 'classnames';

type Props = {
  sort: string[];
  onSelect: (v: string) => void;
  selected: string;
};

export const Dropdown: FC<Props> = ({ sort, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
          {selected}
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
            {sort.map(s => {
              return (
                <div
                  key={s}
                  onClick={() => {
                    onSelect(s);
                    setIsOpen(false);
                  }}
                  className={styled['dropdown-item']}
                >
                  {s}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
