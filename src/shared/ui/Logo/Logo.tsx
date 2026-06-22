'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BASE_URL } from '@/shared/constants/constant';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="inline-block transition-transform duration-300 hover:scale-110"
    >
      <Image
        src={`${BASE_URL}/img/Logo.png`}
        alt="Logo Dark"
        width={64}
        height={22}
        className="w-16 h-5.5 lg:w-20 lg:h-7 block in-[.light]:hidden"
        priority
      />

      <Image
        src={`${BASE_URL}/img/Logo2.png`}
        alt="Logo Light"
        width={64}
        height={22}
        className="w-16 h-5.5 lg:w-20 lg:h-7 hidden in-[.light]:block"
        priority
      />
    </Link>
  );
};
