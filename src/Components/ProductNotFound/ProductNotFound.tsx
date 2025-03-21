import styles from './ProductNotFound.module.scss';

type Props = {
  name: string;
};

export const ProductNotFound: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        We&apos;re so sorry, we don&apos;t have product with name:
      </h2>
      <p className={styles.notFound}>{name.split('-').join(' ')}</p>
      <img
        src="/react_phone-catalog/img/product-not-found.png"
        alt="product-not-found"
        className={styles.image}
      />
    </div>
  );
};
