import { FC } from 'react';

import styles from './Greeting.module.scss';

export const Greeting: FC = () => {
  return (
    <div className={styles.greeting}>
      <span>A very warm welcome to this project!👋🏿</span>
      <br />
      <span>
        {`I'm`} so happy {`you're`} here!🎉
      </span>
      <br />
      <span>
        I really hope you enjoyed exploring this project <br />
        that I created with love.❤️
      </span>
      <br />
      <span>Welcome, and enjoy browsing!👀</span>
    </div>
  );
};
