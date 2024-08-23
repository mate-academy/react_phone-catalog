type Props = {
  className?: string;
  href: string;
};

export const Logo: React.FC<Props> = ({ className = '', href }) => (
  <a className={`logo ${className}`.trim()} href={href}>
    <span className="sr-only">Go to home page</span>
    <img className="logo__img" src="img/logo.svg" alt="NICE GADGETS logo" />
  </a>
);
