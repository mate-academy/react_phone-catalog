/* eslint-disable max-len */

import { useContext } from 'react';
import s from './GoodsSlider.module.scss';

import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsContext } from '../../Context/ProductsContext';
import Product from '../../types/Product';
// import { ReactComponent as Right } from '/img/icons/Stroke_right.svg';

type Props = {
  collectionType: string;
  typePagin?: string;
};

export const GoodsSlider: React.FC<Props> = ({ collectionType }) => {
  const { products } = useContext(ProductsContext);

  let visibleProducts: Product[] = [];

  // console.log(
  //   [...products]
  //     .sort((itemA, itemB) => itemB.year - itemA.year)
  //     .filter((product, index, arr) => {
  //       return !arr.slice(0, index).some(prev => {
  //         const baseName = prev.itemId.split('-').slice(0, -2).join('-');
  //         product.itemId.includes(baseName);
  //       });
  //     })
  //     .sort(() => 0.5 - Math.random()),
  // );

  switch (collectionType) {
    case 'alsoLike':
      visibleProducts = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      // .filter(item => item.itemId !== product?.itemId)
      break;
    case 'new':
      visibleProducts = [...products]
        .sort((itemA, itemB) => itemB.year - itemA.year)
        // .filter(it => Math.max(it.year))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      break;
    case 'hot':
      visibleProducts = [...products]
        .sort((itemA, itemB) => itemB.price - itemA.price)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      break;

    default:
      break;
  }

  return (
    <div className={`${s.goods_slider}`}>
      <div className="columns">
        {visibleProducts.map(product => (
          <div className="column" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
