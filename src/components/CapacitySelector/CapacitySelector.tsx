import styles from './CapacitySelector.module.scss';

import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { OptionSelector } from '../OptionSelector';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.capacityLink, {
    [styles['capacityLink--active']]: isActive,
  });

type Props = {
  namespaceId: string;
  capacityAvailable: string[];
  currentColor: string;
};

export const CapacitySelector: React.FC<Props> = ({
  namespaceId,
  capacityAvailable,
  currentColor,
}) => {
  const { category } = useParams();

  const getNewProductId = (newCapacity: string) => {
    return `${namespaceId}-${newCapacity.toLowerCase()}-${currentColor}`;
  };

  return (
    <OptionSelector
      label="Select capacity"
      options={capacityAvailable}
      renderOption={capacity => (
        <NavLink
          to={`/${category}/${getNewProductId(capacity)}`}
          className={getLinkClass}
        >
          {capacity}
        </NavLink>
      )}
    />
  );
};
