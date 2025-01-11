import React from 'react';
import styles from './ColorPicker.module.scss';
import { Link } from 'react-router-dom';
import { RoundButton } from '../RoundButton';
import { ColorMap } from '../../../../constantas/colorMap';
import { ProductType } from '../../../../types/ProductType';

type Props = {
  product: ProductType;
  colors: string[];
};

export const ColorPicker: React.FC<Props> = ({ product, colors }) => {
  return (
    <div className={styles.picker}>
      {colors.map(color => {
        const colorHex = ColorMap[color as keyof typeof ColorMap] || '#FFF';

        const linkColor = color.replace(' ', '-');
        const linkTo = `../${product.namespaceId}-${product.capacity.toLowerCase()}-${linkColor}`;

        return (
          <Link to={linkTo} key={linkColor}>
            <RoundButton color={colorHex} isActive={color === product.color} />
          </Link>
        );
      })}
    </div>
  );
};
