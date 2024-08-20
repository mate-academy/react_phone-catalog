import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from 'usehooks-ts';
import { Option } from '../types/dropdownButton';
import arrowIconDisable from '../images/icons/arrow-icon-disable.svg';

interface Props {
  options: Option[];
  initialOption: string;
  onClickOptipn: (value: Option) => void;
}

export const DropdownButton: React.FC<Props> = ({
  options,
  initialOption,
  onClickOptipn,
}) => {
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (value: Option) => {
    onClickOptipn(value);

    setDropdownToggle(false);
  };

  const handleClickOutside = () => {
    setDropdownToggle(false);
  };

  useOnClickOutside<HTMLDivElement>([dropdownRef], handleClickOutside);

  return (
    <button
      onClick={() => setDropdownToggle(!dropdownToggle)}
      className={twMerge(
        `relative box-border flex h-10 w-full items-center
          justify-between border border-icons px-3 hover:border-secondary`,
        dropdownToggle && 'text-primary hover:border-primary',
      )}
      ref={dropdownRef}
    >
      {initialOption}
      <img
        className={twMerge(!dropdownToggle && 'rotate-180')}
        src={arrowIconDisable}
        alt="Arrow Icon"
      />
      <div
        className={twMerge(
          `absolute -bottom-2.5 left-0 z-10 hidden w-full
            translate-y-full border border-icons bg-white`,
          dropdownToggle && 'flex flex-col',
        )}
      >
        {options.map(option => (
          <button
            key={option.id}
            className="
                flex h-10 w-full items-center justify-start
                px-3 text-secondary hover:bg-hoverBG hover:text-primary
              "
            onClick={() => handleSelectOption(option)}
          >
            {option.title}
          </button>
        ))}
      </div>
    </button>
  );
};
