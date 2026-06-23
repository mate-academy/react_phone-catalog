import { Locale } from './translations';

/**
 * Full RU / UA translations for every description paragraph that ships
 * in the mate-academy catalog JSON (71 unique paragraphs). Keyed by the
 * trimmed English original; unknown text falls back to the original.
 */
const PARAGRAPHS: Record<string, { ru: string; uk: string }> = {
  'A transformative triple-camera system that adds tons of capability without complexity.':
    {
      ru: 'Революционная система из трёх камер, которая даёт массу возможностей без лишней сложности.',
      uk: 'Революційна система з трьох камер, яка дає безліч можливостей без зайвої складності.',
    },
  'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.':
    {
      ru: 'Беспрецедентный скачок автономности. И потрясающий чип, который выводит машинное обучение на новый уровень и расширяет границы возможного для смартфона. Знакомьтесь — первый iPhone, достойный приставки Pro.',
      uk: 'Безпрецедентний стрибок автономності. І приголомшливий чип, що виводить машинне навчання на новий рівень та розсуває межі можливого для смартфона. Знайомтеся — перший iPhone, гідний приставки Pro.',
    },
  'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.':
    {
      ru: 'Знакомьтесь — первая система из трёх камер, в которой передовые технологии сочетаются с легендарной простотой iPhone. Захватывайте вчетверо больше пространства в кадре. Получайте красивые снимки даже при очень слабом освещении. Снимайте видео высочайшего качества — и редактируйте его теми же инструментами, что и фото. Вы ещё никогда так не снимали.',
      uk: 'Знайомтеся — перша система з трьох камер, у якій передові технології поєднані з легендарною простотою iPhone. Захоплюйте вчетверо більше простору в кадрі. Отримуйте гарні знімки навіть за дуже слабкого освітлення. Знімайте відео найвищої якості — і редагуйте його тими ж інструментами, що й фото. Ви ще ніколи так не знімали.',
    },
  'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.':
    {
      ru: 'iPhone 11 Pro снимает видео, поразительно достоверное и живое, с большей детализацией и плавностью движения. Огромная вычислительная мощность позволяет снимать видео в 4K с расширенным динамическим диапазоном и кинематографической стабилизацией — и всё это при 60 кадрах в секунду. А ещё вы получаете больше творческого контроля: вчетверо больше пространства в кадре и мощные новые инструменты редактирования.',
      uk: 'iPhone 11 Pro знімає відео, напрочуд достовірне й живе, з більшою деталізацією та плавністю руху. Величезна обчислювальна потужність дозволяє знімати відео у 4K з розширеним динамічним діапазоном та кінематографічною стабілізацією — і все це за 60 кадрів на секунду. А ще ви отримуєте більше творчого контролю: вчетверо більше простору в кадрі та потужні нові інструменти редагування.',
    },
  '5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.':
    {
      ru: 'Скорость 5G. A14 Bionic — самый быстрый чип в смартфоне. OLED-дисплей от края до края. Керамическое покрытие Ceramic Shield, вчетверо более устойчивое к падениям. И ночной режим в каждой камере. В iPhone 12 есть всё это — в двух идеальных размерах.',
      uk: 'Швидкість 5G. A14 Bionic — найшвидший чип у смартфоні. OLED-дисплей від краю до краю. Керамічне покриття Ceramic Shield, вчетверо стійкіше до падінь. І нічний режим у кожній камері. У iPhone 12 є все це — у двох ідеальних розмірах.',
    },
  'A14 Bionic is the first 5-nanometer chip in the industry, with advanced components literally atoms wide. Forty percent more transistors rev up speeds while increasing efficiency for great battery life. And a new ISP powers Dolby Vision recording — something no pro movie camera, let alone any other phone, can do.':
    {
      ru: 'A14 Bionic — первый в индустрии 5-нанометровый чип, компоненты которого имеют толщину буквально в несколько атомов. На 40% больше транзисторов разгоняют скорость и повышают энергоэффективность ради отличной автономности. А новый процессор обработки изображений обеспечивает запись в Dolby Vision — то, чего не умеет ни одна профессиональная кинокамера, не говоря уже о других телефонах.',
      uk: 'A14 Bionic — перший в індустрії 5-нанометровий чип, компоненти якого мають товщину буквально в кілька атомів. На 40% більше транзисторів розганяють швидкість і підвищують енергоефективність заради чудової автономності. А новий процесор обробки зображень забезпечує запис у Dolby Vision — те, чого не вміє жодна професійна кінокамера, не кажучи вже про інші телефони.',
    },
  'Low light is now a highlight. From dimly lit restaurants to moonlit beaches, the new Night mode delivers natural low-light shots — automatically.':
    {
      ru: 'Слабое освещение теперь ваш союзник. От полумрака ресторанов до залитых лунным светом пляжей — новый ночной режим автоматически делает естественные снимки даже в темноте.',
      uk: 'Слабке освітлення тепер ваш союзник. Від напівтемряви ресторанів до залитих місячним світлом пляжів — новий нічний режим автоматично робить природні знімки навіть у темряві.',
    },
  'A15 Bionic, the fastest chip ever in a smartphone. Super Retina XDR display with ProMotion. Durable Ceramic Shield with 4x better drop performance. New Night mode on all cameras. It’s the ultimate iPhone, powered by the ultimate chip.':
    {
      ru: 'A15 Bionic — самый быстрый чип, когда-либо стоявший в смартфоне. Дисплей Super Retina XDR с ProMotion. Прочное покрытие Ceramic Shield, вчетверо более устойчивое к падениям. Новый ночной режим во всех камерах. Это лучший iPhone на лучшем чипе.',
      uk: 'A15 Bionic — найшвидший чип, що будь-коли стояв у смартфоні. Дисплей Super Retina XDR з ProMotion. Міцне покриття Ceramic Shield, вчетверо стійкіше до падінь. Новий нічний режим у всіх камерах. Це найкращий iPhone на найкращому чипі.',
    },
  'The A15 Bionic chip is the fastest chip ever in a smartphone. It powers everything from photography to gaming. And the incredible Machine Learning accelerators allow you to experience augmented reality like never before.':
    {
      ru: 'Чип A15 Bionic — самый быстрый чип, когда-либо стоявший в смартфоне. Он отвечает за всё — от фотографии до игр. А невероятные ускорители машинного обучения раскрывают дополненную реальность как никогда раньше.',
      uk: 'Чип A15 Bionic — найшвидший чип, що будь-коли стояв у смартфоні. Він відповідає за все — від фотографії до ігор. А неймовірні прискорювачі машинного навчання розкривають доповнену реальність як ніколи раніше.',
    },
  'iPhone 13 Mini takes stunning photos and videos with its advanced dual-camera system, with a new Night mode on all cameras. And Photographic Styles personalizes your photos in the moment for a beautiful look.':
    {
      ru: 'iPhone 13 Mini снимает потрясающие фото и видео благодаря продвинутой системе из двух камер с новым ночным режимом на каждой. А фотографические стили мгновенно подстраивают снимки под ваш вкус.',
      uk: 'iPhone 13 Mini знімає приголомшливі фото та відео завдяки просунутій системі з двох камер із новим нічним режимом на кожній. А фотографічні стилі миттєво підлаштовують знімки під ваш смак.',
    },
  "Introducing the first pro camera system that's also an iPhone — delivering 3x optical zoom, macro photography, Night mode portraits, and a new ProRes format for the highest-quality video ever in a smartphone. Get ready to shoot like a pro.":
    {
      ru: 'Знакомьтесь — первая профессиональная система камер, которая ещё и iPhone: трёхкратный оптический зум, макросъёмка, портреты в ночном режиме и новый формат ProRes для видео высочайшего качества. Готовьтесь снимать как профи.',
      uk: 'Знайомтеся — перша професійна система камер, яка ще й iPhone: триразовий оптичний зум, макрозйомка, портрети в нічному режимі та новий формат ProRes для відео найвищої якості. Готуйтеся знімати як профі.',
    },
  'Film like a pro with exclusive access to the depth-of-field effect of Cinema mode, now on both the Wide and Telephoto cameras. Add focus transitions for a creative look, and easily switch between cameras to capture more of the moment.':
    {
      ru: 'Снимайте как профессионал: эффект глубины резкости в режиме «Киноэффект» теперь доступен и на широкоугольной, и на телефотокамере. Добавляйте переходы фокуса для творческого почерка и легко переключайтесь между камерами, чтобы запечатлеть больше.',
      uk: 'Знімайте як професіонал: ефект глибини різкості в режимі «Кіноефект» тепер доступний і на ширококутній, і на телефотокамері. Додавайте переходи фокуса для творчого почерку та легко перемикайтеся між камерами, щоб закарбувати більше.',
    },
  'A15 Bionic is the fastest chip ever in a smartphone. It powers incredible experiences in photography, video, gaming, and more — all while delivering great battery life. And it enables the most advanced machine learning capabilities in any smartphone for next-level experiences.':
    {
      ru: 'A15 Bionic — самый быстрый чип, когда-либо стоявший в смартфоне. Он раскрывает невероятные возможности в фото, видео, играх и не только — и при этом обеспечивает отличную автономность. А ещё это самые передовые функции машинного обучения среди всех смартфонов.',
      uk: 'A15 Bionic — найшвидший чип, що будь-коли стояв у смартфоні. Він розкриває неймовірні можливості у фото, відео, іграх та не тільки — і водночас забезпечує чудову автономність. А ще це найпередовіші функції машинного навчання серед усіх смартфонів.',
    },
  'ProMotion technology automatically adjusts the display to the movement on your screen, for more fluid scrolling, greater responsiveness, and smoother motion — and a battery that lasts all day.':
    {
      ru: 'Технология ProMotion автоматически подстраивает дисплей под происходящее на экране: более плавная прокрутка, выше отзывчивость, мягче движение — и заряда хватает на весь день.',
      uk: 'Технологія ProMotion автоматично підлаштовує дисплей під те, що відбувається на екрані: плавніше гортання, вища чутливість, мʼякіший рух — і заряду вистачає на весь день.',
    },
  'Experience incredible power and performance with the Apple iPad Pro 11. With the M1 chip, it delivers a new level of performance, making it faster and more efficient than ever before.':
    {
      ru: 'Откройте для себя невероятную мощь и производительность Apple iPad Pro 11. Чип M1 выводит производительность на новый уровень — быстрее и эффективнее, чем когда-либо.',
      uk: 'Відкрийте для себе неймовірну потужність і продуктивність Apple iPad Pro 11. Чип M1 виводить продуктивність на новий рівень — швидше й ефективніше, ніж будь-коли.',
    },
  "Whether you're editing photos, designing artwork, or multitasking with demanding apps, the iPad Pro 11 handles it all with ease.":
    {
      ru: 'Редактируете фото, создаёте иллюстрации или работаете сразу с несколькими требовательными приложениями — iPad Pro 11 справится со всем легко.',
      uk: 'Редагуєте фото, створюєте ілюстрації чи працюєте одразу з кількома вибагливими застосунками — iPad Pro 11 впорається з усім легко.',
    },
  "Enjoy a vibrant and immersive visual experience on the iPad Pro 11's Liquid Retina display. With ProMotion technology and True Tone, the display adapts to your environment, providing smooth scrolling, precise color accuracy, and incredible detail.":
    {
      ru: 'Наслаждайтесь яркой и захватывающей картинкой на дисплее Liquid Retina iPad Pro 11. Технологии ProMotion и True Tone подстраивают дисплей под окружение, обеспечивая плавную прокрутку, точную цветопередачу и невероятную детализацию.',
      uk: 'Насолоджуйтеся яскравою та захопливою картинкою на дисплеї Liquid Retina iPad Pro 11. Технології ProMotion і True Tone підлаштовують дисплей під оточення, забезпечуючи плавне гортання, точну передачу кольору та неймовірну деталізацію.',
    },
  "From watching movies to editing videos, the iPad Pro 11's display brings your content to life with stunning clarity.":
    {
      ru: 'От просмотра фильмов до монтажа видео — дисплей iPad Pro 11 оживляет ваш контент с потрясающей чёткостью.',
      uk: 'Від перегляду фільмів до монтажу відео — дисплей iPad Pro 11 оживляє ваш контент із приголомшливою чіткістю.',
    },
  "Capture stunning photos and videos with the iPad Pro 11's advanced camera system. Featuring a 12MP Ultra Wide front camera and a 12MP Wide rear camera with LiDAR scanner, you can take high-quality shots and enjoy augmented reality experiences.":
    {
      ru: 'Снимайте потрясающие фото и видео продвинутой системой камер iPad Pro 11. Фронтальная сверхширокоугольная камера на 12 Мп и основная широкоугольная на 12 Мп со сканером LiDAR позволяют делать качественные снимки и погружаться в дополненную реальность.',
      uk: 'Знімайте приголомшливі фото та відео просунутою системою камер iPad Pro 11. Фронтальна надширококутна камера на 12 Мп та основна ширококутна на 12 Мп зі сканером LiDAR дозволяють робити якісні знімки й занурюватися в доповнену реальність.',
    },
  "Whether you're video calling, scanning documents, or recording 4K videos, the iPad Pro 11's camera system delivers exceptional performance.":
    {
      ru: 'Видеозвонки, сканирование документов или запись видео в 4K — система камер iPad Pro 11 справляется со всем превосходно.',
      uk: 'Відеодзвінки, сканування документів чи запис відео у 4K — система камер iPad Pro 11 впорається з усім чудово.',
    },
  'The Apple iPad Air (4th Gen) combines sleek design with powerful performance. With its thin and light form factor, it\'s incredibly portable and easy to carry wherever you go.':
    {
      ru: 'Apple iPad Air (4-го поколения) сочетает изящный дизайн с мощной производительностью. Тонкий и лёгкий корпус делает его невероятно портативным — берите с собой куда угодно.',
      uk: 'Apple iPad Air (4-го покоління) поєднує витончений дизайн із потужною продуктивністю. Тонкий і легкий корпус робить його неймовірно портативним — беріть із собою будь-куди.',
    },
  'Featuring the A14 Bionic chip with Neural Engine, the iPad Air delivers fast and efficient performance, making it ideal for multitasking, gaming, and creative tasks.':
    {
      ru: 'Чип A14 Bionic с Neural Engine обеспечивает быструю и эффективную работу, поэтому iPad Air идеален для многозадачности, игр и творческих задач.',
      uk: 'Чип A14 Bionic з Neural Engine забезпечує швидку та ефективну роботу, тож iPad Air ідеальний для багатозадачності, ігор і творчих завдань.',
    },
  "Immerse yourself in vivid visuals on the iPad Air's Liquid Retina display. With True Tone and P3 wide color gamut, it offers true-to-life colors and incredible detail.":
    {
      ru: 'Погрузитесь в насыщенную картинку на дисплее Liquid Retina iPad Air. True Tone и широкий цветовой охват P3 дарят достоверные цвета и невероятную детализацию.',
      uk: 'Зануртеся в насичену картинку на дисплеї Liquid Retina iPad Air. True Tone і широкий колірний охоплення P3 дарують достовірні кольори та неймовірну деталізацію.',
    },
  "Whether you're watching movies, editing photos, or browsing the web, the iPad Air's display provides an immersive and enjoyable viewing experience.":
    {
      ru: 'Смотрите фильмы, редактируете фото или просматриваете сайты — дисплей iPad Air дарит захватывающие и приятные впечатления.',
      uk: 'Дивитеся фільми, редагуєте фото чи переглядаєте сайти — дисплей iPad Air дарує захопливі та приємні враження.',
    },
  "Unlock new possibilities with the iPad Air's versatile features. It supports Apple Pencil (2nd generation), allowing you to take notes, sketch, and annotate documents with precision.":
    {
      ru: 'Откройте новые возможности с универсальными функциями iPad Air. Поддержка Apple Pencil (2-го поколения) позволяет точно делать заметки, рисовать и комментировать документы.',
      uk: 'Відкрийте нові можливості з універсальними функціями iPad Air. Підтримка Apple Pencil (2-го покоління) дозволяє точно робити нотатки, малювати та коментувати документи.',
    },
  'With Touch ID built into the top button, you can securely unlock your iPad, make secure purchases, and authenticate apps with a simple touch.':
    {
      ru: 'Touch ID встроен в верхнюю кнопку — одним касанием вы безопасно разблокируете iPad, подтверждаете покупки и входите в приложения.',
      uk: 'Touch ID вбудований у верхню кнопку — одним дотиком ви безпечно розблоковуєте iPad, підтверджуєте покупки та входите до застосунків.',
    },
  'Experience the power of an iPad in a compact size with the Apple iPad Mini (6th Gen). With its 8.3-inch Liquid Retina display and slim design, it\'s perfect for on-the-go productivity and entertainment.':
    {
      ru: 'Ощутите мощь iPad в компактном корпусе — Apple iPad Mini (6-го поколения). Дисплей Liquid Retina 8,3 дюйма и тонкий дизайн делают его идеальным для работы и развлечений на ходу.',
      uk: 'Відчуйте потужність iPad у компактному корпусі — Apple iPad Mini (6-го покоління). Дисплей Liquid Retina 8,3 дюйма та тонкий дизайн роблять його ідеальним для роботи й розваг у дорозі.',
    },
  "Whether you're reading, gaming, or watching videos, the iPad Mini delivers a stunning visual experience in a portable package.":
    {
      ru: 'Читаете, играете или смотрите видео — iPad Mini дарит потрясающую картинку в портативном корпусе.',
      uk: 'Читаєте, граєте чи дивитеся відео — iPad Mini дарує приголомшливу картинку в портативному корпусі.',
    },
  'The iPad Mini (6th Gen) is equipped with the powerful A15 Bionic chip and Neural Engine, delivering fast and efficient performance. It can handle demanding tasks and graphics-intensive apps with ease, making it suitable for both work and play.':
    {
      ru: 'iPad Mini (6-го поколения) оснащён мощным чипом A15 Bionic с Neural Engine для быстрой и эффективной работы. Он легко справляется с требовательными задачами и графически насыщенными приложениями — и для работы, и для игр.',
      uk: 'iPad Mini (6-го покоління) оснащений потужним чипом A15 Bionic з Neural Engine для швидкої та ефективної роботи. Він легко впорається з вибагливими завданнями та графічно насиченими застосунками — і для роботи, і для ігор.',
    },
  'Experience smooth multitasking, immersive gaming, and seamless app usage on the iPad Mini.':
    {
      ru: 'Плавная многозадачность, захватывающие игры и безупречная работа приложений — всё это на iPad Mini.',
      uk: 'Плавна багатозадачність, захоплюючі ігри та бездоганна робота застосунків — усе це на iPad Mini.',
    },
  "Capture stunning photos and videos with the iPad Mini's advanced cameras. With a 12MP front camera and a 12MP rear camera, you can take high-quality shots and record impressive videos.":
    {
      ru: 'Снимайте потрясающие фото и видео продвинутыми камерами iPad Mini. Фронтальная камера на 12 Мп и основная на 12 Мп позволяют делать качественные снимки и записывать впечатляющее видео.',
      uk: 'Знімайте приголомшливі фото та відео просунутими камерами iPad Mini. Фронтальна камера на 12 Мп та основна на 12 Мп дозволяють робити якісні знімки й записувати вражаюче відео.',
    },
  'The iPad Mini also features Center Stage, a feature that automatically keeps you in frame during video calls, making your conversations more engaging and dynamic.':
    {
      ru: 'В iPad Mini есть Center Stage — функция, которая автоматически удерживает вас в кадре во время видеозвонков, делая разговоры живее и динамичнее.',
      uk: 'У iPad Mini є Center Stage — функція, що автоматично утримує вас у кадрі під час відеодзвінків, роблячи розмови жвавішими та динамічнішими.',
    },
  "The Apple iPad 10.2 (2020) offers a versatile and affordable option for everyday tasks and entertainment. Whether you're browsing the web, streaming content, or using productivity apps, it delivers a smooth and responsive experience.":
    {
      ru: 'Apple iPad 10.2 (2020) — универсальное и доступное решение для повседневных задач и развлечений. Просматриваете сайты, смотрите стримы или работаете в приложениях — он остаётся плавным и отзывчивым.',
      uk: 'Apple iPad 10.2 (2020) — універсальне та доступне рішення для повсякденних завдань і розваг. Переглядаєте сайти, дивитеся стріми чи працюєте в застосунках — він залишається плавним і чутливим.',
    },
  'With its large 10.2-inch Retina display, it provides a great viewing experience for all your content.':
    {
      ru: 'Большой 10,2-дюймовый дисплей Retina обеспечивает отличную картинку для любого контента.',
      uk: 'Великий 10,2-дюймовий дисплей Retina забезпечує чудову картинку для будь-якого контенту.',
    },
  "Experience powerful performance with the iPad 10.2's A12 Bionic chip. It enables fast and efficient multitasking, allowing you to run multiple apps smoothly and seamlessly.":
    {
      ru: 'Чип A12 Bionic в iPad 10.2 обеспечивает мощную производительность: быстрая и эффективная многозадачность, плавная и бесперебойная работа сразу нескольких приложений.',
      uk: 'Чип A12 Bionic у iPad 10.2 забезпечує потужну продуктивність: швидка та ефективна багатозадачність, плавна й безперебійна робота одразу кількох застосунків.',
    },
  'From gaming to editing documents, the iPad 10.2 can handle it all with ease.':
    {
      ru: 'От игр до редактирования документов — iPad 10.2 справится со всем легко.',
      uk: 'Від ігор до редагування документів — iPad 10.2 впорається з усім легко.',
    },
  'Unlock your creativity and productivity with Apple Pencil and Smart Keyboard support. Take notes, draw, and sketch with precision using the Apple Pencil (1st generation), and transform your iPad into a lightweight laptop with the Smart Keyboard.':
    {
      ru: 'Раскройте творчество и продуктивность с поддержкой Apple Pencil и Smart Keyboard. Делайте заметки, рисуйте и создавайте эскизы с точностью благодаря Apple Pencil (1-го поколения), а Smart Keyboard превратит iPad в лёгкий ноутбук.',
      uk: 'Розкрийте творчість і продуктивність із підтримкою Apple Pencil та Smart Keyboard. Робіть нотатки, малюйте та створюйте ескізи з точністю завдяки Apple Pencil (1-го покоління), а Smart Keyboard перетворить iPad на легкий ноутбук.',
    },
  "The iPad 10.2 adapts to your needs, whether you're a student, professional, or creative artist.":
    {
      ru: 'iPad 10.2 подстраивается под ваши задачи — будь вы студент, профессионал или творческий человек.',
      uk: 'iPad 10.2 підлаштовується під ваші завдання — чи ви студент, професіонал, чи творча людина.',
    },
  "The Apple iPad Mini (5th Gen) packs a punch with its compact size and powerful performance. Whether you're on the go or at home, it's perfect for productivity, entertainment, and creativity.":
    {
      ru: 'Apple iPad Mini (5-го поколения) впечатляет: компактный размер и мощная производительность. В дороге или дома — он идеален для работы, развлечений и творчества.',
      uk: 'Apple iPad Mini (5-го покоління) вражає: компактний розмір і потужна продуктивність. У дорозі чи вдома — він ідеальний для роботи, розваг і творчості.',
    },
  'With its A12 Bionic chip, the iPad Mini delivers fast and efficient performance, allowing you to run demanding apps and games smoothly.':
    {
      ru: 'Чип A12 Bionic обеспечивает iPad Mini быструю и эффективную работу — требовательные приложения и игры запускаются плавно.',
      uk: 'Чип A12 Bionic забезпечує iPad Mini швидку та ефективну роботу — вибагливі застосунки й ігри запускаються плавно.',
    },
  "Experience stunning visuals on the iPad Mini's Retina display. With True Tone technology, it adjusts the display's color temperature to match the ambient lighting, providing a natural and comfortable viewing experience.":
    {
      ru: 'Наслаждайтесь потрясающей картинкой на дисплее Retina iPad Mini. Технология True Tone подстраивает цветовую температуру под окружающее освещение, делая просмотр естественным и комфортным.',
      uk: 'Насолоджуйтеся приголомшливою картинкою на дисплеї Retina iPad Mini. Технологія True Tone підлаштовує колірну температуру під навколишнє освітлення, роблячи перегляд природним і комфортним.',
    },
  "From reading ebooks to browsing photos, the iPad Mini's display brings content to life with vibrant colors and sharp details.":
    {
      ru: 'От чтения книг до просмотра фото — дисплей iPad Mini оживляет контент насыщенными цветами и чёткими деталями.',
      uk: 'Від читання книжок до перегляду фото — дисплей iPad Mini оживляє контент насиченими кольорами та чіткими деталями.',
    },
  'Unlock your creativity and productivity with Apple Pencil and Smart Keyboard support. Take notes, sketch, and annotate documents with precision using the Apple Pencil (1st generation), and turn your iPad Mini into a versatile workstation with the Smart Keyboard.':
    {
      ru: 'Раскройте творчество и продуктивность с поддержкой Apple Pencil и Smart Keyboard. Делайте заметки, эскизы и комментарии к документам с точностью благодаря Apple Pencil (1-го поколения), а Smart Keyboard превратит iPad Mini в универсальное рабочее место.',
      uk: 'Розкрийте творчість і продуктивність із підтримкою Apple Pencil та Smart Keyboard. Робіть нотатки, ескізи та коментарі до документів з точністю завдяки Apple Pencil (1-го покоління), а Smart Keyboard перетворить iPad Mini на універсальне робоче місце.',
    },
  'The iPad Mini adapts to your needs, making it a powerful tool for both work and play.':
    {
      ru: 'iPad Mini подстраивается под ваши задачи, оставаясь мощным инструментом и для работы, и для развлечений.',
      uk: 'iPad Mini підлаштовується під ваші завдання, залишаючись потужним інструментом і для роботи, і для розваг.',
    },
  'The Apple Watch Series 3 is equipped with sensors to track your heart rate, calories burned, and other fitness metrics throughout the day. It can even track your workouts and suggest personalized fitness goals.':
    {
      ru: 'Apple Watch Series 3 оснащены датчиками, которые в течение дня отслеживают пульс, сожжённые калории и другие фитнес-показатели. Часы могут даже фиксировать тренировки и предлагать персональные цели.',
      uk: 'Apple Watch Series 3 оснащені датчиками, що протягом дня відстежують пульс, спалені калорії та інші фітнес-показники. Годинник може навіть фіксувати тренування й пропонувати персональні цілі.',
    },
  'With cellular connectivity, you can make calls and send texts from your wrist even without your iPhone nearby. And with Siri, you can get directions, send messages, and set reminders hands-free.':
    {
      ru: 'С поддержкой сотовой связи можно звонить и писать сообщения прямо с запястья — даже без iPhone рядом. А Siri проложит маршрут, отправит сообщение и поставит напоминание без помощи рук.',
      uk: 'З підтримкою стільникового звʼязку можна телефонувати й писати повідомлення просто із запʼястя — навіть без iPhone поруч. А Siri прокладе маршрут, надішле повідомлення та встановить нагадування без допомоги рук.',
    },
  'With Apple Music and Siri, you can stream over 75 million songs on your Apple Watch Series 3. Or listen to your favorite podcasts, audiobooks, and radio stations.':
    {
      ru: 'С Apple Music и Siri на Apple Watch Series 3 доступны более 75 миллионов песен. А ещё — любимые подкасты, аудиокниги и радиостанции.',
      uk: 'З Apple Music і Siri на Apple Watch Series 3 доступні понад 75 мільйонів пісень. А ще — улюблені подкасти, аудіокниги та радіостанції.',
    },
  'The Apple Watch Series 6 features an Always-On Retina display that is 2.5 times brighter outdoors when your wrist is down. So you can see all the information on your watch face at a glance.':
    {
      ru: 'У Apple Watch Series 6 дисплей Always-On Retina на улице в 2,5 раза ярче, когда рука опущена. Вся информация на циферблате видна с одного взгляда.',
      uk: 'У Apple Watch Series 6 дисплей Always-On Retina на вулиці у 2,5 раза яскравіший, коли рука опущена. Уся інформація на циферблаті видна з одного погляду.',
    },
  'The Blood Oxygen app measures your blood oxygen levels with a revolutionary new sensor and app. You can also take an ECG from your wrist anytime, anywhere.':
    {
      ru: 'Приложение «Кислород в крови» измеряет уровень кислорода с помощью революционного нового датчика. А ещё можно в любой момент и в любом месте снять ЭКГ прямо с запястья.',
      uk: 'Застосунок «Кисень у крові» вимірює рівень кисню за допомогою революційного нового датчика. А ще можна будь-коли й будь-де зняти ЕКГ просто із запʼястя.',
    },
  'The Apple Watch Series 6 tracks your daily activity including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.':
    {
      ru: 'Apple Watch Series 6 отслеживают повседневную активность: тренировки, шаги и сожжённые калории. А встроенный GPS фиксирует пробежки, прогулки и походы.',
      uk: 'Apple Watch Series 6 відстежують повсякденну активність: тренування, кроки та спалені калорії. А вбудований GPS фіксує пробіжки, прогулянки й походи.',
    },
  'With the Always-On Retina display, you can easily see the time and important information without raising your wrist. The display is also 30% larger than the Series 3, making it easier to read and interact with.':
    {
      ru: 'С дисплеем Always-On Retina время и важная информация видны без поднятия руки. А ещё дисплей на 30% больше, чем у Series 3 — читать и работать с ним удобнее.',
      uk: 'З дисплеєм Always-On Retina час і важлива інформація видні без піднімання руки. А ще дисплей на 30% більший, ніж у Series 3 — читати й працювати з ним зручніше.',
    },
  'The ECG app can detect irregular heart rhythms and alert you if something seems amiss. You can also take an ECG anytime, anywhere, right from your wrist.':
    {
      ru: 'Приложение ЭКГ способно распознать нерегулярный сердечный ритм и предупредить, если что-то не так. Снять ЭКГ можно в любое время и в любом месте прямо с запястья.',
      uk: 'Застосунок ЕКГ здатний розпізнати нерегулярний серцевий ритм і попередити, якщо щось не так. Зняти ЕКГ можна будь-коли й будь-де просто із запʼястя.',
    },
  'The Apple Watch Series 5 tracks your daily activity, including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.':
    {
      ru: 'Apple Watch Series 5 отслеживают повседневную активность: тренировки, шаги и сожжённые калории. А встроенный GPS фиксирует пробежки, прогулки и походы.',
      uk: 'Apple Watch Series 5 відстежують повсякденну активність: тренування, кроки та спалені калорії. А вбудований GPS фіксує пробіжки, прогулянки й походи.',
    },
  'The Apple Watch Series 5 features an Always-On Retina display that allows you to glance at your watch without raising your wrist.':
    {
      ru: 'У Apple Watch Series 5 дисплей Always-On Retina — взглянуть на часы можно, не поднимая руку.',
      uk: 'У Apple Watch Series 5 дисплей Always-On Retina — поглянути на годинник можна, не піднімаючи руку.',
    },
  'With the ECG app, you can take an electrocardiogram from your wrist anytime, anywhere.':
    {
      ru: 'С приложением ЭКГ снять электрокардиограмму можно прямо с запястья — в любое время и в любом месте.',
      uk: 'Із застосунком ЕКГ зняти електрокардіограму можна просто із запʼястя — будь-коли й будь-де.',
    },
  'The Apple Watch Series 5 tracks your workouts including running, walking, cycling, and swimming. It also has a built-in GPS to track your location and route.':
    {
      ru: 'Apple Watch Series 5 фиксируют тренировки: бег, ходьбу, велосипед и плавание. А встроенный GPS отслеживает местоположение и маршрут.',
      uk: 'Apple Watch Series 5 фіксують тренування: біг, ходьбу, велосипед і плавання. А вбудований GPS відстежує місцеположення й маршрут.',
    },
  'The Apple Watch Series 4 has a larger display that lets you see more information at a glance. The display is over 30% larger than the Series 3 and is edge-to-edge with curved corners.':
    {
      ru: 'У Apple Watch Series 4 дисплей больше — на нём с одного взгляда видно больше информации. Он более чем на 30% крупнее, чем у Series 3, занимает всю площадь и имеет скруглённые углы.',
      uk: 'У Apple Watch Series 4 дисплей більший — на ньому з одного погляду видно більше інформації. Він понад на 30% більший, ніж у Series 3, займає всю площу та має заокруглені кути.',
    },
  'With the ECG app, you can take an electrocardiogram right from your wrist. This feature is only available in certain countries and regions.':
    {
      ru: 'С приложением ЭКГ снять электрокардиограмму можно прямо с запястья. Функция доступна не во всех странах и регионах.',
      uk: 'Із застосунком ЕКГ зняти електрокардіограму можна просто із запʼястя. Функція доступна не в усіх країнах і регіонах.',
    },
  "The Apple Watch Series 4 can detect when you fall and can send an alert to emergency services if you don't respond within a minute. This feature is only available for users over 65 years old.":
    {
      ru: 'Apple Watch Series 4 распознают падение и, если вы не отреагируете в течение минуты, могут вызвать экстренные службы. Функция доступна для пользователей старше 65 лет.',
      uk: 'Apple Watch Series 4 розпізнають падіння та, якщо ви не відреагуєте протягом хвилини, можуть викликати екстрені служби. Функція доступна для користувачів понад 65 років.',
    },
  'The Apple Watch SE features a Retina display that provides clear and vibrant visuals for easy readability.':
    {
      ru: 'У Apple Watch SE дисплей Retina с чёткой и яркой картинкой — всё легко читается.',
      uk: 'У Apple Watch SE дисплей Retina з чіткою та яскравою картинкою — усе легко читається.',
    },
  "With Family Setup, you can pair your Apple Watch SE with a family member's iPhone, so you can stay connected even without owning an iPhone yourself.":
    {
      ru: 'С функцией «Семейная настройка» можно связать Apple Watch SE с iPhone члена семьи — вы остаётесь на связи, даже не имея собственного iPhone.',
      uk: 'З функцією «Сімейне налаштування» можна звʼязати Apple Watch SE з iPhone члена родини — ви залишаєтеся на звʼязку, навіть не маючи власного iPhone.',
    },
  'The Apple Watch SE offers comprehensive fitness tracking features, including activity tracking, heart rate monitoring, and built-in GPS for tracking your outdoor workouts.':
    {
      ru: 'Apple Watch SE предлагают полный набор фитнес-функций: отслеживание активности, мониторинг пульса и встроенный GPS для тренировок на улице.',
      uk: 'Apple Watch SE пропонують повний набір фітнес-функцій: відстеження активності, моніторинг пульсу та вбудований GPS для тренувань надворі.',
    },
  'The Apple Watch SE features a stunning Retina display that is always on, so you can easily see the time and important information without having to raise your wrist.':
    {
      ru: 'У Apple Watch SE великолепный дисплей Retina, который всегда включён — время и важная информация видны без поднятия руки.',
      uk: 'У Apple Watch SE чудовий дисплей Retina, який завжди увімкнений — час і важлива інформація видні без піднімання руки.',
    },
  'The Apple Watch SE has all the features you need to stay healthy and active, including heart rate monitoring, activity tracking, and sleep tracking. It also has built-in GPS so you can track your workouts and outdoor activities.':
    {
      ru: 'В Apple Watch SE есть всё, чтобы оставаться здоровым и активным: мониторинг пульса, отслеживание активности и сна. А встроенный GPS фиксирует тренировки и занятия на улице.',
      uk: 'У Apple Watch SE є все, щоб залишатися здоровим і активним: моніторинг пульсу, відстеження активності та сну. А вбудований GPS фіксує тренування й заняття надворі.',
    },
  'With cellular and Wi-Fi connectivity, you can stay connected wherever you go. You can make and receive calls, send texts, and stream music directly from your wrist.':
    {
      ru: 'С поддержкой сотовой связи и Wi-Fi вы остаётесь на связи где угодно: звоните, принимайте вызовы, пишите сообщения и слушайте музыку прямо с запястья.',
      uk: 'З підтримкою стільникового звʼязку та Wi-Fi ви залишаєтеся на звʼязку будь-де: телефонуйте, приймайте виклики, пишіть повідомлення та слухайте музику просто із запʼястя.',
    },
  'The Apple Watch SE tracks your daily activity including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.':
    {
      ru: 'Apple Watch SE отслеживают повседневную активность: тренировки, шаги и сожжённые калории. А встроенный GPS фиксирует пробежки, прогулки и походы.',
      uk: 'Apple Watch SE відстежують повсякденну активність: тренування, кроки та спалені калорії. А вбудований GPS фіксує пробіжки, прогулянки й походи.',
    },
  'The Apple Watch SE keeps you connected with the people and information you care about most. With cellular service, you can make and receive calls and texts, stream music, and use Siri, all without your iPhone.':
    {
      ru: 'Apple Watch SE держат вас на связи с близкими и важной информацией. С сотовой связью можно звонить, принимать вызовы и сообщения, слушать музыку и пользоваться Siri — всё без iPhone.',
      uk: 'Apple Watch SE тримають вас на звʼязку з близькими та важливою інформацією. Зі стільниковим звʼязком можна телефонувати, приймати виклики й повідомлення, слухати музику та користуватися Siri — усе без iPhone.',
    },
  'The Apple Watch SE features a stunning Retina display that is always on, providing clear and vibrant visuals for easy readability.':
    {
      ru: 'У Apple Watch SE великолепный дисплей Retina, который всегда включён, — чёткая и яркая картинка легко читается.',
      uk: 'У Apple Watch SE чудовий дисплей Retina, який завжди увімкнений, — чітка та яскрава картинка легко читається.',
    },
  'The Apple Watch SE helps you stay active and monitors your health with features like heart rate monitoring, activity tracking, and built-in GPS for tracking your outdoor workouts.':
    {
      ru: 'Apple Watch SE помогают оставаться активным и следят за здоровьем: мониторинг пульса, отслеживание активности и встроенный GPS для тренировок на улице.',
      uk: 'Apple Watch SE допомагають залишатися активним і стежать за здоровʼям: моніторинг пульсу, відстеження активності та вбудований GPS для тренувань надворі.',
    },
  'With cellular and Wi-Fi connectivity, you can stay connected on the go. Make and receive calls, send messages, stream music, and access Siri right from your wrist.':
    {
      ru: 'С поддержкой сотовой связи и Wi-Fi вы остаётесь на связи в дороге: звоните, принимайте вызовы, пишите сообщения, слушайте музыку и пользуйтесь Siri прямо с запястья.',
      uk: 'З підтримкою стільникового звʼязку та Wi-Fi ви залишаєтеся на звʼязку в дорозі: телефонуйте, приймайте виклики, пишіть повідомлення, слухайте музику та користуйтеся Siri просто із запʼястя.',
    },
};

export const translateDescriptionParagraph = (
  text: string,
  locale: Locale,
): string => {
  if (locale === 'en') return text;
  const entry = PARAGRAPHS[text.trim()];
  return entry?.[locale] ?? text;
};
