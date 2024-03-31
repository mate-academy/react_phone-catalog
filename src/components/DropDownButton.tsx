import { useRef, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import arrowDisableIcon from '../images/icons/arrow-top-disabled.svg';
import { useOnClickOutside } from 'usehooks-ts';

interface Props {
  className?: string;
  options?: string[];
  placeholder?: string;
  onChange?: (option: string) => void;
}

export const DropDownButton: React.FC<Props> = ({
  className = '',
  placeholder = '',
  onChange = () => {},
  options,
}) => {
  const [active, setActive] = useState(false);
  const dropDownRef = useRef(null);
  const buttonRef = useRef(null);

  useOnClickOutside([dropDownRef, buttonRef], () => setActive(false));

  return (
    <button
      ref={buttonRef}
      className={twMerge(
        `relative flex h-10 max-w-44 flex-1 items-center justify-between border
        border-icons px-3 py-2.5 hover:border-x-secondary`,
        className,
        active && 'border-primary',
      )}
      onClick={() => setActive(c => !c)}
    >
      <p className="font-semibold">{placeholder}</p>
      <img
        className={twJoin(active && 'rotate-180')}
        src={arrowDisableIcon}
        alt="Arrow"
      />
      {active && options && (
        <div
          ref={dropDownRef}
          className="absolute -bottom-1 left-0 w-full translate-y-full border 
          border-elements bg-white py-2
            shadow-[0_2px_15px_0_#0000000D]"
        >
          {options.map(option => (
            <p
              className="min-h-8 w-full cursor-pointer px-3 py-1.5
              text-left text-secondary transition 
              hover:bg-[#FAFBFC] hover:text-primary"
              key={option}
              onClick={() => onChange(option)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </button>
  );
};
