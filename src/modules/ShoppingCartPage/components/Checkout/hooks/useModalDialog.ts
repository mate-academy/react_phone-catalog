import { useCallback, useRef } from 'react';

export function useModalDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    dialogRef.current?.showModal();

    document.body.style.overflowY = 'hidden';
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();

    document.body.style.overflowY = 'auto';
  }, []);

  return { dialogRef, open, close };
}
