import React from 'react';
import styles from './detailedList.module.scss';
import classNames from 'classnames';
import { getWholeRandom } from '@shared/helpers';

type ListData = Record<string, string | null>;

export const DetailedList = ({ listData }: { listData: ListData }) => {
  return (
    <dl className={styles['detailed-list']}>
      {Object.entries(listData).map(([key, value]) => {
        const isSkeleton = value === null;
        const skeletonWidth = `${getWholeRandom(70, 30)}%`;

        return (
          <React.Fragment key={key}>
            <dt className={styles.key}>{key}</dt>
            <dd
              className={classNames(styles.value, {
                [styles.skeleton]: isSkeleton,
              })}
              style={
                isSkeleton
                  ? ({ '--width': skeletonWidth } as React.CSSProperties)
                  : undefined
              }
            >
              {value}
            </dd>
          </React.Fragment>
        );
      })}
    </dl>
  );
};
