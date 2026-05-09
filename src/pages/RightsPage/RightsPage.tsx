import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { TranslationKey } from '../../i18n/translations';
import styles from './RightsPage.module.scss';

interface Section {
  number: string;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  icon: JSX.Element;
}

const SECTIONS: Section[] = [
  {
    number: '01',
    titleKey: 'rights.copyright.title',
    textKey: 'rights.copyright.text',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M14.5 9.5a3.5 3.5 0 1 0 0 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: '02',
    titleKey: 'rights.license.title',
    textKey: 'rights.license.text',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M5 4h9l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M14 4v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 14h7M8 18h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    titleKey: 'rights.terms.title',
    textKey: 'rights.terms.text',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M4 6c2-1 5-2 8-2s6 1 8 2v12c-2-1-5-2-8-2s-6 1-8 2V6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12 4v14" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    number: '04',
    titleKey: 'rights.privacy.title',
    textKey: 'rights.privacy.text',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const RightsPage = () => {
  const t = useT();

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ label: t('footer.rights') }]} />

      <header className={styles.hero}>
        <span className={styles.heroBadge}>© {new Date().getFullYear()}</span>
        <h1 className={styles.h1}>{t('rights.title')}</h1>
        <p className={styles.subtitle}>{t('rights.subtitle')}</p>
      </header>

      <section className={styles.sections}>
        {SECTIONS.map(s => (
          <article key={s.number} className={styles.section}>
            <span className={styles.sectionNumber}>{s.number}</span>
            <div className={styles.sectionIcon} aria-hidden>
              {s.icon}
            </div>
            <h2 className={styles.sectionTitle}>{t(s.titleKey)}</h2>
            <p className={styles.sectionText}>{t(s.textKey)}</p>
          </article>
        ))}
      </section>

      <footer className={styles.callout}>
        {t('rights.contactsLine')}{' '}
        <Link to="/contacts" className={styles.calloutLink}>
          {t('rights.contactsLink')}
        </Link>
        .
      </footer>
    </div>
  );
};
