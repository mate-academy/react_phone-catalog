import React, { useContext } from 'react';
import './ProductProperties.scss';
import type { ProductDetails } from '../../../../shared/types/ProductDetails';
import { SelectOption } from '../../../../shared/components/SelectOption';
import { ProductPrice } from '../../../../shared/components/ProductPrice';
import { BtnAdd } from '../../../../shared/components/BtnAdd';
import { BtnLike } from '../../../../shared/components/BtnLike';
import { PropertyTable } from '../../../../shared/components/PropertyTable';
import { TranslationContext } from '../../../../../i18next/shared';

type ProductPropertiesProps = {
  product: ProductDetails;
};

export const ProductProperties: React.FC<ProductPropertiesProps> = ({
  product,
}) => {
  const { propDetailsTitle } = useContext(TranslationContext);
  const productProperties = [
    { name: 'screen', value: product.screen },
    { name: 'resolution', value: product.resolution },
    { name: 'processor', value: product.processor },
    { name: 'ram', value: product.ram },
  ];

  return (
    <div className="product-properties">
      <div className="product-properties__btn-selection">
        <SelectOption
          content={{
            product: product,
            title: propDetailsTitle.colors,
            options: product.colorsAvailable,
            currentOption: product.color,
            btnStyle: 'round',
            optionType: 'color',
          }}
        />
        <SelectOption
          content={{
            product: product,
            title: propDetailsTitle.capacity,
            options: product.capacityAvailable,
            currentOption: product.capacity,
            btnStyle: 'regular',
            optionType: 'capacity',
          }}
        />
      </div>
      <div className="product-properties__price-section">
        <ProductPrice
          price={product.priceDiscount}
          fullPrice={product.priceRegular}
          textStyle="medium"
        />
        <div className="product-properties__price-section__btn-add">
          <BtnAdd selectedProductID={product.id} />
          <BtnLike buttonSize="medium" productId={product.id} />
        </div>
      </div>
      <div className="product-properties__info">
        <PropertyTable properties={productProperties} textStyle="medium" />
      </div>
    </div>
  );
};
