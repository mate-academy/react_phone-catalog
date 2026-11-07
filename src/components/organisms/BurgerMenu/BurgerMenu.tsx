import type React from 'react';
import { NavigationTopList } from '../../molecules/Navigation/NavigationTopList';
import { NavigationButtons } from '../../molecules/Navigation/NavigationalButtons';

type Props = {
  isOpen: boolean;
  handleClickLink: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isOpen, handleClickLink }) => (
  <div
    className={`
      fixed z-40 top-12 right-0 bottom-0 left-0
      flex flex-col justify-between items-center
      pt-6 bg-white dark:bg-primary
      transition-transform duration-400 ease-in-out
      md:hidden
      ${isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'}
    `}
  >
    <NavigationTopList
      direction="column"
      handleClickLink={handleClickLink}
    />

    <NavigationButtons
      classNames="w-full border-t border-elements"
      onClick={handleClickLink}
    />
  </div>
);
