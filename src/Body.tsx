/* eslint-disable max-len */
import { AnimatedLayout } from './modules/shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { AnimatedOutlet } from './modules/shared/Shared_Components/AnimatedComponents/AnimatedOutlet';
import { Footer } from './modules/Footer/components/Footer';

export const Body = () => {
  return (
    <AnimatedLayout>
      <main>
        <AnimatedOutlet />
      </main>

      <Footer />
    </AnimatedLayout>
  );
};
