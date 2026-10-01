import EmptyState from '../../components/EmptyState';

type Props = {
  navigate: (to: string) => void;
};

export default function NotFoundPage({ navigate }: Props) {
  return (
    <EmptyState
      text="Page not found"
      action="Go to home"
      onAction={() => navigate('/')}
    />
  );
}
