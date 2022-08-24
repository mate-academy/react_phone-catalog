/* eslint-disable no-console */
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from '../../../SVG/ChevronDown/ChevronDown';
import { ChevronUp } from '../../../SVG/ChevronUp/ChevronUp';
import { ModalforSelectNumber }
  from './ModalforSelectNumber/ModalforSelectNumber';
import '../SelectCustomString/SelectCustomString.scss';

type Props = {
  options: number[];
};

export const SelectCustomNumber: React.FC<Props> = ({ options }) => {
  const [click, setClick] = useState(false);
  const [animationOnDisappear, setAnimationOnDisappear] = useState(false);
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage');
  const [pagination, setPagination] = useState(`${options[0]}`);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (perPage) {
      setPagination(perPage);
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
        className="Select Number"
        onClick={() => {
          if (!click) {
            setClick(true);
          } else {
            closeHandler();
          }
        }}
      >
        <h3 className="Select__value">
          {pagination}
        </h3>
        { !click ? (<ChevronDown />) : (<ChevronUp />)}
      </button>
      {
        click && button && (
          <ModalforSelectNumber
            options={options}
            closeHandler={closeHandler}
            button={button}
            setPagination={setPagination}
            animationOnDisappear={animationOnDisappear}
          />
        )
      }
    </div>
  );
};
