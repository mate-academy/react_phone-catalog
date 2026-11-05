import classNames from 'classnames';

import { Typography } from '@/components/atoms';

import { CategoryCard } from './CategoryCard';
import type { ShopByCategoryData } from './ShopByCategory.types';

import styles from './ShopByCategory.module.scss';

type Props = { data: ShopByCategoryData; className?: string };

export const ShopByCategory = ({ data, className }: Props) => {
  return (
    <section className={classNames(styles.container, className)}>
      <div className={styles.info}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {data.sectionTitle}
        </Typography>
        {data.sectionSubtitle && (
          <Typography
            variant="bodytext"
            className={styles.subtitle}
          >
            {data.sectionSubtitle}
          </Typography>
        )}
      </div>

      <div className={styles.grid}>
        {data.categories.map((category) => (
          <div
            key={category.id}
            className={styles.cardWrapper}
          >
            <CategoryCard
              title={category.title}
              count={category.count}
              imageSrc={category.image}
              linkUrl={category.link}
              backgroundSrc={category.background}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
