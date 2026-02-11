import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  amountOfProducts: number;
  classForBadge?: string;
}

export const BagedIcon: React.FC<Props> = ({
  children,
  amountOfProducts,
  classForBadge = '',
}) => {
  return (
    <React.Fragment>
      {amountOfProducts ? (
        <span className={classForBadge}>{amountOfProducts}</span>
      ) : (
        ''
      )}
      {children}
    </React.Fragment>
  );
};
