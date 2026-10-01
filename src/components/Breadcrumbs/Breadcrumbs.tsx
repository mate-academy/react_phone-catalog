import styles from './Breadcrumbs.module.scss';

type Item = {
  label: string;
  onClick?: () => void;
};

type Props = {
  items: Item[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <div className={styles.item} key={`${item.label}-${index}`}>
          {item.onClick ? (
            <button type="button" onClick={item.onClick}>
              {item.label}
            </button>
          ) : (
            <span>{item.label}</span>
          )}

          {index < items.length - 1 && (
            <span className={styles.separator}>›</span>
          )}
        </div>
      ))}
    </nav>
  );
}
