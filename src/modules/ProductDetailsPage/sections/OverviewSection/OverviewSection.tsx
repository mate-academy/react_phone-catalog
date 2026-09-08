import classNames from 'classnames';
import styles from './OverviewSection.module.scss';
import { Gallery } from '../../components/Gallery';
import { ProductDetail } from '../../../../types/productDetail';
import { PanelOptions } from '../../components/PanelOptions';

type Props = {
  curProduct: ProductDetail;
  similarProducts: ProductDetail[];
};

export const OverviewSection: React.FC<Props> = ({
  curProduct,
  similarProducts,
}) => {
  return (
    <section className={classNames(styles.Overview, 'main__content')}>
      <Gallery images={curProduct.images} />
      <PanelOptions similar={similarProducts} current={curProduct} />
    </section>
  );
};
