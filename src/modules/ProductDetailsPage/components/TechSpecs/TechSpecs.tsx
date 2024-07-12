import { addSpaceInText } from '../../../../shared/workWithString';
import { ProductDetails } from '../../../../types/ProductDetails';
import classes from './TechSpecs.module.scss';

type Props = {
  product: ProductDetails;
};
export const TechSpecs: React.FC<Props> = ({ product }) => {
  return (
    <section className={classes.TechSpecs}>
      <h3>Tech specs</h3>

      <div className={classes.TechSpecs__container}>
        <div className={classes.TechSpecs__content}>
          <p>Screen</p>
          <p>{addSpaceInText(product.screen)}</p>
        </div>
        <div className={classes.TechSpecs__content}>
          <p>Resolution</p>
          <p>{addSpaceInText(product.resolution)}</p>
        </div>
        <div className={classes.TechSpecs__content}>
          <p>Processor</p>
          <p>{addSpaceInText(product.processor)}</p>
        </div>
        <div className={classes.TechSpecs__content}>
          <p>RAM</p>
          <p>{addSpaceInText(product.ram)}</p>
        </div>

        <div className={classes.TechSpecs__content}>
          <p>Built in memory</p>
          <p>{addSpaceInText(product.capacity)}</p>
        </div>

        {product.camera && (
          <div className={classes.TechSpecs__content}>
            <p>Camera</p>
            <p>{addSpaceInText(product.camera)}</p>
          </div>
        )}
        {product.zoom && (
          <div className={classes.TechSpecs__content}>
            <p>Zoom</p>
            <p>{addSpaceInText(product.zoom)}</p>
          </div>
        )}
        <div className={classes.TechSpecs__content}>
          <p>Cell</p>
          <p>{product.cell.join(', ')}</p>
        </div>
      </div>
    </section>
  );
};
