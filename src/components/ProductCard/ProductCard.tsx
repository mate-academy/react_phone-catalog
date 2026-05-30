import React from 'react';
import style from './ProductCard.module.scss';
import { Product } from '../../utils/Product';
import { useNavigate } from 'react-router-dom';
import { CharacteristicsTable } from '../CharactTable/CharactTable';
import { Buttons } from '../Buttons/Buttons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className={style.product}
      onClick={() => navigate(`/${product.category}/${product.id}`)}
    >
      <div className={style.product__characteristics}>
        <img
          className={style.product__image}
          src={product.images[0]}
          alt={product.name}
        />

        <p className={style.product__description}>{product.name}</p>

        <div className={style.product__price}>
          <p
            className={
              style.product__price + ' ' + style['product__price--discount']
            }
          >
            ${product.priceDiscount}
          </p>
          <p
            className={
              style.product__price + ' ' + style['product__price--regular']
            }
          >
            ${product.priceRegular}
          </p>
        </div>
      </div>

      <CharacteristicsTable
        characteristics={[
          { name: 'Screen', value: product?.screen },
          { name: 'Capacity', value: product?.capacity },
          { name: 'RAM', value: product?.ram },
        ]}
      />

      <Buttons product={product} />
    </div>
  );
};
