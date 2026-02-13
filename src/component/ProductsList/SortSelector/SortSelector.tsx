import React, { useEffect, useRef, useState } from 'react';
import style from './SortSelector.module.scss';
import { useSearchParams } from 'react-router-dom';
import ArrowDown from './../../../../public/icon/Arrow Down.png';
import cn from 'classnames';

interface Props {
  title: string;
  type: string;
  items: { name: string; value: string }[];
}

export const SortSelector: React.FC<Props> = ({ title, type, items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const dropDown = useRef<HTMLDivElement>(null);

  const selectedValue =
    items.find(item => item.value === searchParams.get(type)) || items[0];

  const onChangeValue = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(type, value);
    params.set('page', '1');

    setSearchParams(params);
    setIsOpen(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (dropDown.current && !dropDown.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <div className={style.selector}>
      <div className={style.selector__container}></div>
      <p className={style.selector__title}>{title}</p>
      <div className={style.selector__dropdown} ref={dropDown}>
        <div className={style.selector__content}>
          <button
            id={type}
            className={style.selector__select}
            onClick={() => setIsOpen(!isOpen)}
          >
            <p className={style.selector__text}>{selectedValue.name}</p>
            <img src={ArrowDown} className={style.selector__icon} />
          </button>

          {isOpen && (
            <div className={style.selector__menu}>
              {items.map(item => (
                <button
                  key={item.value}
                  className={cn(style.selector__item, {
                    [style['selector__item--active']]:
                      item.value === selectedValue.value,
                  })}
                  onClick={() => onChangeValue(item.value)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
