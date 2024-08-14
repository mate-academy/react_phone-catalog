import './Model.scss';
import { ReactNode, useLayoutEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  open?: boolean;
};

export const Model: React.FC<Props> = ({ children, open }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (open && !ref.current?.open) {
      ref.current?.showModal();
    } else if (!open && ref.current?.open) {
      ref.current?.close();
    }
  }, [open]);

  return <dialog ref={ref}>{children}</dialog>;
};
