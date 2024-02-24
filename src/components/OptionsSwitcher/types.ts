export interface OptionsSwitcherProps {
  title: string,
  data: string[],
  variant: 'color' | 'capacity'
  currentData: string,
  onChoose: (curData: string, newData: string) => void,
}
