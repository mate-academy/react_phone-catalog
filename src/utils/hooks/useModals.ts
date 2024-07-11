import { useCallback, useState } from 'react';

export const useModal = (initialState = false) => {
  const [isOpen, setOpen] = useState(initialState);

  const open = useCallback(() => setOpen(true), []);

  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(() => setOpen(prevState => !prevState), []);

  return { isOpen, open, close, toggle };
};
