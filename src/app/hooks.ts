import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatch} from "./store";
import {MutableRefObject, useEffect, useRef, useState} from "react";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useVissibleCards = (cardWidth: number, gap: number) => {
  const [visibleCards, setVisibleCards] = useState(0);

  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    const calcVissibleCards = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalCardWidth = cardWidth + gap;
        const visibleCardsCount = containerWidth / totalCardWidth;

        setVisibleCards(visibleCardsCount);
      }
    };

    const resizeObserver = new ResizeObserver(calcVissibleCards);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    calcVissibleCards();

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [cardWidth, gap]);

  return {visibleCards, containerRef};
};
