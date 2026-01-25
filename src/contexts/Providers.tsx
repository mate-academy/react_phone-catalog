import React from 'react';
import { AddToCartProvider } from './AddToCartContext';
import { AddToFavProvider } from './AddToFavContext';
import { ScrollToSectProvider } from './ScrollToSectContext';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ScrollToSectProvider>
      <AddToCartProvider>
        <AddToFavProvider>{children}</AddToFavProvider>
      </AddToCartProvider>
    </ScrollToSectProvider>
  );
};
