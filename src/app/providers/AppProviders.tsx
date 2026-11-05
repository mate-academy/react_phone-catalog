import { QueryProvider } from './QueryProvider';

type Props = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};
