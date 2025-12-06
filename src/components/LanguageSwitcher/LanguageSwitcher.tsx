// src/components/LangageSwitcher/LangageSwitcher.tsx
import React, { useState, useEffect } from 'react';
import i18n from '../../i18n';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

export default function LangageSwitcher() {
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const onChange = () => setLang(i18n.language);

    i18n.on('languageChanged', onChange);

    return () => i18n.off('languageChanged', onChange);
  }, []);

  const handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;

    i18n.changeLanguage(next);
    localStorage.setItem('i18nLang', next);
  };

  return (
    <div className={styles.container}>
      <label className={styles.srOnly} htmlFor="lang-select">
        Selecionar idioma
      </label>

      <select
        id="lang-select"
        value={lang}
        onChange={handle}
        aria-label="Selecionar idioma"
        className={styles.select}
      >
        {languages.map(l => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
