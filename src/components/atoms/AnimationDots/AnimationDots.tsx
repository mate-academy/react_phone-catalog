export const AnimationDots = () => {
  const dotIndexes = [-2, -1, 0, 1, 2];

  return (
    <div className="relative h-12 w-36">
      {dotIndexes.map((n, index) => (
        <div
          key={index}
          className="animate-splash-dot absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary dark:bg-white"
          style={
            {
              left: `calc(50% - 8px + (${n} * 24px))`,
              animationDelay: `${n * 0.15}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
