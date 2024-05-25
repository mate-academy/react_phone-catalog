import { LinkProps } from 'react-router-dom';

type Props = Omit<LinkProps, 'to'>;

export const LogoLink: React.FC<Props> = ({ children, ...props }) => {
  return (
    <a href="#" {...props}>
      {children}
    </a>
  );
};
