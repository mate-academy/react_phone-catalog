import { FC } from 'react';
import styles from './SpecsList.module.scss';
import classNames from 'classnames';
import { SpecOption } from '../../types/SpecOption';

interface Props {
  specs: SpecOption[];
  className?: string;
  optionClassname?: string;
  valueClassname?: string;
}

export const SpecsList: FC<Props> = ({
  specs,
  className,
  optionClassname,
  valueClassname,
}) => {
  return (
    <dl className={classNames(styles.specs, className)}>
      {specs.map(spec => (
        <div className={styles.specRow} key={spec.id}>
          <dt className={classNames(styles.specOption, optionClassname)}>
            {spec.label}
          </dt>
          <dd className={classNames(styles.specValue, valueClassname)}>
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
