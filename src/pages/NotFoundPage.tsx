export const NotFoundPage: React.FC = () => {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex gap-4">
        <h1>404</h1>
        <div className="aspect-ratio w-1 animate-pulse bg-primary" />
        <h1>NOT FOUND</h1>
      </div>
    </main>
  );
};
