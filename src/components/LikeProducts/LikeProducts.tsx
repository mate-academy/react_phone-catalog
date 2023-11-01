import React from 'react';
import { Product } from '../../helpers/Product';
import './LikeProducts.scss';
import { Phone } from '../Phone/Phone';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

type Props = {
  likePr: Product[];
  onLikeClick: (product: Product) => void;
  addProduct: Product[];
  onAddtoChart: (product: Product) => void;
};

export const LikeProduct: React.FC<Props> = ({
  likePr,
  onLikeClick,
  addProduct,
  onAddtoChart,
}) => {
  return (
    <div className="likePage">
      <BreadCrumbs />
      <h1 className="likePage__header">Favourites</h1>
      <p className="likePage__counter">{`${likePr.length} items`}</p>

      {likePr.length !== 0 ? (
        <div className="likePage__container">
          {likePr.map(like => (
            <Phone
              product={like}
              onLikeClick={onLikeClick}
              key={like.id}
              likeProduct={likePr}
              addProduct={addProduct}
              onAddtoChart={onAddtoChart}
            />
          ))}
        </div>
      )
        : (<div className="likePage__not">You haven't liked any products yet!</div>
        )}
    </div>
  );
};
