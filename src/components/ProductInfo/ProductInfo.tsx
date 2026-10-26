import { HTMLAttributes } from 'react';
import { ProductDetails } from 'src/types/Types';
import styles from './ProductInfo.module.scss';
import cn from 'classnames';

type Props = { product: ProductDetails } & HTMLAttributes<HTMLDivElement>;

export const ProductInfo = ({ product, className, ...props }: Props) => {
  return (
    <div className={cn(styles.productInfo, className)} {...props}>
      <section className={styles.aboutSection}>
        <h3 className={styles.sectionTitle}>About</h3>
        <hr className={styles.divider} />
        {product.description.map(descrip => (
          <div key={descrip.title} className={styles.description}>
            <h4 className={styles.title}>{descrip.title}</h4>

            {descrip.text.map(text => (
              <p className={styles.text} key={text}>
                {text}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.specsSection}>
        <h3 className={styles.sectionTitle}>Tech specs</h3>
        <hr className={styles.divider} />

        <ul className={styles.specsList}>
          <li>
            <span>Screen</span>
            <span>{product.screen}</span>
          </li>
          <li>
            <span>Resolution</span>
            <span>{product.resolution}</span>
          </li>
          <li>
            <span>Processor</span>

            <span>{product.processor}</span>
          </li>
          <li>
            <span>RAM</span>
            <span>{product.ram}</span>
          </li>
          <li>
            <span>Built in memory</span>
            <span>{product.capacity}</span>
          </li>

          {'camera' in product && (
            <li>
              <span>Camera</span>
              <span>{product.camera}</span>
            </li>
          )}

          {'zoom' in product && (
            <li>
              <span>Zoom</span>
              <span>{product.zoom}</span>
            </li>
          )}

          <li>
            <span>Cell</span>
            <span>{product.cell.toString().replace(',', ', ')}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
