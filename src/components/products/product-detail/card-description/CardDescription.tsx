import { FC } from 'react';

import { Title } from '@ui/index';

import { sliceText } from '@utils/helpers/workWithText';
import { IDescription } from '@utils/types/description.interface';

import styles from './CardDescription.module.scss';

type TProps = {
  description?: IDescription[];
};

export const CardDescription: FC<TProps> = ({ description = [] }) => {
  const newText = sliceText(description);

  if (!newText.length) return null;

  return newText.map(item => (
    <div className={styles.about} key={item.title}>
      <Title level={4}>{item.title}</Title>
      <p dangerouslySetInnerHTML={{ __html: item.text }} />
    </div>
  ));
};
