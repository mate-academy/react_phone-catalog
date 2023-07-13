import { NavLink } from 'react-router-dom';

import {
  changeProductId,
  getClassNameForNavLink,
} from '@helpers/stringOperations';
import { ProductSpecPicker } from '..';
import './CapacityPicker.scss';

type CapacityPickerProps = {
  productId: string;
  capacities: string[];
};

export const CapacityPicker = ({
  productId,
  capacities,
}: CapacityPickerProps) => (
  <ProductSpecPicker title="Select capacity">
    {capacities.map(capacity => (
      <li key={capacity}>
        <NavLink
          replace
          className={getClassNameForNavLink('capacity')}
          to={`../${changeProductId(productId, -2, capacity)}`}
        >
          {capacity}
        </NavLink>
      </li>
    ))}
  </ProductSpecPicker>
);
