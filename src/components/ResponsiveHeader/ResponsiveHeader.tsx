import useMediaQuery from '../../hooks/useMediaQuery';
import { ScreenSize } from '../../types/screenSize';

type Props = {
  children: React.ReactNode;
};

export const ResponsiveHeader: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery(ScreenSize.Mobile);

  const HeaderTag = isMobile ? 'h2' : 'h1';

  return <HeaderTag>{children}</HeaderTag>;
};
