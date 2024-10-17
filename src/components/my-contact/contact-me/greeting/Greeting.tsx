import { FC } from 'react';

import styles from './Greeting.module.scss';

export const Greeting: FC = () => {
  return (
    <div className={styles.greeting}>
      <span>Welcome to this project!👋🏿</span>
      <span>
        {`I'm`} so happy {`you're`} here!🎉
      </span>
      <span>
        I really hope you <br />
        enjoyed exploring this project <br />
        that I created with love.❤️
      </span>
      <span>Welcome, and enjoy browsing!👀</span>
    </div>
  );
};
