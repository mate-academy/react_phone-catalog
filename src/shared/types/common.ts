export interface DefaultProps {
  id?: string;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
}

export interface DefaultPropsChildren extends DefaultProps {
  children?: React.ReactNode;
}
