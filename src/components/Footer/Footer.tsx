import { MainFooter } from '../blocks/MainFooter';
import { MenuFooter } from '../blocks/MenuFooter';
import { Fragment, useContext } from 'react';
import { IsActiveMenuContext } from '../../context/IsActiveMenuContext';

export const Footer = () => {
  const { isActiveMenu } = useContext(IsActiveMenuContext);

  return <Fragment>{isActiveMenu ? <MenuFooter /> : <MainFooter />}</Fragment>;
};
