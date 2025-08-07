/* eslint-disable @typescript-eslint/indent */
import { useNavigate } from 'react-router-dom';
import { ProductFullInfo } from '../../types/ProductFullInfo';
import styles from './Direction.module.scss';

type DirectionProps = {
  page:
    | 'phones'
    | 'tablets'
    | 'accessories'
    | 'favorites'
    | 'cart'
    | 'productID';
  product?: ProductFullInfo;
};

export const Direction: React.FC<DirectionProps> = ({ page, product }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.way}>
        <img
          className={styles.way_home}
          src="img/Additional images/icons/Home.svg"
          alt="home"
          onClick={() => {
            navigate('/');
          }}
        />
        <img
          className={styles.way_image}
          src="img/Buttons/Icons/gray right.svg"
          alt="arrow right"
        />

        {page === 'productID' && (
          <>
            <span
              className={styles.way_category}
              onClick={() => {
                navigate(`/${product?.category}`);
              }}
            >
              {product?.category}
            </span>

            <img
              className={styles.way_icon}
              src="img/Buttons/Icons/gray right.svg"
              alt="arrow right"
            />
          </>
        )}

        <span className={styles.way_adres}>
          {page === 'productID' ? product?.name : page}
        </span>
      </div>

      {page === 'productID' && (
        <div className={styles.back}>
          <img
            className={styles.back_arrow}
            src="img/Buttons/Icons/white left.svg"
            alt="arrow left"
          />
          <span
            className={styles.back_link}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </span>
        </div>
      )}
    </>
  );
};
