import { useReward } from 'react-rewards';
import { useEffect } from 'react';
import styles from './Reward.module.scss';

export const CheckoutChears = ({ trigger }: { trigger: boolean }) => {
  const rewardId = 'checkout-reward';
  const { reward } = useReward(rewardId, 'balloons');

  useEffect(() => {
    if (trigger) {
      reward();
    }
  }, [trigger, reward]);

  return <span id={rewardId} className={styles.checkoutReward} />;
};
