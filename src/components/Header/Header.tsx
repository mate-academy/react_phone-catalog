import { HeaderProvider } from '../../provider/HeaderContext';
import { HeaderContent } from '../HeaderContent/HeaderContent';
import './style.scss';

export const Header = () => {
  return (
    <HeaderProvider>
      <HeaderContent />
    </HeaderProvider>
  );
};
