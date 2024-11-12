export interface DefaultProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

export interface DefaultPropsChildren extends DefaultProps {
  children?: React.ReactNode;
}
