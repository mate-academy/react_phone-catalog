import { useContext } from 'react';
import './Aside.scss';
import { DevicesContext, DevicesContextType } from '../../DevicesContext';
import { Link } from 'react-router-dom';

export const Aside = () => {
  const context = useContext<DevicesContextType | undefined>(DevicesContext);

  if (!context) {
    return null;
  }

  const { navMenuList } = context;

  return (
    <div className="aside">
      <div className="aside__container">
        {navMenuList.map((item: string, ind: number) => (
          <Link
            to={item === 'home' ? '/' : `/${item}`}
            className={`aside__menu aside__menu--${item}`}
            key={ind}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};
