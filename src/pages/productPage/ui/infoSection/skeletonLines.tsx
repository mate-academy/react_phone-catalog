import { getWholeRandom } from '@shared/helpers';
import styles from '../../styles/infoSection/skeletonLines.module.scss';
//last line is not included, so it's basically lines - 1;
const MAX_LINES = 3;
const MIN_LINES = 2;
const MAX_WIDTH = 70;
const MIN_WIDTH = 30;

export const SkeletonLines = () => {
  const arr = Array.from(
    { length: getWholeRandom(MAX_LINES, MIN_LINES) },
    (_, i) => i,
  );
  const lastLength = getWholeRandom(MAX_WIDTH, MIN_WIDTH);

  return (
    <>
      {arr.map(line => (
        <span key={line} className={styles.line} />
      ))}
      <span className={styles.line} style={{ width: `${lastLength}%` }} />
    </>
  );
};
