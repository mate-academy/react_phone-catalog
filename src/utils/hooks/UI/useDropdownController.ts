import { useCallback, useEffect, useRef, useState } from 'react';
import { DropdownName } from '../../../types/DropdownName';

type Options = {
  closeOnOutsideClick?: boolean;
  closeOnWindowScroll?: boolean;
  closeOnEscape?: boolean;
};

export const useDropdownController = ({
  closeOnOutsideClick = true,
  closeOnWindowScroll = true,
  closeOnEscape = true,
}: Options = {}) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null);

  const nodesByKey = useRef<Record<string, HTMLElement | null>>({});

  const register = useCallback(
    (key: DropdownName) => (node: HTMLElement | null) => {
      nodesByKey.current[key] = node;
    },
    [],
  );

  const isOpen = useCallback(
    (name: DropdownName) => openDropdown === name,
    [openDropdown],
  );

  const toggle = useCallback((name: DropdownName) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  }, []);

  const closeAll = useCallback(() => setOpenDropdown(null), []);

  useEffect(() => {
    if (!openDropdown || !closeOnOutsideClick) {
      return;
    }

    const handleDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const activeNode = nodesByKey.current[openDropdown];

      if (!activeNode) {
        closeAll();

        return;
      }

      if (!activeNode.contains(target)) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleDown);

    return () => document.removeEventListener('mousedown', handleDown);
  }, [openDropdown, closeOnOutsideClick, closeAll]);

  useEffect(() => {
    if (!openDropdown || !closeOnWindowScroll) {
      return;
    }

    const handleScroll = (e: Event) => {
      if (e.target === document || e.target === window) {
        closeAll();
      }
    };

    window.addEventListener('scroll', handleScroll, true);

    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [openDropdown, closeOnWindowScroll, closeAll]);

  useEffect(() => {
    if (!openDropdown || !closeOnEscape) {
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAll();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [openDropdown, closeOnEscape, closeAll]);

  return {
    register,
    isOpen,
    toggle,
    closeAll,
    openDropdown,
  };
};
