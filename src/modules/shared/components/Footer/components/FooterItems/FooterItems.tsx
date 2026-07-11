import './FooterItems.scss';

type Props = {
  className: string;
};

type FooterItem = {
  name: string;
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
  return (
    <div className={`footerItems ${className}`}>
      {footerItems.map(item => (
        <a
          href={item.path}
          className={`footerItems__element footerItems__element--${item.name}`}
          key={item.id}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
