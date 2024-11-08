import { FC } from 'react';

import styles from './SocialLink.module.scss';
import { TSocials } from './socials.data';

type TProps = {
  item: TSocials;
};

export const SocialLink: FC<TProps> = ({ item }) => {
  if (!item.href || !item.svg) return null;

  return (
    <li className={styles.link}>
      <a
        href={item.href}
        className={styles[item.className]}
        aria-label={item.className}
        target="_blank"
        rel="noreferrer"
      >
        {item.svg()}
      </a>
    </li>
  );
};
