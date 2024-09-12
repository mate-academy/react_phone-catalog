import { FC } from 'react';

import styles from './CardDescription.module.scss';

interface IDescription {
  title: string;
  text: string[];
}

type TProps = {
  description?: IDescription[];
};

export const CardDescription: FC<TProps> = ({ description }) => {
  return (
    <>
      {description &&
        description.map(item => (
          <div className={styles.about} key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
    </>
  );
};
