export const colorExtractor = (pathname: string): string => {
  const segments = pathname.split("-");
  return segments[segments.length - 1] || "";
};
