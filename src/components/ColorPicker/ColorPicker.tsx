import { NavLink } from 'react-router-dom';

import { ProductSpecPicker } from '../ProductSpecPicker/ProductSpecPicker';
import { changeProductId } from '../../helpers/stringOperations';
import './ColorPicker.scss';

type ColorPickerProps = {
  productId: string;
  colors: string[];
};

const isLinkActive = ({ isActive }: { isActive: boolean }) =>
  `color${isActive ? ' color--active' : ''}`;

const matchColor = (color: string) => {
  switch (color) {
    case 'midnightgreen':
      return '#28372A';
    case 'spacegray':
      return '#717378';
    case 'rosegold':
      return '#B76E79';
    default:
      return color;
  }
};

export const ColorPicker = ({ productId, colors }: ColorPickerProps) => (
  <ProductSpecPicker title="Avaible colors">
    {colors.map(color => (
      <li key={color}>
        <NavLink
          replace
          className={isLinkActive}
          to={`../${changeProductId(productId, -1, color)}`}
        >
          <div
            className="color__container"
            style={{ backgroundColor: matchColor(color) }}
          />
        </NavLink>
      </li>
    ))}
  </ProductSpecPicker>
);
