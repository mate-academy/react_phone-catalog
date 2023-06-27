import { NavLink } from 'react-router-dom';

import { ProductSpecPicker } from '../ProductSpecPicker/ProductSpecPicker';
import { changeProductId } from '../../../helpers/stringOperations';
import './CapacityPicker.scss';

type CapacityPickerProps = {
  productId: string;
  capacities: string[];
};

const isLinkActive = ({ isActive }: { isActive: boolean }) =>
  `capacity${isActive ? ' capacity--active' : ''}`;

export const CapacityPicker = ({
  productId,
  capacities,
}: CapacityPickerProps) => (
  <ProductSpecPicker title="Select capacity">
    {capacities.map(capacity => (
      <li key={capacity}>
        <NavLink
          replace
          className={isLinkActive}
          to={`../${changeProductId(productId, -2, capacity)}`}
        >
          {capacity}
        </NavLink>
      </li>
    ))}
  </ProductSpecPicker>
);
