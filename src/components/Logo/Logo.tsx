import './Logo.scss';

type Props = {
  className?: string;
  href: string;
  srText: string;
};

export const Logo: React.FC<Props> = ({ className, href, srText }) => (
  <a className={`logo ${className}`} href={href}>
    <span className="sr-only">{srText}</span>
    <img className="logo__img" src="img/logo.svg" alt="NICE GADGETS logo" />
  </a>
);
