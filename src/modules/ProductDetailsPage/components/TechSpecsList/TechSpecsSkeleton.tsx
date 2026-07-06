//#region imports
import cn from 'classnames';
import { FC } from 'react';
import { SkeletonItem } from '../../../shared/components/SkeletonItem';
import baseStyles from './base.module.scss';
import styles from './TechSpecsSkeleton.module.scss';
//#endregion

type Props = {
  variant?: 'summary' | 'full';
};

export const TechSpecsSkeleton: FC<Props> = ({ variant = 'full' }) => {
  const listLength = variant === 'full' ? 7 : 4;

  return (
    <dl className={baseStyles.techSpecsList}>
      {Array.from({ length: listLength }).map((_, i) => (
        <div
          key={i}
          className={cn(baseStyles.specification, styles.specification, {
            [styles.summary]: variant === 'summary',
          })}
        >
          <dt>
            <SkeletonItem additionalClass={styles.specificationName} />
          </dt>

          <dd>
            <SkeletonItem additionalClass={styles.specificationValue} />
          </dd>
        </div>
      ))}
    </dl>
  );
};
