import React from 'react';
import { ScrollToSectionProvider } from './ScrollToSectionContext';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return <ScrollToSectionProvider>{children}</ScrollToSectionProvider>;
};
