import React from 'react';
import styles from './Colors.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type Props = {
  colors: string[] | undefined;
};

export const Colors: React.FC<Props> = ({ colors }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  if (!productId) {
    return null;
  }

  const colorfromParams = productId.split('-').at(-1);

  const handleClick = (color: string) => {
    const newProductId = productId
      .split('-')
      .map(e => (e === colorfromParams ? color.toLowerCase() : e))
      .join('-');

    const newPath = location.pathname.replace(productId, newProductId);

    navigate(newPath);
  };

  return (
    <div className={styles.colors}>
      <p>Available colors</p>

      <div className={styles.container}>
        {colors?.map((color, index) => (
          <div
            key={index}
            className={`${styles.icons}
            ${color === colorfromParams ? styles.active : ''}

          `}
            onClick={() => handleClick(color)}
          >
            <span className={styles[color]}></span>
          </div>
        ))}
      </div>
    </div>
  );
};
