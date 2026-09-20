export type Navigate = {
  id: number;
  to: string;
  class: ({ isActive }: { isActive: boolean }) => string;
  label: string;
};
