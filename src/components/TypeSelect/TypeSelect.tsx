/* eslint-disable max-len */
import { useState } from 'react';

type Props = {
  sortType:string;
  handler: (arg: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const TypeSelect: React.FC<Props> = ({ sortType, handler }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onclick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handler(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <p className="h6 mb-1">Sort by</p>

      <button
        type="button"
        className="flex h-10 w-44 border border-secondary justify-between py-[10px] px-3 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="whitespace-nowrap h5 h-auto first-letter:uppercase">
          {sortType}
        </span>
        <img src="img/svg/arrow-down.svg" alt="arrow" className={isOpen ? 'rotate-180' : ''} />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col w-44 bg-[#fff] bottom-[-100px] shadow-md border border-elements">
          <a
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
            onClick={(e) => onclick(e)}
          >
            Newest
          </a>
          <a
            onClick={(e) => onclick(e)}
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
          >
            Cheapest
          </a>
          <a
            onClick={(e) => onclick(e)}
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
          >
            Alphabetically
          </a>
        </div>
      )}

    </div>
  );
};
