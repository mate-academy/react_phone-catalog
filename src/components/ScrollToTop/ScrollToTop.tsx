import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;

    // Verifica se a navegação anterior e a atual são páginas de detalhes de produto
    // e se pertencem à mesma categoria.
    // O formato da URL é /:category/:productId
    const prevParts = prevPathname.split('/');
    const currentParts = pathname.split('/');

    const isVariantChange =
      prevParts.length === 3 && // Ex: ['', 'phones', 'product-id']
      currentParts.length === 3 &&
      prevParts[1] === currentParts[1]; // Mesma categoria

    // Se for uma mudança de variante na mesma página de produto, não rola para o topo.
    // Para todas as outras navegações, rola para o topo.
    if (!isVariantChange) {
      window.scrollTo(0, 0);
    }

    // Atualiza a referência com o pathname atual para a próxima navegação.
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
