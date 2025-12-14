import React from 'react';
import styles from './Capacity.module.scss';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Props = {
  capacityAviable: string[] | undefined;
};

export const Capacity: React.FC<Props> = ({ capacityAviable }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  if (!productId) {
    return null;
  }

  const memory = productId
    .split('-')
    .find(part => part.includes('gb') || part.includes('tb'));

  const handleClick = (capacity: string) => {
    const newProductId = productId
      .split('-')
      .map(e => (e === memory ? capacity.toLowerCase() : e))
      .join('-');

    const newPath = location.pathname.replace(productId, newProductId);

    navigate(newPath);
  };

  return (
    <div className={styles.capacity}>
      <p>Select capacity</p>

      <div className={styles.container}>
        {capacityAviable?.map((capacity, index) => (
          <span
            key={index}
            className={`${styles.button}
                  ${capacity === memory?.toUpperCase() ? styles.button__active : ''}`}
            onClick={() => handleClick(capacity)}
          >
            {capacity}
          </span>
        ))}
      </div>
    </div>
  );
};
