import { TYPOGRAPHY } from '@/constants/typography';

interface FieldErrorProps {
  message?: string;
}

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;

  return (
    <p className={`${TYPOGRAPHY.small} text-destructive mt-1`}>{message}</p>
  );
};
