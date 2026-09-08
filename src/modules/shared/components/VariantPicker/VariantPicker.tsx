import { ReactNode } from 'react';
import styles from './VariantPicker.module.scss';

interface Props<T extends { id: string }> {
  title: string;
  variants: T[];
  renderItem: (item: T) => ReactNode;
  className?: string;
}

export function VariantPicker<T extends { id: string }>({
  title,
  variants,
  renderItem,
  className,
}: Props<T>) {
  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.variants}>
        {variants.map(item => (
          <li className={styles.colorItem} key={item.id}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}
