//styles
import styles from './TechSpecs.module.scss';

//components
import { SpecRow } from '../SpecRow';

//types
import { ProductDetailed } from '../../../../types/product';

//services
import classNames from 'classnames';

type Props = {
  product: ProductDetailed;
  className?: string;
};

export const TechSpecs: React.FC<Props> = ({ product, className }) => {
  return (
    <div className={classNames(styles.spec, className)}>
      <SpecRow value={product.screen} variant="secondary">
        Screen
      </SpecRow>
      <SpecRow value={product.resolution} variant="secondary">
        Resolution
      </SpecRow>
      <SpecRow value={product.processor} variant="secondary">
        Processor
      </SpecRow>
      <SpecRow value={product.ram} variant="secondary">
        RAM
      </SpecRow>
      <SpecRow value={product.capacity} variant="secondary">
        Built in memory
      </SpecRow>
      <SpecRow value={product.camera} variant="secondary">
        Camera
      </SpecRow>
      <SpecRow value={product.zoom} variant="secondary">
        Zoom
      </SpecRow>
      <SpecRow value={product.cell.join(', ')} variant="secondary">
        Cell
      </SpecRow>
    </div>
  );
};
