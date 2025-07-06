import styles from './count.module.scss';
export const Count = ({count}) => {
  return (
    <span className={styles.count}>{ count}</span>
)
}
