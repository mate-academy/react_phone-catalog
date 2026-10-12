import { useTranslation } from 'react-i18next';

import { Device } from '@/modules/products/schema';
import { Property } from '@/shared/components';
import { Line } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

import styles from './Properties.module.scss';

interface Props {
  device: Device;
  className?: string;
}

export const Properties = ({ device, className }: Props) => {
  const { t } = useTranslation();

  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    device;

  const showInfo = {
    screen,
    resolution,
    processor,
    ram,
    builtInMemory: capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  };

  return (
    <section className={cn(styles.tech, className)}>
      <div>
        <h3 className={styles.section__title}>{t('techSpecs')}</h3>
        <Line />
      </div>
      <article className={styles.tech__area}>
        {Object.keys(showInfo)
          .filter(key => showInfo[key])
          .map(key => (
            <Property
              key={key}
              title={t(key)}
              text={showInfo[key]}
              titleClassName={styles.info__title}
              textClassName={styles.info__text}
            />
          ))}
      </article>
    </section>
  );
};
