import { useEffect, useRef, useState } from 'react';
import { DropMenu } from '../types/DropMenu';
import { ReactComponent as Arrow } from '../assets/images/icons/arrow-top.svg';

type Props = DropMenu;

const DropDown: React.FC<Props> = (props) => {
  const {
    options,
    handleChange,
    title,
    defaultValue = options[0],
  } = props;

  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line
  const setValue = (e: any) => {
    setSelectedValue(e.target.textContent);
  };
  // eslint-disable-next-line
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      // eslint-disable-next-line
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  return (
    <div className="DropDown">
      <p className="DropDown__title">
        {title}
      </p>
      <div ref={wrapperRef} className="DropDown__listContainer">
        <p
          className="DropDown__value"
          onClick={() => setIsOpen(!isOpen)}
          aria-hidden="true"
        >
          {selectedValue}
        </p>
        <div
          style={isOpen ? {} : { transform: 'rotate(180deg)' }}
          className="DropDown__arrow"
        >
          <Arrow />
        </div>
        {isOpen && (
          <ul className="DropDown__list">
            {options.map(option => (
              <li
                key={option}
                className="DropDown__option"
                onClick={(e) => {
                  handleChange(e);
                  setValue(e);
                  setIsOpen(false);
                }}
                aria-hidden="true"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDown;
