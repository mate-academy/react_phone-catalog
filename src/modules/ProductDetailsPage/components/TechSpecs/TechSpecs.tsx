import type { ProductFull } from '../../../../types/ProductFull';
import { TechSpecsList } from '../TechSpecsList';
import s from './TechSpecs.module.scss';

type Props = {
  product: ProductFull;
};

export const TechSpecs = ({ product }: Props) => {
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    product;

  return (
    <div>
      <h3 className={s.specs__title}>Tech specs</h3>
      <TechSpecsList
        specs={{
          screen,
          resolution,
          processor,
          ram,
          capacity,
          camera,
          zoom,
          cell,
        }}
      />
    </div>
  );
};
