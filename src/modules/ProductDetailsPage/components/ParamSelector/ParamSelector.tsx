//#region imports
import { FC, ReactNode } from 'react';
import baseStyles from './base.module.scss';
import styles from './ParamSelector.module.scss';
//#endregion

type Props = {
  title: string;
  name: string;
  params: string[];
  selected: string;
  renderItem: (param: string, isSelected: boolean) => ReactNode;
  changeParam: (newParam: string) => void;
};

export const ParamSelector: FC<Props> = ({
  title,
  name,
  params,
  selected,
  renderItem,
  changeParam,
}) => (
  <fieldset className={baseStyles.paramSelector}>
    <legend className={styles.title}>{title}</legend>

    <ul className={baseStyles.paramList}>
      {params.map(param => (
        <li key={param}>
          <input
            type="radio"
            name={name}
            id={param}
            className={styles.radioBtn}
            checked={selected === param}
            onChange={() => changeParam(param)}
          />

          <label htmlFor={param}>{renderItem(param, selected === param)}</label>
        </li>
      ))}
    </ul>
  </fieldset>
);
