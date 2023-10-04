import { ReactNode } from 'react';
import './ProductGrid.scss';

type Props = {
  children: ReactNode,
};

export const ProductGrid: React.FC<Props> = ({ children }) => {
  return (
    <div className="product-grid">
      {children}
    </div>
  );
};
