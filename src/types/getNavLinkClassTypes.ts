export type GetNavLinkClass = (
  base: string,
  active: string,
  addition?: string,
) => ({ isActive }: { isActive: boolean }) => string;
