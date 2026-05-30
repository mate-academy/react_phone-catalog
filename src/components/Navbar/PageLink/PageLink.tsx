import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PageName } from '../../../types';
import { CatalogContext } from '../../../context/CatalogContext';
import { getLinkClass } from '../../../utils/service';

type Props = {
  name: PageName;
  handleClearQuery: () => void;
};

export const PageLink: React.FC<Props> = ({ name, handleClearQuery }) => {
  const { handleLinkClick } = useContext(CatalogContext);

  const handleClick = () => {
    handleClearQuery();
    handleLinkClick(false);
  };

  return (
    <NavLink
      to={name.toLowerCase()}
      className={getLinkClass}
      onClick={handleClick}
    >
      {name}
    </NavLink>
  );
};
