import classNames from 'classnames';
import styles from './count.module.scss';
type T = {
  count:number
  type:'aside'
}
export const Count = ({count,type}:T) => {
  return (
    <span className={classNames(styles.count, { [styles['count--visible']]: type === 'aside' })}>{ count}</span>
)
}
