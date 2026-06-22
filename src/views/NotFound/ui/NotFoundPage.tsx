import Image from 'next/image';
import Link from 'next/link';

import { BASE_URL } from '@/shared/constants/constant';
import { BodyText, H1 } from '@/shared/ui/Typography';

export const NotFoundPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-brand-black px-6 p-8 text-center">
      <Link
        href="/"
        aria-label="Go to homepage"
        className="mb-8 w-full max-w-100 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-accent"
      >
        <Image
          src={`${BASE_URL}/img/page-not-found.png`}
          alt="Page Not Found illustration"
          width={400}
          height={300}
          priority
          sizes="(max-width: 640px) 100vw, 400px"
          className="w-full h-auto object-contain"
        />
      </Link>

      <H1 className="text-brand-white mb-4">404</H1>

      <BodyText className="text-brand-secondary max-w-100 mb-8">
        Page not found. The page you are looking for doesn&apos;t exist or has
        been moved.
      </BodyText>

      <div className="flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-brand-white bg-brand-accent hover:bg-brand-accent-600 transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};
