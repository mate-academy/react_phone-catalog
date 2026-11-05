import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/config/queryClient';

type Props = {
  children: React.ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
