import { Fragment } from 'react/jsx-runtime';
import { Paragraph } from '../../types';
import styles from './DescriptionParagraph.module.scss';

type Props = {
  paragraph: Paragraph;
};

export const DescriptionParagraph: React.FC<Props> = ({ paragraph }) => {
  const { title, text } = paragraph;

  return (
    <article className={styles.DescriptionParagraph}>
      <h3 className={styles.Title}>{title}</h3>
      <p className={styles.Text}>
        {text.map((partOfText, index) => (
          <Fragment key={index}>
            {index !== 0 && (
              <>
                <br />
                <br />
              </>
            )}
            {partOfText}
          </Fragment>
        ))}
      </p>
    </article>
  );
};
