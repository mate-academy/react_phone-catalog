/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowTop, ArrowBottom } from '../../icons';
import { TSort, TPage } from '../../types';

import './DropDown.scss';

type Props = {
  listOfProperties: TSort | TPage,
  handleClick:(value: string) => void;
  nameProperties: string | number | undefined;
  label: string;
};

export const DropDown: FC<Props> = ({
  listOfProperties,
  handleClick,
  nameProperties,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(x => !x);
  };

  useEffect(() => {
    const handelCloseSort = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handelCloseSort);

    return () => {
      document.removeEventListener('click', handelCloseSort);
    };
  }, [ref]);

  return (
    <div className="dropdown" ref={ref}>
      <label htmlFor="sort">{label}</label>
      <button
        id="sort"
        type="button"
        className="dropdown__btn"
        onClick={handleOpen}
      >
        <span>{nameProperties}</span>
        {isOpen ? <ArrowTop color="#b4bdc4" /> : <ArrowBottom />}
      </button>

      {isOpen && (
        <ul
          className="dropdown__content"
        >
          {Object.entries(listOfProperties).map(([key, value]) => (
            <li
              key={key}
              className="dropdown__item"
              onClick={() => {
                handleClick(value);
                setIsOpen(false);
              }}
            >
              {key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
