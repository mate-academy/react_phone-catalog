import classNames from 'classnames';
import { ProductDetails } from '../../../shared/types/types';
import styles from './About.module.scss';
import { DecorativeLine } from '../../../shared/components/DecorativeLine';
import { DescriptionParagraph } from '../DescriptionParagraph';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';

type Props = {
  product: ProductDetails;
  className?: string;
};

export const About: React.FC<Props> = ({ product, className }) => {
  const { about } = useLanguage().localeTexts;

  return (
    <section className={classNames(styles.About, className)}>
      <h2 className={styles.Title}>{about}</h2>
      <DecorativeLine />

      {product.description.map(paragraph => (
        <DescriptionParagraph key={paragraph.title} paragraph={paragraph} />
      ))}
    </section>
  );
};
