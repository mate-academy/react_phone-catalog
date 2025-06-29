import { ProductsProvider } from './useProducts';
import { MenuProvider } from './useMenu';
import { UserActionsProvider } from './useUserActions';

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  return (
    <ProductsProvider>
      <UserActionsProvider>
        <MenuProvider>{children}</MenuProvider>
      </UserActionsProvider>
    </ProductsProvider>
  );
};
