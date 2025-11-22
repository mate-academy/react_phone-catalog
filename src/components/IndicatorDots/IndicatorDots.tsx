// src/components/IndicatorDots/IndicatorDots.tsx
import React from 'react';

type Props = {
  count?: number;
  activeIndex: number;
  width?: number; // largura do dot inativo em px
  activeWidth?: number; // largura do dot ativo em px
  height?: number; // altura dos dots em px
  gap?: number; // espaçamento entre dots em px
  activeColor?: string;
  inactiveColor?: string;
  onClick?: (index: number) => void; // nova prop para clique
};

function IndicatorDots({
  count = 3,
  activeIndex,
  width = 14,
  activeWidth = 14,
  height = 4,
  gap = 8,
  activeColor = '#000',
  inactiveColor = '#ddd',
  onClick,
}: Props) {
  const items = Array.from({ length: count }, (_, i) => i);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `${gap}px`,
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 12,
  };

  const baseDotStyle = (isActive: boolean): React.CSSProperties => ({
    width: isActive ? `${activeWidth}px` : `${width}px`,
    height: `${height}px`,
    background: isActive ? activeColor : inactiveColor,
    display: 'inline-block',
    borderRadius: 0,
    transition: 'width 160ms ease, background-color 160ms ease',
    cursor: onClick ? 'pointer' : 'default', // cursor visível se clicável
  });

  return (
    <div style={containerStyle} data-testid="indicator-dots">
      {items.map(i => {
        const isActive = i === activeIndex;

        return (
          <span
            key={i}
            data-testid={`indicator-dot-${i}`}
            data-active={isActive ? 'true' : 'false'}
            style={baseDotStyle(isActive)}
            onClick={() => onClick?.(i)} // dispara clique
          />
        );
      })}
    </div>
  );
}

export default IndicatorDots;
