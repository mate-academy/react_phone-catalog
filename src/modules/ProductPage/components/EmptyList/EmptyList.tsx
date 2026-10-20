import type React from 'react';
import { asset } from '../../../../helper';

import styles from './EmpltList.module.scss';

type Props = {
  category: string;
};

export const EmptyList: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles['empty-list']}>
      <img src={asset('img/empty-list.jpeg')} alt="Empty list" />
      <h4>Oops, there are no {category} :(</h4>
    </div>
  );
};
