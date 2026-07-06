//#region imports
import { FC } from 'react';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import { ProductOptions } from '../ProductOptions/ProductOptions';
import { PurchaseBlock } from '../PurchaseBlock';
import { Product } from '../../../shared/types/Product';
import { TechSpecsList } from '../TechSpecsList';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

export const MainParams: FC<Props> = ({ productDetails, product }) => {
  const { priceDiscount, priceRegular, screen, resolution, processor, ram } =
    productDetails;

  const mainSpecs = {
    screen,
    resolution,
    processor,
    ram,
  };

  return (
    <div className={baseStyles.mainParams}>
      <ProductOptions productDetails={productDetails} />

      <PurchaseBlock
        product={product}
        price={priceDiscount}
        fullPrice={priceRegular}
      />

      <TechSpecsList specs={mainSpecs} variant={'summary'} />
    </div>
  );
};
