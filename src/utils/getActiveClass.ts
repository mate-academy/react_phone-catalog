import cn from 'classnames';

export function createNavLinkClass<T extends Record<string, string>>(
  styles: T,
  baseKey: keyof T,
) {
  return ({ isActive }: { isActive: boolean }) =>
    cn(styles[baseKey], {
      [styles[`${String(baseKey)}IsActive`]]: isActive,
    });
}
