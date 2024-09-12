import { FC } from 'react';

import { TSocials } from './socials.data';

import styles from './SocialLink.module.scss';

type TProps = {
  item: TSocials;
};

export const SocialLink: FC<TProps> = ({ item }) => {
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
