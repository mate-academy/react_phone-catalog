import { useLanguage } from '../../../../../../context/LanguageContext';
import { en } from '../../../../../../i18n/translations/en';
import './FooterItems.scss';

type Props = {
  className: string;
};

type FooterItem = {
  name: keyof Pick<typeof en, 'github' | 'contacts' | 'rights'>;
  id: number;
  path: string;
};

const footerItems: FooterItem[] = [
  {
    name: 'github',
    id: 1,
    path: 'https://github.com/SerhiyShimko',
  },
  {
    name: 'contacts',
    id: 2,
    path: 'tel: 0977431073',
  },
  {
    name: 'rights',
    id: 3,
    path: 'https://github.com/SerhiyShimko/react_phone-catalog',
  },
];

export const FooterItems: React.FC<Props> = ({ className }) => {
  const { texts } = useLanguage();

  return (
    <div className={`footerItems ${className}`}>
      {footerItems.map(item => (
        <a
          href={item.path}
          className={`footerItems__element footerItems__element--${item.name}`}
          key={item.id}
        >
          {texts[item.name]}
        </a>
      ))}
    </div>
  );
};
