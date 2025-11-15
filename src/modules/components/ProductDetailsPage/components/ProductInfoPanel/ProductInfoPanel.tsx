import React, { useContext } from 'react';
import './ProductInfoPanel.scss';
import type { ProductDetails } from '../../../../shared/types/ProductDetails';
import { ProductVariantSelector } from '../ProductVariantSelector';
import { ProductPrice } from '../../../../shared/components/ui/ProductPrice';
import { BtnAdd } from '../../../../shared/components/Buttons/BtnAdd';
import { BtnLike } from '../../../../shared/components/Buttons/BtnLike';
import { ProductPropertyTable } from '../../../../shared/components/ui/ProductPropertyTable';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type ProductInfoPanelProps = {
  product: ProductDetails;
};

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
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
        <ProductVariantSelector
          content={{
            product: product,
            title: propDetailsTitle.colors,
            options: product.colorsAvailable,
            currentOption: product.color,
            btnStyle: 'round',
            optionType: 'color',
          }}
        />
        <ProductVariantSelector
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
        <ProductPropertyTable
          properties={productProperties}
          textStyle="medium"
        />
      </div>
    </div>
  );
};
