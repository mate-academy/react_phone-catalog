/* eslint-disable no-console */
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from '../../../SVG/ChevronDown/ChevronDown';
import { ChevronUp } from '../../../SVG/ChevronUp/ChevronUp';
import { ModalforSelectString }
  from './ModalforSelectString/ModalforSelectString';
import './SelectCustomString.scss';

type Props = {
  options: string[][];
};

export const SelectCustomString: React.FC<Props> = ({ options }) => {
  const [click, setClick] = useState(false);
  const [animationOnDisappear, setAnimationOnDisappear] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const [sortBy, setSortBy] = useState(options[0][1]);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (sort) {
      setSortBy(sort);
    }
  }, []);

  const closeHandler = () => {
    setAnimationOnDisappear(true);
    setTimeout(() => {
      setClick(false);
      setAnimationOnDisappear(false);
    }, 300);
  };

  return (
    <div className="Select__wrapper">
      <button
        ref={button}
        type="button"
        className="Select"
        onClick={() => {
          if (!click) {
            setClick(true);
          } else {
            closeHandler();
          }
        }}
      >
        <h3 className="Select__value">
          {sortBy}
        </h3>
        { !click ? (<ChevronDown />) : (<ChevronUp />)}
      </button>
      {
        click && button && (
          <ModalforSelectString
            options={options}
            closeHandler={closeHandler}
            button={button}
            setSortBy={setSortBy}
            animationOnDisappear={animationOnDisappear}
          />
        )
      }
    </div>
  );
};
