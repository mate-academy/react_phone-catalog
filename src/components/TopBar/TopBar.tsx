import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../Nav';
import { CatalogContext } from '../Contexts/CatalogContext';

type Props = {
  nav?: boolean;
};

export const TopBar: React.FC<Props> = ({ nav = false }) => {
  const { setAside, closeAsideAndGoTop } = useContext(CatalogContext);

  const handlerClick = () => {
    if (nav) {
      setAside(true);
    } else {
      closeAsideAndGoTop(false);
    }
  };

  return (
    <div className="top-bar">
      <Link to="" onClick={() => closeAsideAndGoTop(true)}>
        <img className="top-bar__logo" src="img/Logo.png" alt="logo" />
      </Link>

      <div className="top-bar__wrapper">
        <div className="top-bar__icon" onClick={handlerClick}>
          {nav ? (
            <img
              className="top-bar__image"
              src="img/icons/menu.png"
              alt="aside button"
            />
          ) : (
            <img
              className="top-bar__image"
              src="img/icons/close.png"
              alt="aside button"
            />
          )}
        </div>
      </div>

      {nav && <Nav closeAsideAndGoTop={closeAsideAndGoTop} topBar={true} />}
    </div>
  );
};
