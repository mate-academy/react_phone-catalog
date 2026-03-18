export const categories = ['phones', 'tablets', 'accessories'] as const;

export type Category = (typeof categories)[number];
