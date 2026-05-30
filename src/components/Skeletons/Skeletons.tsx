import React from 'react';
import { Product } from '../../types/Product';
import './Skeletons.scss';
import ContentLoader from 'react-content-loader';

type Props = {
  products: Product[];
};

export const Skeletons: React.FC<Props> = React.memo(({ products }) => {
  return (
    <div className="skeletons">
      <div className="skeletons__content">
        <div className="skeletons__list">
          {products.map(product => (
            <div className="skeletons__item" key={product.id}>
              <ContentLoader
                speed={1}
                width={272}
                height={506}
                viewBox="0 0 272 506"
                backgroundColor="#dcdbdb"
                foregroundColor="#f3f1f1"
              >
                <rect x="31" y="31" rx="2" ry="2" width="208" height="196" />
                <rect x="31" y="235" rx="0" ry="0" width="208" height="58" />
                <rect x="120" y="251" rx="0" ry="0" width="11" height="3" />
                <rect x="32" y="301" rx="0" ry="0" width="50" height="31" />
                <rect x="32" y="340" rx="0" ry="0" width="208" height="1" />
                <rect x="32" y="349" rx="0" ry="0" width="208" height="77" />
                <rect x="32" y="434" rx="0" ry="0" width="160" height="40" />
                <rect x="200" y="434" rx="0" ry="0" width="40" height="40" />
              </ContentLoader>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Skeletons.displayName = 'Skeletons';
