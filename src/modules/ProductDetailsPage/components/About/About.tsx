//#region imports
import { useTranslation } from 'react-i18next';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
//#endregion

interface Description {
  title: string;
  text: string[];
}

type Props = {
  id: string;
};

export const About: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation('productDetails');

  const description = t(`products.${id}.description`, {
    returnObjects: true,
  }) as Description[];

  return (
    <section className={baseStyles.about} aria-label={t('about')}>
      <h3 className={baseStyles.title}>{capitalizeFirstWord(t('about'))}</h3>

      <div className={baseStyles.descriptionBlock}>
        {description.map(({ title, text }) => {
          const key = title.split(' ').join('-').toLowerCase();

          return (
            <article key={key} className={baseStyles.description}>
              <h4>{title}</h4>

              {text.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </article>
          );
        })}
      </div>
    </section>
  );
};
