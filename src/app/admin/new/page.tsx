/* eslint-disable no-console */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createClient } from '@/shared/lib/supabase/client';

interface SupabaseQueryError {
  message: string;
  status?: number;
  details?: string | null;
  hint?: string | null;
  code?: string;
}

const supabase = createClient();

export const NewProductPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('phones');
  const [price, setPrice] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [capacity, setCapacity] = useState('128GB');
  const [color, setColor] = useState('spacegray');
  const [ram, setRam] = useState('6GB');
  const [screen, setScreen] = useState("6.1' Super Retina XDR");
  const [year, setYear] = useState('2026');

  const [processor, setProcessor] = useState('Apple A16 Bionic');
  const [resolution, setResolution] = useState('2556×1179');
  const [camera, setCamera] = useState('48MP');
  const [zoom] = useState('Digital zoom up to 10x');

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const generateItemId = (prodName: string, cap: string, col: string) => {
    const formattedName = prodName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]+/g, '')
      .replace(/\s+/g, '-');
    return `${formattedName}-${cap.toLowerCase()}-${col.toLowerCase()}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !fullPrice)
      return alert('Будь ласка, заповніть усі основні поля!');
    if (!mainFile) return alert('Будь ласка, виберіть головне фото товару!');

    setIsSubmitting(true);
    const generatedId = generateItemId(name, capacity, color);
    const generatedNamespaceId = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]+/g, '')
      .replace(/\s+/g, '-');

    try {
      const safeCategory = category.toLowerCase().trim();

      // ----------------------------------------------------
      // 1. ЗАВАНТАЖЕННЯ ГОЛОВНОГО ФОТО
      // ----------------------------------------------------
      const rawMainExt = mainFile.name.includes('.')
        ? mainFile.name.split('.').pop()
        : 'png';
      const mainExt =
        rawMainExt?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';

      const mainImagePath = `img/${safeCategory}/${generatedId}-main.${mainExt}`;

      const { error: mainStorageError } = await supabase.storage
        .from('products')
        .upload(mainImagePath, mainFile, {
          cacheControl: '3600',
          upsert: true,
        });

      if (mainStorageError) {
        console.error('Помилка сховища (main image):', mainStorageError);
        throw new Error(
          `Помилка сховища головного фото: ${mainStorageError.message}`,
        );
      }

      // ----------------------------------------------------
      // 2. ЗАВАНТАЖЕННЯ ГАЛЕРЕЇ ФОТО
      // ----------------------------------------------------
      const detailImagesPaths: string[] = [];

      if (galleryFiles.length > 0) {
        for (let i = 0; i < galleryFiles.length; i++) {
          const file = galleryFiles[i];
          const rawGalleryExt = file.name.includes('.')
            ? file.name.split('.').pop()
            : 'png';
          const ext =
            rawGalleryExt?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';

          const galleryPath = `img/${safeCategory}/${generatedId}-gallery-${i}.${ext}`;

          const { error: galleryStorageError } = await supabase.storage
            .from('products')
            .upload(galleryPath, file, { cacheControl: '3600', upsert: true });

          if (!galleryStorageError) {
            detailImagesPaths.push(galleryPath);
          } else {
            console.error(
              `Не вдалося завантажити фото галереї №${i}:`,
              galleryStorageError.message,
            );
          }
        }
      }

      if (detailImagesPaths.length === 0) {
        detailImagesPaths.push(mainImagePath);
      }

      const defaultDescription = [
        {
          title: 'Screen',
          text: [`Beautiful ${screen} display with ${resolution} resolution.`],
        },
        {
          title: 'Performance',
          text: [
            `Powered by ${processor} processor coupled with ${ram} of RAM.`,
          ],
        },
      ];

      // ----------------------------------------------------
      // 3. ЗАПИС В ТАБЛИЦЮ product_details
      // ----------------------------------------------------
      const { error: detailsError } = await supabase
        .from('product_details')
        .insert([
          {
            id: generatedId,
            category: safeCategory,
            namespaceId: generatedNamespaceId,
            name: `${name} ${capacity} ${color}`,
            capacityAvailable: [capacity],
            capacity,
            priceRegular: Number(fullPrice),
            priceDiscount: Number(price),
            colorsAvailable: [color],
            color,
            images: [mainImagePath, ...detailImagesPaths],
            description: defaultDescription,
            screen,
            resolution,
            processor,
            ram,
            camera,
            zoom,
            cell: ['Not applicable'],
          },
        ]);

      if (detailsError) {
        console.error('Деталі помилки product_details:', detailsError);
        throw new Error(
          `Помилка бази даних (product_details): ${detailsError.message}`,
        );
      }

      // ----------------------------------------------------
      // 4. ЗАПИС В ТАБЛИЦЮ products
      // ----------------------------------------------------
      const { error: productError } = await supabase.from('products').insert([
        {
          itemId: generatedId,
          category: safeCategory,
          name,
          image: mainImagePath,
          price: Number(price),
          fullPrice: Number(fullPrice),
          screen,
          capacity,
          ram,
          color,
          year: Number(year),
        },
      ]);

      if (productError) {
        console.error('Деталі помилки products:', productError);
        await supabase.from('product_details').delete().eq('id', generatedId);
        throw new Error(
          `Помилка бази даних (products): ${productError.message}`,
        );
      }

      alert('Продукт успішно створено! Все завантажено та синхронізовано.');
      router.push('/admin');
      router.refresh();
    } catch (err) {
      const error = err as SupabaseQueryError;
      console.error('--- КРИТИЧНА ПОМИЛКА ДЕБАГУ ---');
      console.dir(err);

      if (error.status) console.log('HTTP Status:', error.status);
      if (error.details) console.log('Деталі:', error.details);
      if (error.hint) console.log('Підказка:', error.hint);
      if (error.code) console.log('Код помилки Postgres:', error.code);

      alert(error.message || 'Помилка створення товару');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin')}
          className="text-sm text-brand-secondary hover:text-white transition-all"
        >
          ← Назад до списку
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Додати девайс</h1>
        <p className="text-sm text-brand-secondary mt-1">
          Роздільне керування обкладинкою та додатковими медіа-файлами галереї.
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="space-y-6 border border-brand-elements bg-brand-surface-1 p-8 shadow-md"
      >
        <div className="grid gap-6 sm:grid-cols-2 border-b border-brand-elements pb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">
              1. Головне фото товару (Картка каталогу)
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-brand-elements bg-brand-black p-6 text-center hover:border-brand-accent transition-all relative min-h-35">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMainFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-xs font-medium text-white">
                {mainFile
                  ? `🔥 Готово: ${mainFile.name}`
                  : 'Натисніть для вибору головного фото'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">
              2. Галерея зображень (Масив для сторінки товару)
            </label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-brand-elements bg-brand-black p-6 text-center hover:border-blue-500 transition-all relative min-h-35">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setGalleryFiles(Array.from(e.target.files));
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-xs font-medium text-white">
                {galleryFiles.length > 0
                  ? `📸 Обрано файлів для галереї: ${galleryFiles.length}`
                  : 'Натисніть для вибору декількох photo'}
              </p>
              {galleryFiles.length > 0 && (
                <div className="text-[10px] text-brand-secondary mt-1 truncate max-w-full">
                  {galleryFiles.map((f) => f.name).join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Device Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
              placeholder="Apple iPhone 15 Pro"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            >
              <option value="phones">Phones</option>
              <option value="tablets">Tablets</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 border-t border-brand-elements pt-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              PriceDiscount ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Full Price ($)
            </label>
            <input
              type="number"
              value={fullPrice}
              onChange={(e) => setFullPrice(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Capacity
            </label>
            <input
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Color
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 border-t border-brand-elements pt-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Processor
            </label>
            <input
              type="text"
              value={processor}
              onChange={(e) => setProcessor(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Screen
            </label>
            <input
              type="text"
              value={screen}
              onChange={(e) => setScreen(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Resolution
            </label>
            <input
              type="text"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              RAM
            </label>
            <input
              type="text"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-secondary mb-2">
              Camera
            </label>
            <input
              type="text"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="w-full bg-brand-black border border-brand-elements px-4 py-2 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-accent hover:bg-brand-accent-600 disabled:bg-gray-700 text-white text-sm font-bold py-3 px-4 transition-all uppercase tracking-wider"
        >
          {isSubmitting
            ? 'Завантаження медіафайлів та запис...'
            : 'Створити гаджет з галереєю'}
        </button>
      </form>
    </div>
  );
};

export default NewProductPage;
