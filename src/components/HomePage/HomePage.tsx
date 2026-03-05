import { useBooks } from '@/context/BooksContext';
import { Loader } from '@/components/ui/Loader';
import { HomePageContent } from './components/HomePageContent';

export const HomePage = () => {
  const { isLoading } = useBooks();

  return (
    <Loader isLoading={isLoading}>
      <HomePageContent />
    </Loader>
  );
};
