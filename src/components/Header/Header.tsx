import React, { useContext, useEffect } from 'react';
import { CatalogContext } from '../Contexts/CatalogContext';
import { Aside } from '../Aside';
import { TopBar } from '../TopBar';

export const Header: React.FC = () => {
  const { aside } = useContext(CatalogContext);

  useEffect(() => {
    document.body.style.overflow = aside ? 'hidden' : 'auto';
  }, [aside]);

  return (
    <>
      <TopBar nav={true} />

      <Aside />
    </>
  );
};
