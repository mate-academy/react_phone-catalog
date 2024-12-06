import cn from 'classnames';
import { About } from '../About';
import { ProductPhotos } from '../ProductPhotos';
import { TechSpecs } from '../TechSpecs';
import styles from './Gadget.module.scss';
import { MainControls } from '../MainControls';
import { Product, GadgetType } from '../../../../types';

interface Props {
  gadget: GadgetType;
  className?: string;
  product: Product;
}

export const Gadget: React.FC<Props> = ({ gadget, className, product }) => {
  const {
    name,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    cell,
  } = gadget;

  const techSpecs = [
    {
      title: 'Screen',
      value: screen,
    },
    {
      title: 'Resolution',
      value: resolution,
    },
    {
      title: 'Processor',
      value: processor,
    },
    {
      title: 'RAM',
      value: ram,
    },
    {
      title: 'Built in memory',
      value: capacity,
    },
    'camera' in gadget && {
      title: 'Camera',
      value: gadget.camera,
    },
    'zoom' in gadget && {
      title: 'Zoom',
      value: gadget.zoom,
    },
    {
      title: 'Cell',
      value: cell.join(', '),
    },
  ].filter(Boolean) as { title: string; value: string }[];

  return (
    <section className={cn(styles.gadget, className)}>
      <h2 className={styles.gadget__title}>{name}</h2>

      <div className={styles.gadget__details}>
        <ProductPhotos photos={images} className={styles.gadget__photos} />
        <MainControls gadget={gadget} product={product} />
        <About className={styles.gadget__about} description={description} />
        <TechSpecs
          className={styles['gadget__tech-specs']}
          techSpecs={techSpecs}
        />
      </div>
    </section>
  );
};
