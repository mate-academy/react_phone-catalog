import { FC } from 'react';
import styles from './NotFoundProduct.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { BackButton } from '../BackButton';

export const NotFoundProduct: FC = () => {
  const { notFound } = useIconSrc();

  return (
    <>
      <BackButton />
      <div className={styles.notFound}>
        Product was not found
        <img
          className={styles.notFoundImg}
          src={notFound}
          alt="Product was not found"
        />
      </div>
    </>
  );
};
