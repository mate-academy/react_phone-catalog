const files = import.meta.glob('/src/assets/slider/*.{jpg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const slides = Object.values(files);
