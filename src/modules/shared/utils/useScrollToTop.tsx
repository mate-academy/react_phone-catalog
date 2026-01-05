import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const [lastProductId, setLastProductId] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const pathParts = pathname.split('/');
    const fullSlug = pathParts[2] || '';

    const productModelRoot = fullSlug.split('-').slice(0, -2).join('-');

    if (productModelRoot !== lastProductId) {
      window.scrollTo(0, 0);
      setLastProductId(productModelRoot);
    }
  }, [pathname, lastProductId]);
}
