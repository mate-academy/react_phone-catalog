//__________
// BLOCO IMPORT
//__________
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/img/phones/Logo_mobile.png';

//__________
// BLOCO TYPES
//__________
type LinkItem = { id: string; label: string; href: string };
type Props = { links?: LinkItem[] };

// Type guard to avoid `any` and satisfy ESLint
const isLinkItem = (obj: unknown): obj is LinkItem => {
  if (typeof obj !== 'object' || obj === null) return false;
  const rec = obj as Record<string, unknown>;
  return (
    typeof rec.id === 'string' &&
    typeof rec.label === 'string' &&
    typeof rec.href === 'string'
  );
};

//__________
// BLOCO EXPORT (com otimizações, foco e validação runtime)
//__________
export default function Navbar({ links }: Props): JSX.Element {
  // BLOCO STATE
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // BLOCO REFS (para a11y / foco)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  // BLOCO VALIDATION (runtime leve) sem utilizar `any`
  const validateLinks = (maybe: unknown): LinkItem[] | null => {
    if (!Array.isArray(maybe)) return null;
    for (const item of maybe) {
      if (!isLinkItem(item)) return null;
    }
    return maybe as LinkItem[];
  };

  // BLOCO DEFAULT LINKS (runtime)
  const defaultLinks: LinkItem[] = useMemo(
    () => [
      { id: 'home', label: 'HOME', href: '/' },
      { id: 'phones', label: 'PHONES', href: '/phones' },
      { id: 'tablets', label: 'TABLETS', href: '/tablets' },
      { id: 'accessories', label: 'ACCESSORIES', href: '/accessories' },
    ],
    [],
  );

  // BLOCO effectiveLinks com useMemo para evitar recomputações desnecessárias
  const effectiveLinks: LinkItem[] = useMemo(() => {
    const validated = validateLinks(links);
    return validated ?? defaultLinks;
  }, [links, defaultLinks]);

  // BLOCO HANDLERS com useCallback para manter referências estáveis
  const toggle = useCallback(() => {
    setIsOpen(v => !v);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // devolver foco ao botão hamburguer para boa experiência de teclado
    hamburgerRef.current?.focus();
  }, []);

  // BLOCO EFFECTS: teclado, resize e foco
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1200) setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // BLOCO EFFECT: mover foco para o primeiro link quando abrir
  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);
      return () => window.clearTimeout(id);
    }
    return;
  }, [isOpen]);

  // BLOCO EFFECT: evitar scroll do body quando menu aberto
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [isOpen]);

  // BLOCO RENDER HELPERS
  const renderLinks = useCallback(
    (items: LinkItem[]) =>
      items.map((link, idx) => (
        <li key={link.id}>
          <a
            href={link.href}
            onClick={close}
            ref={idx === 0 ? firstLinkRef : undefined}
            aria-current={
              window.location.pathname === link.href ? 'page' : undefined
            }
          >
            {link.label}
          </a>
        </li>
      )),
    [close],
  );

  // BLOCO RENDER
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <a href="/" onClick={close} aria-label="Ir para home">
          <img src={logo} alt="Logo" className={styles.logo} />
        </a>
      </div>

      <button
        ref={hamburgerRef}
        className={styles.hamburger}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={String(isOpen)}
        aria-controls="primary-navigation"
        onClick={toggle}
        type="button"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <nav
        id="primary-navigation"
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        aria-hidden={String(!isOpen)}
        role="navigation"
      >
        <ul className={styles.menuList}>{renderLinks(effectiveLinks)}</ul>
      </nav>
    </header>
  );
}
