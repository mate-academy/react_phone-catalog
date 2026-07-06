import { useEffect } from 'react';
import { capitalizeFirstWord } from '../../../services/capitalizeFirstWord';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `Nice Gadgets | ${capitalizeFirstWord(title)}`;

    return () => {
      document.title = 'Nice Gadgets';
    };
  }, [title]);
}
