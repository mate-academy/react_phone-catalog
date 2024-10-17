import { FC } from 'react';

import styles from './CardDescription.module.scss';

interface IDescription {
  title: string;
  text: string[];
}

type TProps = {
  description?: IDescription[];
};

export const CardDescription: FC<TProps> = ({ description = [] }) => {
  const sliceText = (description: IDescription[]) =>
    description.map(item => {
      const combinedText = item.text.join('<br/><br/>');

      return {
        title: item.title,
        text: combinedText,
      };
    });

  const newText = sliceText(description);

  return newText.map(item => (
    <div className={styles.about} key={item.title}>
      <h4>{item.title}</h4>
      <p dangerouslySetInnerHTML={{ __html: item.text }} />
    </div>
  ));
};
