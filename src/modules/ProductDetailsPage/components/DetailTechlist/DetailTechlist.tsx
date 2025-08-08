import React from 'react';
import cn from 'classnames';
import style from './detailTechlist.module.scss';
import { TechSpecsList } from '../../../shared/components/TechSpecsList';
import { DetailProductType } from '../../../../types/ProductType';
import { Boundary } from '../../../shared/components/Boundary';

interface Props {
  detailProduct: DetailProductType;
}

export const DetailTechlist: React.FC<Props> = React.memo(
  ({ detailProduct }) => {
    function renameKey<T>(obj: T, oldKey: keyof T, newKey: string) {
      const { [oldKey]: value, ...rest } = obj;

      return {
        ...rest,
        [newKey]: value,
      };
    }

    const newObj = renameKey(detailProduct, 'capacity', 'built in memory');

    return (
      <div className={cn(style['detail-techlist'])}>
        <div className={cn(style['detail-techlist__title-content'])}>
          <h3 className={cn(style['detail-techlist__title'])}>Tech specs</h3>
          <Boundary />
        </div>
        <TechSpecsList product={newObj as DetailProductType} />
      </div>
    );
  },
);

DetailTechlist.displayName = 'DetailTechlist';
