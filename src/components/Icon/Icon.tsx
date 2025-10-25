import classNames from 'classnames';
import styles from './Icon.module.scss';
import { useEffect, useRef, useState } from 'react';

type Props = {
  path: string;
  name: string;
};

export const Icon: React.FC<Props> = ({ path }) => {
  const [svgText, setSvgText] = useState('');
  const svgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(path)
      .then(res => res.text())
      .then(svg => {
        const cleanSvg = svg.replace(/fill=".*?"/g, 'fill="currentColor"');

        setSvgText(cleanSvg);
      });
  }, [path]);

  return (
    <div className={classNames(styles.icon)}>
      <div
        ref={svgContainer}
        className={classNames(styles.icon__img)}
        dangerouslySetInnerHTML={{ __html: svgText }}
      />
    </div>
  );
};
