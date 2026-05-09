import { useState, FormEvent } from 'react';
import { useT } from '../../context/LanguageContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { TranslationKey } from '../../i18n/translations';
import styles from './ContactsPage.module.scss';

interface Channel {
  labelKey: TranslationKey;
  valueKey?: TranslationKey;
  href?: string;
  hrefValue?: string;
  icon: JSX.Element;
}

const CHANNELS: Channel[] = [
  {
    labelKey: 'contacts.email.label',
    valueKey: 'contacts.email.value',
    href: 'mailto:hello@nicegadgets.store',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    labelKey: 'contacts.phone.label',
    valueKey: 'contacts.phone.value',
    href: 'tel:+380445550149',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 4 7a2 2 0 0 1 1-3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    labelKey: 'contacts.github.label',
    hrefValue: 'github.com/sonik-boom71/react_phone-catalog',
    href: 'https://github.com/sonik-boom71/react_phone-catalog',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.53 2.35 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0 1 12 6.84a9.5 9.5 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    labelKey: 'contacts.address.label',
    valueKey: 'contacts.address.value',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

export const ContactsPage = () => {
  const t = useT();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ label: t('footer.contacts') }]} />

      <header className={styles.hero}>
        <span className={styles.heroDot} aria-hidden />
        <h1 className={styles.h1}>{t('contacts.title')}</h1>
        <p className={styles.subtitle}>{t('contacts.subtitle')}</p>
      </header>

      <section className={styles.channels}>
        {CHANNELS.map(c => {
          const value = c.hrefValue ?? (c.valueKey ? t(c.valueKey) : '');
          const inner = (
            <>
              <div className={styles.channelIcon} aria-hidden>
                {c.icon}
              </div>
              <div className={styles.channelText}>
                <span className={styles.channelLabel}>{t(c.labelKey)}</span>
                <span className={styles.channelValue}>{value}</span>
              </div>
            </>
          );

          return c.href ? (
            <a
              key={t(c.labelKey)}
              href={c.href}
              className={styles.channel}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {inner}
            </a>
          ) : (
            <div key={t(c.labelKey)} className={styles.channel}>
              {inner}
            </div>
          );
        })}

        <div className={styles.channel}>
          <div className={styles.channelIcon} aria-hidden>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.channelText}>
            <span className={styles.channelLabel}>{t('contacts.hoursLabel')}</span>
            <span className={styles.channelValue}>{t('contacts.hoursValue')}</span>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>{t('contacts.formTitle')}</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('contacts.formName')}</span>
              <input
                type="text"
                className={styles.input}
                required
                disabled={sent}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>{t('contacts.formEmail')}</span>
              <input
                type="email"
                className={styles.input}
                required
                disabled={sent}
              />
            </label>
          </div>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t('contacts.formMessage')}</span>
            <textarea
              className={styles.textarea}
              rows={5}
              required
              disabled={sent}
            />
          </label>
          <button type="submit" className={styles.submit} disabled={sent}>
            {sent ? t('contacts.formSent') : t('contacts.formSubmit')}
          </button>
        </form>
      </section>
    </div>
  );
};
