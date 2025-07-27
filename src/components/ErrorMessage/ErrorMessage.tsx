import { Link } from 'react-router-dom';

export type ErrorMessageProps = {
  text: string;
  back?: boolean;
};

export const ErrorMessage = ({ text, back = false }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 font-mono">
      <div className="text-8xl animate-bounce mb-4">🦄</div>
      <p className="text-5xl text-blue-900 mb-8">{text}</p>
      {back ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
          onClick={() => window.location.reload()}
        >
          Back
        </button>
      ) : (
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
        >
          Back to the main page
        </Link>
      )}
    </div>
  );
};
