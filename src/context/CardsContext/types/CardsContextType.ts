export interface CardsContextType {
  mCardIndex: number;
  hpCardIndex: number;
  ymalCardIndex: number;
  setMCardIndex: React.Dispatch<React.SetStateAction<number>>;
  setHpCardIndex: React.Dispatch<React.SetStateAction<number>>;
  setYmalCardIndex: React.Dispatch<React.SetStateAction<number>>;
}
