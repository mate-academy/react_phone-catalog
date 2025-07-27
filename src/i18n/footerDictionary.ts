type FooterNames = {
  github: string;
  contacts: string;
  rights: string;
  backToTop: string;
};

interface FooterTranslations {
  ua: FooterNames;
  en: FooterNames;
}

export const footerDictionaty: FooterTranslations = {
  en: {
    github: `Github`,
    contacts: `Contacts`,
    rights: `Rights`,
    backToTop: `Back to top`,
  },
  ua: {
    github: `Github`,
    contacts: `Контакти`,
    rights: `Права`,
    backToTop: `Вгору`,
  },
};
