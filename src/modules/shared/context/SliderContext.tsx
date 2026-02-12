import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type SliderContextType = {
  button: string | null;
  setButton: Dispatch<SetStateAction<string | null>>;
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  slideWidth: number;
  setSlideWidth: Dispatch<SetStateAction<number>>;
};

export const SliderContext = createContext<SliderContextType>({
  button: null,
  setButton: () => {},
  currentSlideIndex: 0,
  setCurrentSlideIndex: () => {},
  slideWidth: 0,
  setSlideWidth: () => {},
});

export const SliderProvider = ({ children }: { children: React.ReactNode }) => {
  const [button, setButton] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState(0);

  return (
    <SliderContext.Provider
      value={{
        button,
        setButton,
        currentSlideIndex,
        setCurrentSlideIndex,
        slideWidth,
        setSlideWidth,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
};
