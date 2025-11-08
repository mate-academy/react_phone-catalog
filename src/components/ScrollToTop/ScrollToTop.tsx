import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // A navegação para uma variante do mesmo produto (ex: mudança de cor)
    // é marcada com `isVariantChange: true` no estado da navegação.
    // Nesses casos, não queremos rolar a página para o topo.
    const isVariantChange = state?.isVariantChange;

    if (!isVariantChange) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}
