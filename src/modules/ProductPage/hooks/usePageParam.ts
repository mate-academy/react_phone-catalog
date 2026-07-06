import { useUrlParam } from './useUrlParam';

export function usePageParam() {
  const { value: page, setValue } = useUrlParam<string>('page', '1');

  const setNewPage = (newPage: number) => {
    setValue(String(newPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { page, setNewPage };
}
