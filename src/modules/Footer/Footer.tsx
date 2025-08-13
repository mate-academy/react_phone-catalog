import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { i18n } = useTranslation();

  return (
    <footer>
      <button onClick={() => i18n.changeLanguage('uk')}>UA</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </footer>
  );
};

export default Footer;
