import React from 'react';
import styles from './ProductInfo.module.scss';
import { Goods } from '../../../../types/Goods';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductPrice } from '../../../../shared/layout/ProductPrice';
import { Buttons } from '../../../../shared/layout/Buttons';
import { Details } from '../../../../shared/layout/Details/Details';
import { ColorSelector } from './components/ColorSelector';
import { CapacitySelector } from './components/CapacitySelector';
import { ProductImages } from './components/ProductImages/ProductImages';

type Props = {
  product: Goods;
};

const details = ['Screen', 'Resolution', 'Processor', 'RAM'];

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();
  const model = pathname.split('/').pop()?.split('-') || [];
  const color = model[model.length - 1];
  const capacity = model[model.length - 2];

  const navigate = useNavigate();

  const handleChangeParam = (value: string, param: string) => {
    let path = pathname;

    switch (param) {
      case 'color': {
        model[model.length - 1] = value;

        break;
      }

      case 'capacity': {
        model[model.length - 2] = value.toLocaleLowerCase();

        break;
      }
    }

    path = `/${product.category}/${model.join('-')}`;
    navigate(path);
  };

  return (
    <div className={styles['product-info']}>
      <div className={styles['product-info__container']}>
        <div className={styles['product-info__title']}>{product.name}</div>
        <div className={styles['product-info__wrapper']}>
          <div className={styles['product-info__left']}>
            <ProductImages product={product} />
          </div>

          <div className={styles['product-info__right']}>
            <ColorSelector
              product={product}
              handleChangeParam={handleChangeParam}
              color={color}
            />

            <CapacitySelector
              product={product}
              handleChangeParam={handleChangeParam}
              capacity={capacity}
            />

            <div className={styles['product-info__price']}>
              <ProductPrice
                fullPrice={product.priceRegular}
                price={product.priceDiscount}
              />
            </div>

            <div className={styles['product-info__buttons']}>
              <Buttons productId={product.id} />
            </div>

            <Details
              product={product}
              details={details}
              customStyles={'small-font'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
