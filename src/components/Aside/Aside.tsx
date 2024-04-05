import classNames from 'classnames';
import React, { useContext } from 'react';
import { Nav } from '../Nav';
import { CatalogContext } from '../Contexts/CatalogContext';
import { TopBar } from '../TopBar';

export const Aside: React.FC = () => {
  const { aside, closeAsideAndGoTop } = useContext(CatalogContext);

  return (
    <aside
      id="menu"
      className={classNames('page__aside aside', {
        'page__aside--open': aside,
      })}
    >
      <TopBar />

      <Nav closeAsideAndGoTop={closeAsideAndGoTop} aside={true} />
    </aside>
  );
};
