import { useState, useEffect, useRef } from "react";

export function useHeightAnimation<T extends HTMLElement>(
  isOpen: boolean,
  onOpenProperties: React.CSSProperties = {},
) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const node = useRef<T>(null);
  const prevHeight = useRef(0);

  useEffect(() => {
    if (node.current) {
      const clientHeight = node.current.clientHeight;

      if (clientHeight > 0) {
        prevHeight.current = clientHeight;
      }
    }
  }, []);

  useEffect(() => {
    if (node.current) {
      const newStyle = isOpen ? {
        height: `${prevHeight.current}px`,
        ...onOpenProperties,
      } : {
        height: '0px'
      };

      setStyle(newStyle);
    }
  }, [isOpen]);

  return [node, style] as const;
}
