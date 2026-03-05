import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { TYPOGRAPHY } from '@/constants/typography';
import { cn } from '@/lib/utils';

export const RightsPage = () => {
  const { t } = useTranslation();
  const linkStyle = 'font-bold hover:text-yellow-600 transition-colors';

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 text-foreground">
      <h1
        className={cn(
          TYPOGRAPHY.h2,
          'text-foreground',
          'mb-10',
          'border-b',
          'pb-4',
        )}
      >
        {t('rights.title')}
      </h1>

      <section className="mb-12">
        <h2 className={cn(TYPOGRAPHY.h3, 'text-foreground')}>
          1. {t('rights.generalTitle')}
        </h2>
        <p className="leading-relaxed mb-4">
          <Trans
            i18nKey="rights.generalParagraph"
            components={[
              <Link
                key="0"
                to="/"
                className={linkStyle}
              >
                Book Catalog
              </Link>,
            ]}
          />
        </p>
      </section>

      <section className="mb-12">
        <h2 className={cn(TYPOGRAPHY.h3, 'text-foreground')}>
          2. {t('rights.useDescriptionsTitle')}
        </h2>
        <p className="leading-relaxed mb-4">
          {t('rights.useDescriptionsParagraph')}
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t('rights.useDescriptionsLiOne')}</li>
          <li>
            <Trans
              i18nKey="rights.useDescriptionsLiTwo"
              components={[
                <Link
                  key="0"
                  to="/"
                  className={linkStyle}
                >
                  Book Catalog
                </Link>,
              ]}
            />
          </li>
          <li>{t('rights.useDescriptionsLiThree')}</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className={cn(TYPOGRAPHY.h3, 'text-foreground')}>
          3. {t('rights.generatedContexTitle')}
        </h2>
        <p className="leading-relaxed mb-4">
          <Trans
            i18nKey="rights.generatedContexParagraph"
            components={[
              <Link
                key="0"
                to="/"
                className={linkStyle}
              >
                Book Catalog
              </Link>,
            ]}
          />
        </p>
      </section>

      <section className="mb-12">
        <h2 className={cn(TYPOGRAPHY.h3, 'text-foreground')}>
          4. {t('rights.copyingTitle')}
        </h2>
        <p className="leading-relaxed mb-4 font-medium">
          <Trans
            i18nKey="rights.copyingParagraph"
            components={[
              <Link
                key="0"
                to="/"
                className={linkStyle}
              >
                Book Catalog
              </Link>,
            ]}
          />
        </p>
      </section>

      <div className="bg-card p-6 rounded-lg border-l-4 border-yellow-500">
        <p className="text-card-foreground italic">{t('rights.update')}</p>
      </div>
    </div>
  );
};
