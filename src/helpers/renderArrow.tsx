export const renderArrow = (direction: string, theme: string) => {
  if (theme === 'light') {
    return (
      <img
        src={`/public/_new/img/icons/arrow-${direction}-dark.svg`}
        alt={`${direction} arrow`}
      />
    );
  }

  return (
    <img
      src={`/public/_new/img/icons/arrow-${direction}-light.svg`}
      alt={`${direction} arrow`}
    />
  );
};
