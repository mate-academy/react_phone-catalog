import React, {
  FC,
  PropsWithChildren,
  RefObject,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type HeaderSlotState<T extends HTMLElement> = {
  slotRef: RefObject<T> | undefined;
  setSlotRef: (newRef: RefObject<T> | undefined) => void;
};

const HeaderSlotContext = createContext<HeaderSlotState<HTMLDivElement> | null>(
  null,
);

type Props = PropsWithChildren<{}>;

export const HeaderSlotProvider: FC<Props> = ({ children }) => {
  const [slotRef, setSlotRef] = useState<RefObject<HTMLDivElement>>();

  return (
    <HeaderSlotContext.Provider value={{ slotRef, setSlotRef }}>
      {children}
    </HeaderSlotContext.Provider>
  );
};

export const useHeaderSlot = () => {
  const contextResult = useContext(HeaderSlotContext);

  if (!contextResult) {
    throw new Error('No header slot context was provided');
  }

  return contextResult;
};

type HeaderSlotProps = PropsWithChildren<{}>;

export const HeaderSlot: FC<HeaderSlotProps> = ({ children }) => {
  const { slotRef } = useHeaderSlot();

  return slotRef?.current && createPortal(children, slotRef.current);
};
