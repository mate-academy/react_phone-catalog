import { useAppContext } from '../../../../../../context/AppContext';
import { PhoneCard } from './components/PhoneCard/PhoneCard';
import styles from './PhonesList.module.scss';

type Props = {
  cardRef: React.RefObject<HTMLDivElement>;
  cardContainerRef: React.RefObject<HTMLDivElement>;
};

export const PhonesList = ({ cardRef, cardContainerRef }: Props) => {
  const { newPhonesModels } = useAppContext();

  return (
    <div className={styles.phonesList}>
      <div ref={cardContainerRef} className={styles.container}>
        {newPhonesModels.map(phone => (
          <PhoneCard key={phone.id} phone={phone} cardRef={cardRef} />
        ))}
      </div>
    </div>
  );
};
