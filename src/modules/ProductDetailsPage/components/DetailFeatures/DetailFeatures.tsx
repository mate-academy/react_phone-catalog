import cn from 'classnames';
import style from './detailFeatures.module.scss';
import {
  DetailProductType,
  Product,
  ProductEnum,
} from '../../../../types/ProductType';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../../../../../public/api/products.json';
import { FeaturesColors } from './components/FeaturesColors';
import { Boundary } from '../../../shared/components/Boundary';
import { FeaturesCapacity } from './components/FeaturesCapacity';
import { ProductPrice } from '../../../shared/components/ProductPrice';
import { Button } from '../../../shared/components/Button';
import { TechSpecsList } from '../../../shared/components/TechSpecsList';

interface Props {
  detailProdct: DetailProductType;
}

export const DetailFeatures: React.FC<Props> = React.memo(
  ({ detailProdct }) => {
    const [product, setProduct] = useState<Product>({} as Product);
    const smallTechLst = {
      ...product,
      [ProductEnum.processor.toLowerCase()]: detailProdct.processor,
    };
    const id = product?.id || 0;
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const handleRedirect = useCallback(
      async (currentParam: string, newParam: string) => {
        const normalizeNewParam = newParam.toLowerCase();
        const normalizeCurrentParam = currentParam.toLowerCase();

        const itemId = pathname.replace(
          normalizeCurrentParam,
          normalizeNewParam,
        );

        if (currentParam && !pathname.includes(normalizeNewParam)) {
          navigate(itemId);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    useEffect(() => {
      setProduct(
        products.find(p => p.itemId === detailProdct.id) || ({} as Product),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={cn(style.features)}>
        <div className={cn(style['features__select-content'])}>
          <div className={cn(style['features__colors-content'])}>
            <div className={cn(style['features__title-content'])}>
              <p className={cn(style.features__title)}>Available colors</p>
              <p className={cn(style.features__title)}>ID: {id}</p>
            </div>
            <div className={cn(style.features__colors)}>
              {detailProdct.colorsAvailable.map(color => (
                <FeaturesColors
                  key={color}
                  itemId={detailProdct.id}
                  currentColor={detailProdct.color}
                  color={color}
                  handleRedirect={handleRedirect}
                />
              ))}
            </div>
          </div>
          <Boundary />
          <div className={cn(style['features__capacity-content'])}>
            <p className={cn(style.features__title)}>Select capacity</p>
            <div className={cn(style.features__capacity)}>
              {detailProdct.capacityAvailable.map(capacity => (
                <FeaturesCapacity
                  key={capacity}
                  handleRedirect={handleRedirect}
                  capacity={capacity}
                  currentCapacity={detailProdct.capacity}
                />
              ))}
            </div>
          </div>
          <Boundary />
        </div>
        <div className={cn(style['features__button-content'])}>
          <ProductPrice
            fullPrice={detailProdct.priceRegular}
            priceDiscount={detailProdct.priceDiscount}
          />
          <Button isIcon={true} product={product} />
        </div>
        <TechSpecsList product={smallTechLst} />
      </div>
    );
  },
);

DetailFeatures.displayName = 'DetailFeatures';
