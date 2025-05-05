export const handleError = (error: unknown, fallbackMessage: string) =>
  error instanceof Error ? error.message : fallbackMessage;
