/* eslint-disable prettier/prettier */
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { AsideMenu } from '../../../AsideMenu/components/AsideMenu';
import { useAppSelector } from '../../../../app/hooks';
import { Body } from '../../../../Body';

export const AnimatedBody = () => {
  const IsAside = useAppSelector(state => state.asideReducer);
  const element = IsAside ? <AsideMenu /> : <Body />;

  return (
    <AnimatePresence mode="wait" initial={true}>
      {element ?
        React.cloneElement(element, { key: IsAside ? 'menu' : 'body' })
        : null}
    </AnimatePresence>
  );
};
