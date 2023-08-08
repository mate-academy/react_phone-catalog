import { FC } from 'react';
import './style.scss';

type Props = {
  setIsNav: React.Dispatch<React.SetStateAction<boolean>>,
  isNav: boolean,
};

export const BurgerMenu: FC<Props> = ({ setIsNav, isNav }) => {
  return (
    <button
      type="button"
      className="btn"
      onClick={() => setIsNav(prev => !prev)}
    >
      <div className={isNav ? 'btn__burgerClose' : 'btn__burger'} />
    </button>
  );
};
