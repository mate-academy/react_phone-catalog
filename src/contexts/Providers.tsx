import React from 'react';
import { ScrollToSectProvider } from './ScrollToSectContext';
import { AddToCartProvider } from './AddToCartContext';
import { AddToFavProvider } from './AddToFavContext';

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
