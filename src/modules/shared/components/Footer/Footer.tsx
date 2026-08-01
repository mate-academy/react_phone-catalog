import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { TranslationKey } from '@shared/i18n';
import { Logo } from '@shared/components/Logo';
import { chevronRightIcon } from '@shared/assets/icons';
import styles from './Footer.module.scss';

const FOOTER_LINKS: { titleKey: TranslationKey; href: string }[] = [
  {
    titleKey: 'footer.github',
    href: 'https://github.com/maksbtw/react_phone-catalog',
  },
  {
    titleKey: 'footer.contacts',
    href: 'https://github.com/maksbtw',
  },
  {
    titleKey: 'footer.rights',
    href: 'https://github.com/mate-academy/react_phone-catalog',
  },
];

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <ul className={styles.links}>
          {FOOTER_LINKS.map(({ titleKey, href }) => (
            <li key={titleKey}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {t(titleKey)}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          <span className={styles.backToTopLabel}>{t('footer.backToTop')}</span>
          <span className={styles.backToTopButton}>
            <img
              src={chevronRightIcon}
              alt=""
              className={cn('icon', styles.backToTopIcon)}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
