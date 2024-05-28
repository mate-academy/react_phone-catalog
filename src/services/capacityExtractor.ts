export const capacityExtractor = (pathname: string): string => {
  const segments = pathname.split("-");
  return segments[segments.length - 2] || "";
};
