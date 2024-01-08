/* eslint-disable no-console */
import { useState } from 'react';

/* eslint-disable max-len */
type Props = {
  onPage: number | string;
  handler: (arg: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};
export const ItemsOnPage:React.FC<Props> = ({ onPage, handler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onclick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handler(e);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <p className="h6 mb-1">Items on page</p>

      <button
        type="button"
        className="flex h-10 w-44 border border-secondary justify-between py-[10px] px-3 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="whitespace-nowrap h5 h-auto">
          {onPage}
        </span>
        <img src="img/svg/arrow-down.svg" alt="arrow" className={isOpen ? 'rotate-180' : ''} />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col w-44 bg-[#fff] bottom-[-132px] shadow-md border border-elements">
          <a
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
            onClick={(e) => onclick(e)}
          >
            All
          </a>
          <a
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
            onClick={(e) => onclick(e)}
          >
            4
          </a>
          <a
            onClick={(e) => onclick(e)}
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
          >
            8
          </a>
          <a
            onClick={(e) => onclick(e)}
            href="."
            className="flex h-8 items-center h5 px-3 text-secondary hover:text-primary"
          >
            16
          </a>
        </div>
      )}

    </div>
  );
};
