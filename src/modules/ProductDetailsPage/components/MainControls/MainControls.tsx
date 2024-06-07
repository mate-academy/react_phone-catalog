import { ProductDetails } from '../../../../types/ProductDetails';
import './MainControls.scss';
import { ColorOptions } from './ColorOptions/ColorOptions';
import { CapacityOptions } from './CapacityOptions/CapacityOptions';
import { MainInfo } from './MainInfo/MainInfo';
import { ActionButtons } from '../../../shared/ActionsButton';
import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { getProduct } from '../../../../services/products';

type Props = {
  product: ProductDetails | null;
};

export const MainControls: React.FC<Props> = ({ product }) => {
  const [productFotBttn, setProductFotBttn] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      getProduct(product.id).then(setProductFotBttn);
    }
  }, [product]);

  return (
    <div className="mainControls">
      <div className="mainControls__variables">
        <ColorOptions product={product} />
        <span className="mainControls__detail"></span>
        <CapacityOptions product={product} />
        <span className="mainControls__detail"></span>
      </div>
      <div className="mainControls__price">
        <p className="h2 mainControls__discount">${product?.priceDiscount}</p>
        <p className="mainControls__fullPrice">${product?.priceRegular}</p>
      </div>
      <div className="mainControls__buttons">
        {productFotBttn && <ActionButtons product={productFotBttn} />}
      </div>

      <div className="mainControls__info">
        <MainInfo product={product} />
      </div>
    </div>
  );
};
