import classNames from 'classnames';
import styles from './TechSpecs.module.scss';

type Props = {
  techSpecs: { [key: string]: string | string[] };
  parentElement?: string;
};

export const TechSpecs: React.FC<Props> = ({
  techSpecs,
  parentElement = '',
}) => {
  const getTechSpecsName = (str: string) => str[0].toUpperCase() + str.slice(1);
  const details = Object.entries(techSpecs);
  const getClassName = () => {
    return classNames(`${styles.techSpec}`, {
      'text--small': parentElement != 'productPage',
      'text--regular': parentElement === 'productPage',
    });
  };

  return (
    <table
      cellPadding={'0'}
      cellSpacing="0"
      className={`${styles.container} ${parentElement}`}
    >
      <tbody>
        {details.map(detail => {
          const detailName =
            detail[0] === 'capacity' && parentElement === 'productPage'
              ? 'Build in memory'
              : getTechSpecsName(detail[0]);
          const value = Array.isArray(detail[1])
            ? detail[1].join(', ')
            : detail[1];

          return (
            <tr key={detailName} className={styles.techSpec}>
              <th className={`${getClassName()} ${styles.techSpec__name}`}>
                {detailName}
              </th>
              <th className={`${getClassName()} ${styles.techSpec__value}`}>
                {value}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
