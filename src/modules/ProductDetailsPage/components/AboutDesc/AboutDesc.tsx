import { AboutDescription } from '../../../shared/components/AboutDescription';
import { useGetProductDetails } from '../../hooks/useGetProductDetails';
import styles from './AboutDesc.module.scss';

export const AboutDescs = () => {
  const { product } = useGetProductDetails();

  return (
    <div className={styles.about__container}>
      {product?.description.map(desk => (
        <AboutDescription key={desk.title} desk={desk} />
      ))}
    </div>
  );
};
