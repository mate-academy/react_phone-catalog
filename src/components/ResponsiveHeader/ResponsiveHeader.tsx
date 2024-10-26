import useMediaQuery from '../../hooks/useMediaQuery';

type Props = {
  children: React.ReactNode;
};

export const ResponsiveHeader: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 639px)');

  const HeaderTag = isMobile ? 'h2' : 'h1';

  return <HeaderTag>{children}</HeaderTag>;
};
