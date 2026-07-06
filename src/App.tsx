/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Globe, ChevronDown, Calendar, MapPin, Clock, ArrowRight, 
  Play, Pause, Sparkles, Check, Heart, Smile, Compass, ShieldCheck, 
  Activity, Instagram, Send, Mail, Map, Plus, Minus, Coffee, Music, BookOpen 
} from 'lucide-react';
import { translations } from './translations';
import type { Service, ScheduleEvent, FaqItem } from './types';

// Let's define our mock images or resolved generated assets
const IMAGES = {
  hero: "/src/assets/images/hero_stretching_1782993308601.jpg",
  about: "/src/assets/images/about_sasha_1782993323076.jpg",
  park: "/src/assets/images/park_training_1782993340255.jpg",
  brunch: "/src/assets/images/stretch_and_eat_1782993355215.jpg",
};

// =========================================================================
// STRETCH & EAT - UPCOMING EVENT CONFIGURATION
// Easily edit this object to update the upcoming event block or handle the offseason.
// =========================================================================
const UPCOMING_EVENT_CONFIG = {
  isSeasonActive: true, // Set to true during the season, false outside the season

  // Active Season Info
  activeEvent: {
    title: {
      ru: 'Ближайшая встреча Stretch & Eat',
      uk: 'Найближча зустріч Stretch & Eat',
      en: 'Upcoming Stretch & Eat Session',
    },
    description: {
      ru: 'Вас ждет мягкая утренняя практика, танцевальный релиз и изысканный веганский пикник в кругу единомышленниц 🌿',
      uk: 'На вас чекає м\'яка ранкова практика, танцювальний реліз та вишуканий веганський бранч-пікнік у колі однодумиць 🌿',
      en: 'Gentle morning stretch, release dance movement, and a beautiful vegan picnic with like-minded souls 🌿',
    },
    date: {
      ru: 'Воскресенье, 12 июля',
      uk: 'Неділя, 12 липня',
      en: 'Sunday, July 12',
    },
    time: '10:00 - 12:00',
    location: {
      ru: 'Парк Рональда Рейгана, Гданьск (на лужайке)',
      uk: 'Парк Рональда Рейгана, Гданськ (на галявині)',
      en: 'Ronald Reagan Park, Gdańsk (on the lawn)',
    },
    status: {
      ru: 'Осталось 4 места',
      uk: 'Залишилося 4 місця',
      en: '4 spots left',
    },
  },

  // Offseason Announcement
  offseason: {
    title: {
      ru: 'Сезон Stretch & Eat завершён 🌿',
      uk: 'Сезон Stretch & Eat завершено 🌿',
      en: 'Stretch & Eat Season is Closed 🌿',
    },
    description: {
      ru: 'Мы обязательно вернёмся следующим летом с новыми встречами. Следите за обновлениями в Instagram.',
      uk: 'Ми обов\'язково повернемося наступного літа з новими зустрічами. Стежте за оновленнями в Instagram.',
      en: 'We will definitely return next summer with brand new sessions. Follow our Instagram for updates.',
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<'ru' | 'uk' | 'en'>('ru');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('individual');
  
  // Form submission state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    date: '2026-07-05',
    time: '10:00',
    notes: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Breathing simulation state
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathCycle, setBreathCycle] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathTimer, setBreathTimer] = useState(30);

  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Blog article reader state
  const [readingPost, setReadingPost] = useState<number | null>(null);

  // Current dictionary shortcut
  const t = translations[lang];

  // Options configuration for the Stretch & Eat side-by-side comparison
  const optionsData = {
    opt1: {
      title: lang === 'ru' ? 'Только движение' : lang === 'uk' ? 'Тільки рух' : 'Movement & Flow',
      subtitle: lang === 'ru' ? 'Стретчинг + танцевальная импровизация' : lang === 'uk' ? 'Стретчинг + танцювальна імпровізація' : 'Stretching + Dance Improvisation',
      price: '70 PLN',
      noBreakfast: lang === 'ru' ? 'без завтрака' : lang === 'uk' ? 'без сніданку' : 'no breakfast',
      features: lang === 'ru' ? [
        '45 минут бережного силового стретчинга',
        '15 минут легкой танцевальной разминки',
        'Профессиональные коврики и инвентарь',
        'Доступ в зону практик под открытым небом'
      ] : lang === 'uk' ? [
        '45 хвилин дбайливого силового стретчингу',
        '15 хвилин легкої танцювальної розминки',
        'Професійні килимки та інвентар',
        'Доступ до зони практик під відкритим небом'
      ] : [
        '45 minutes of mindful power stretching',
        '15 minutes of intuitive dance release',
        'Premium mats and equipment provided',
        'Access to the open-air training zone'
      ],
      cta: lang === 'ru' ? 'Выбрать Вариант 1' : lang === 'uk' ? 'Обрати Варіант 1' : 'Select Option 1'
    },
    opt2: {
      title: lang === 'ru' ? 'Полное погружение' : lang === 'uk' ? 'Повне занурення' : 'Full Experience',
      subtitle: lang === 'ru' ? 'Стретчинг + танец + полезный бранч' : lang === 'uk' ? 'Стретчинг + танець + корисний бранч' : 'Stretching + Dance + Healthy Brunch',
      price: '130 PLN',
      highlightBadge: lang === 'ru' ? 'Рекомендуем' : lang === 'uk' ? 'Рекомендуємо' : 'Full Experience',
      features: lang === 'ru' ? [
        'Все опции из Варианта 1',
        'Эстетичный здоровый бранч-пикник',
        'Полезный десерт, матча или авторский чай',
        'Поддерживающий женский круг и общение'
      ] : lang === 'uk' ? [
        'Всі опції з Варіанту 1',
        'Естетичний здоровий бранч-пікнік',
        'Корисний десерт, матча або авторський чай',
        'Підтримуюче жіноче коло та спілкування'
      ] : [
        'Everything in Option 1',
        'Aesthetic healthy brunch-picnic on grass',
        'Chef\'s matcha latte or designer herbal tea',
        'Feminine community sharing circle'
      ],
      cta: lang === 'ru' ? 'Забронировать бранч' : lang === 'uk' ? 'Забронювати бранч' : 'Book Full Experience'
    }
  };



  // Breathing simulation interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let cycleTimer: NodeJS.Timeout;

    if (isBreathingActive && breathTimer > 0) {
      timer = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            setIsBreathingActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      // Cycle animation every 4 seconds
      cycleTimer = setInterval(() => {
        setBreathCycle((prev) => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);
    } else if (!isBreathingActive) {
      setBreathTimer(30);
      setBreathCycle('inhale');
    }

    return () => {
      clearInterval(timer);
      clearInterval(cycleTimer);
    };
  }, [isBreathingActive, breathTimer]);

  const handleBookClick = (serviceId: string, customNotes?: string) => {
    setSelectedServiceId(serviceId);
    if (customNotes) {
      setBookingForm(prev => ({ ...prev, notes: customNotes }));
    } else {
      setBookingForm(prev => ({ ...prev, notes: '' }));
    }
    setIsBookingModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert(lang === 'ru' ? 'Пожалуйста, заполните обязательные поля' : lang === 'uk' ? 'Будь ласка, заповніть обов\'язкові поля' : 'Please fill all required fields');
      return;
    }
    setIsFormSubmitted(true);
  };

  const resetBookingForm = () => {
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      telegram: '',
      date: '2026-07-05',
      time: '10:00',
      notes: '',
    });
    setIsFormSubmitted(false);
    setIsBookingModalOpen(false);
  };

  // Quick navigation helper that respects multi-tab setup
  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reusable lists conforming to types
  const servicesList: Service[] = [
    {
      id: 'individual',
      title: t.services.individual.title,
      subtitle: t.services.individual.subtitle,
      description: t.services.individual.desc,
      price: lang === 'en' ? '€45' : '180 PLN',
      duration: '60 min',
      type: 'individual',
      details: t.services.individual.details,
      location: lang === 'en' ? 'Studio or Online' : 'Студия или Онлайн',
      highlighted: true
    },
    {
      id: 'online',
      title: t.services.online.title,
      subtitle: t.services.online.subtitle,
      description: t.services.online.desc,
      price: lang === 'en' ? '€35' : '140 PLN',
      duration: '60 min',
      type: 'online',
      details: t.services.online.details,
      location: 'Zoom / Google Meet'
    },
    {
      id: 'park',
      title: t.services.park.title,
      subtitle: t.services.park.subtitle,
      description: t.services.park.desc,
      price: lang === 'en' ? '€12' : '50 PLN',
      duration: '75 min',
      type: 'event',
      details: t.services.park.details,
      location: lang === 'en' ? 'Oliwa Park, Gdańsk' : 'Парк Оливский, Гданьск',
      spotsLeft: 4
    },
    {
      id: 'group',
      title: t.services.group.title,
      subtitle: t.services.group.subtitle,
      description: t.services.group.desc,
      price: lang === 'en' ? '€15' : '60 PLN',
      duration: '60 min',
      type: 'group',
      details: t.services.group.details,
      location: lang === 'en' ? 'Boutique Studio' : 'Студия в центре'
    }
  ];

  // Timetable
  const scheduleData: ScheduleEvent[] = [
    { id: '1', day: 'Tuesday', time: '17:00', title: t.schedule.events.postureGroup, type: 'group', location: t.schedule.locations.studio, spotsTotal: 6, spotsTaken: 6, price: '60 PLN' },
    { id: '2', day: 'Wednesday', time: '09:00', title: t.schedule.events.individualSession, type: 'individual', location: t.schedule.locations.studio, spotsTotal: 1, spotsTaken: 0, price: '180 PLN' },
    { id: '3', day: 'Thursday', time: '19:00', title: t.schedule.events.individualSession, type: 'individual', location: 'Zoom', spotsTotal: 1, spotsTaken: 1, price: '140 PLN' },
    { id: '4', day: 'Saturday', time: '15:00', title: t.schedule.events.postureGroup, type: 'group', location: t.schedule.locations.studio, spotsTotal: 6, spotsTaken: 6, price: '60 PLN' },
    { id: '5', day: 'Sunday', time: '10:00', title: t.schedule.events.parkTraining, type: 'event', location: t.schedule.locations.park, spotsTotal: 15, spotsTaken: 11, price: '50 PLN', isSpecial: true },
  ];



  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: lang === 'ru' ? '5 минут для шеи: легкая разминка за офисным столом' : lang === 'uk' ? '5 хвилин для шиї: легка розминка за офісним столом' : '5 Minutes for Your Neck: Easy Routine at Your Desk',
      date: '02.07.2026',
      readTime: '3 min',
      intro: lang === 'ru' ? 'Простые упражнения, которые снимут напряжение в шейном отделе всего за 5 минут работы.' : lang === 'uk' ? 'Прості вправи, які знімуть напругу в шийному відділі всього за 5 хвилин роботи.' : 'Simple structural exercises that will melt tension in your cervical spine in just 5 minutes.',
      content: lang === 'ru' ? `Сидячий образ жизни — главный враг нашей осанки. Постоянное выдвижение головы вперед к экрану (так называемая «компьютерная шея») перенапрягает мышцы задней поверхности шеи и лишает мобильности грудной отдел.

      Сделайте этот мини-комплекс прямо сейчас:
      1. Дыхание в ребра (1 минута): Положите руки на нижнюю часть ребер. Сделайте глубокий вдох носом, расширяя грудную клетку в стороны, а не плечи вверх. Медленный выдох ртом.
      2. Кивки головой «Да» (1 минута): Медленно опускайте подбородок к груди, чувствуя мягкое растяжение сзади, затем плавно возвращайте в нейтраль. Избегайте резких закидываний головы назад.
      3. Круговые вращения плечами назад (1 минута): На вдохе потяните плечи к ушам, на выдохе плавно опустите их назад и вниз, лопатки тянутся к тазу.
      4. Раскрытие грудного отдела (2 минуты): Сцепите руки в замок за головой. На вдохе мягко направьте локти в стороны и посмотрите на потолок, раскрывая грудь. На выдохе вернитесь в исходное положение.` : 
      lang === 'uk' ? `Сидячий спосіб життя — головний ворог нашої постави. Постійне висування голови вперед до екрана (так звана «комп'ютерна шия») перенапружує м'язи задньої поверхні шиї та позбавляє мобільності грудний відділ.

      Зробіть цей міні-комплекс просто зараз:
      1. Дихання в ребра (1 хвилина): Покладіть руки на нижню частину ребер. Зробіть глибокий вдих носом, розширюючи грудну клітку в сторони, а не плечі вгору. Повільний видих ротом.
      2. Кивки головою «Так» (1 хвилина): Повільно опускайте підборіддя до грудей, відчуваючи м'яке розтягування ззаду, потім плавно повертайте в нейтраль.
      3. Кругові обертання плечима назад (1 хвилина): На вдиху потягніть плечі до вух, на видиху плавно опустіть їх назад і вниз.
      4. Розкриття грудного відділу (2 хвилини): Зчепіть руки в замок за головою. На вдиху м'яко спрямуйте лікті в сторони і подивіться на стелю.` :
      `A sedentary lifestyle is the ultimate enemy of elegant alignment. Constantly pushing your chin forward toward the computer monitor (computer-neck syndrome) overloads the muscles at the back of your cervical spine and freezes your thoracic rib cage.

      Do this simple physical routine right now:
      1. Rib Breathing (1 min): Place your palms flat against your lower rib cage. Inhale deeply through your nose, expanding your chest sideways. Exhale slowly through slightly parted lips.
      2. Gentle Nodding (1 min): Slowly tuck your chin inward toward your throat, feeling a warm, soothing elongation along the neck spine. Return gently to neutral.
      3. Shoulder Rolls (1 min): Inhale and elevate your shoulder blades toward your ears. Exhale and roll them backward and downward.
      4. Chest Expansion (2 min): Interlace your fingers behind your neck. Inhale and look slightly upward, opening your elbows to the sides.`
    },
    {
      id: 2,
      title: lang === 'ru' ? 'Почему силовой стретчинг лучше пассивного?' : lang === 'uk' ? 'Чому силовий стретчинг кращий за пасивний?' : 'Why Active Strength Stretching Beats Passive Stretching',
      date: '28.06.2026',
      readTime: '4 min',
      intro: lang === 'ru' ? 'Разбираем разницу между «просто сидением в шпагате» и функциональной гибкостью.' : lang === 'uk' ? 'Розбираємо різницю між «просто сидінням у шпагаті» та функціональною гнучкістю.' : 'Exploring the physical difference between static split straining and dynamic joint durability.',
      content: lang === 'ru' ? `Пассивная растяжка — это классика, которую мы все знаем: сесть на шпагат, терпеть боль и просить кого-то нажать на спину. Но современная наука о движении доказала, что такой подход малоэффективен и травмоопасен.

      Что такое активный силовой стретчинг?
      Это метод, при котором мы не просто растягиваем мышцу, а заставляем ее работать и быть сильной в этой крайней амплитуде. Мышца должна уметь контролировать движение.

      Главные преимущества:
      1. Безопасность для суставов: Сильная мышца надежно держит сустав, не давая связкам растягиваться сверх меры.
      2. Долговечный результат: Мозг запоминает новую амплитуду только тогда, когда мышцы совершают там активную работу. Пассивная растяжка исчезает уже через несколько часов, а силовая — остается.
      3. Красивый тонус: Вместо «вялых» мышц вы получаете подтянутый, упругий и скульптурный рельеф.` :
      lang === 'uk' ? `Пасивна розтяжка — це класика: сісти на шпагат, терпіти біль і просити когось натиснути на спину. Але сучасна наука про рух довела, що такий підхід є малоефективним та травмонебезпечним.

      Що таке активний силовий стретчинг?
      Це метод, при якому ми не просто розтягуємо м'яз, а змушуємо його працювати і бути сильним у цій крайній амплітуді. М'яз має вміти контролювати рух.

      Головні переваги:
      1. Безпека для суглобів: Сильний м'яз надійно тримає суглоб, захищаючи зв'язки.
      2. Довговічний результат: Мозок запам'ятовує нову амплітуду тільки тоді, коли м'язи виконують активну роботу.
      3. Гарний тонус: Замість «в'ялих» м'язів ви отримуєте підтягнутий, пружний рельєф.` :
      `Passive stretching is the traditional method: forced static positioning, bearing intense pain, or letting someone press down on your shoulder blades. Modern movement science demonstrates that this is risky.

      What is Active Strength Stretching?
      This methodology is built on training your nervous system to stabilize and strengthen muscle tissue in extended positions.

      Key Benefits:
      1. Structural Safety: Strong active muscles cushion joint capsules.
      2. Lifelong Retention: Your motor cortex logs new elastic thresholds only when muscles undergo active load there.
      3. Sculpted Form: Rather than overstretched muscles, your body gains a beautifully toned, firm shape.`
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-brand-ivory text-brand-charcoal selection:bg-brand-blush selection:text-brand-charcoal">
      
      {/* 1. HEADER & NAVIGATION */}
      <header id="header-navigation" className="sticky top-0 z-40 w-full glass-panel border-b border-brand-beige transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex flex-col cursor-pointer" onClick={() => navigateTo('home')}>
            <span className="font-serif text-xl sm:text-2xl tracking-widest uppercase font-medium text-brand-charcoal">
              Sasha Uhtinskaya
            </span>
            <span className="font-sans text-xs sm:text-[10px] tracking-[0.25em] uppercase text-brand-terracotta -mt-1 font-semibold">
              stretching & mobility coach
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {Object.keys(t.nav).filter(k => k !== 'cta').map((key) => {
              const tabId = key === 'home' ? 'home' : key;
              const isActive = activeTab === tabId;
              return (
                <button
                  id={`nav-item-${tabId}`}
                  key={key}
                  onClick={() => navigateTo(tabId)}
                  className={`px-3 py-2 text-sm tracking-wide transition-all duration-200 rounded-full font-medium ${
                    isActive 
                      ? 'bg-brand-beige text-brand-charcoal' 
                      : 'text-brand-brown/80 hover:text-brand-charcoal hover:bg-brand-beige/40'
                  }`}
                >
                  {t.nav[key as keyof typeof t.nav]}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & Quick CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            
            {/* Elegant Selector */}
            <div className="relative">
              <button
                id="language-selector-desktop"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-brand-taupe/40 bg-brand-cream/80 hover:bg-brand-beige text-xs font-semibold tracking-wider text-brand-charcoal"
              >
                <Globe className="w-3.5 h-3.5 text-brand-terracotta" />
                <span>{lang === 'ru' ? 'RU' : lang === 'uk' ? 'UA' : 'EN'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-brand-ivory border border-brand-beige shadow-medium py-1.5 z-50">
                  <button
                    id="lang-option-ru"
                    onClick={() => { setLang('ru'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-1.5 text-xs font-semibold tracking-wider hover:bg-brand-beige flex items-center justify-between ${lang === 'ru' ? 'text-brand-terracotta' : 'text-brand-charcoal'}`}
                  >
                    <span>RU</span>
                    {lang === 'ru' && <Check className="w-3.5 h-3.5 text-brand-terracotta" />}
                  </button>
                  <button
                    id="lang-option-uk"
                    onClick={() => { setLang('uk'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-1.5 text-xs font-semibold tracking-wider hover:bg-brand-beige flex items-center justify-between ${lang === 'uk' ? 'text-brand-terracotta' : 'text-brand-charcoal'}`}
                  >
                    <span>UA</span>
                    {lang === 'uk' && <Check className="w-3.5 h-3.5 text-brand-terracotta" />}
                  </button>
                  <button
                    id="lang-option-en"
                    onClick={() => { setLang('en'); setIsLangDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-1.5 text-xs font-semibold tracking-wider hover:bg-brand-beige flex items-center justify-between ${lang === 'en' ? 'text-brand-terracotta' : 'text-brand-charcoal'}`}
                  >
                    <span>EN</span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5 text-brand-terracotta" />}
                  </button>
                </div>
              )}
            </div>

            <button
              id="header-cta-booking"
              onClick={() => handleBookClick('individual')}
              className="px-5 py-2.5 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile hamburger/language icon */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              id="mobile-lang-quick"
              onClick={() => setLang(lang === 'ru' ? 'uk' : lang === 'uk' ? 'en' : 'ru')}
              className="p-2 rounded-full border border-brand-beige text-xs font-bold text-brand-terracotta bg-brand-cream"
              title="Change language"
            >
              {lang === 'uk' ? 'UA' : lang.toUpperCase()}
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full text-brand-charcoal hover:bg-brand-beige transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile menu container */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-brand-ivory border-b border-brand-beige shadow-medium py-6 px-4 space-y-3 z-30 transition-all">
            <nav className="flex flex-col space-y-1">
              {Object.keys(t.nav).filter(k => k !== 'cta').map((key) => {
                const tabId = key === 'home' ? 'home' : key;
                const isActive = activeTab === tabId;
                return (
                  <button
                    id={`mobile-nav-${tabId}`}
                    key={key}
                    onClick={() => navigateTo(tabId)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition ${
                      isActive 
                        ? 'bg-brand-pink text-brand-charcoal' 
                        : 'text-brand-brown/80 hover:bg-brand-beige/50'
                    }`}
                  >
                    {t.nav[key as keyof typeof t.nav]}
                  </button>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-brand-beige flex items-center justify-between">
              <span className="text-xs text-brand-brown font-semibold">{t.contact.socialConnect}</span>
              <div className="flex space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-brand-beige rounded-full text-brand-terracotta">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="p-2 bg-brand-beige rounded-full text-brand-terracotta">
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
            <button
              id="mobile-nav-cta"
              onClick={() => { setIsMobileMenuOpen(false); handleBookClick('individual'); }}
              className="w-full text-center py-3.5 rounded-full bg-brand-terracotta text-white font-semibold text-xs uppercase tracking-widest shadow-soft"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </header>

      {/* 2. DYNAMIC CONTENT RENDERING */}
      <main>
        
        {/* ================= HOME TAB ================= */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            
            {/* HERO SECTION */}
            <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-brand-cream to-brand-ivory py-16 lg:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Text Block */}
                <div className="lg:col-span-7 space-y-6 lg:pr-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-pink/50 border border-brand-blush/30 text-brand-charcoal text-xs font-semibold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span className="animate-text-shimmer">{t.hero.badge}</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1] font-normal tracking-tight">
                    {t.hero.headline}
                  </h1>

                  <p className="font-sans text-brand-brown/90 text-base sm:text-lg leading-relaxed max-w-xl">
                    {t.hero.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                    <button
                      id="hero-book-primary"
                      onClick={() => handleBookClick('individual')}
                      className="px-8 py-4 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-bold tracking-widest uppercase text-center transition shadow-medium"
                    >
                      {t.hero.ctaPrimary}
                    </button>
                    <button
                      id="hero-schedule-secondary"
                      onClick={() => navigateTo('schedule')}
                      className="px-8 py-4 rounded-full border border-brand-taupe hover:bg-brand-beige text-brand-charcoal text-xs font-bold tracking-widest uppercase text-center transition"
                    >
                      {t.hero.ctaSecondary}
                    </button>
                  </div>

                  {/* Aesthetic core pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-brand-beige/80">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-brand-brown tracking-wide">{t.hero.tagline1}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-brand-brown tracking-wide">{t.hero.tagline2}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-brand-brown tracking-wide">{t.hero.tagline3}</span>
                    </div>
                  </div>

                </div>

                {/* Hero Portrait Frame */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-brand-taupe/20 rounded-3xl transform rotate-3 scale-95 z-0"></div>
                  <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-brand-pink/40 rounded-full blur-2xl z-0"></div>
                  <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white shadow-medium aspect-4/5 bg-brand-beige">
                    <img 
                      src={IMAGES.hero} 
                      alt="Sasha Stretching" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* QUICK CORE BENEFITS PREVIEW */}
            <section id="benefits-preview" className="py-16 bg-brand-ivory border-t border-b border-brand-beige/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">{t.benefits.title}</h2>
                  <p className="text-brand-brown/80 max-w-lg mx-auto text-sm tracking-wide">{t.benefits.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-brand-cream/60 p-8 rounded-3xl border border-brand-beige text-left space-y-4 hover:shadow-soft transition duration-300">
                    <div className="w-12 h-12 rounded-full bg-brand-pink/50 flex items-center justify-center text-brand-terracotta">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-brand-charcoal font-medium">{t.benefits.items.posture.title}</h3>
                    <p className="text-sm text-brand-brown/90 leading-relaxed">{t.benefits.items.posture.desc}</p>
                  </div>
                  <div className="bg-brand-cream/60 p-8 rounded-3xl border border-brand-beige text-left space-y-4 hover:shadow-soft transition duration-300">
                    <div className="w-12 h-12 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-brand-charcoal font-medium">{t.benefits.items.backPain.title}</h3>
                    <p className="text-sm text-brand-brown/90 leading-relaxed">{t.benefits.items.backPain.desc}</p>
                  </div>
                  <div className="bg-brand-cream/60 p-8 rounded-3xl border border-brand-beige text-left space-y-4 hover:shadow-soft transition duration-300">
                    <div className="w-12 h-12 rounded-full bg-brand-pink/50 flex items-center justify-center text-brand-terracotta">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl text-brand-charcoal font-medium">{t.benefits.items.flexibility.title}</h3>
                    <p className="text-sm text-brand-brown/90 leading-relaxed">{t.benefits.items.flexibility.desc}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    id="benefits-all-cta"
                    onClick={() => navigateTo('about')}
                    className="inline-flex items-center space-x-2 text-brand-terracotta font-bold text-xs uppercase tracking-widest hover:text-brand-brown transition"
                  >
                    <span>{lang === 'ru' ? 'Подробнее о моем подходе' : lang === 'uk' ? 'Детальніше про мій підхід' : 'More about my philosophy'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* TEASER ABOUT SASHA */}
            <section id="about-teaser" className="py-20 bg-brand-cream">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5">
                  <div className="rounded-3xl overflow-hidden shadow-medium border-4 border-white aspect-4/5 bg-brand-beige">
                    <img src={IMAGES.about} alt="Sasha portrait" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.about.title}</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">{t.about.subtitle}</h2>
                  <p className="text-brand-brown/90 text-sm sm:text-base leading-relaxed">{t.about.story1}</p>
                  <p className="text-brand-brown/90 text-sm sm:text-base leading-relaxed">{t.about.story2}</p>
                  
                  <div className="p-6 bg-brand-ivory rounded-2xl border-l-4 border-brand-terracotta shadow-soft italic text-brand-charcoal/90 text-sm font-serif">
                    {t.about.credo}
                  </div>

                  <div className="pt-4">
                    <button
                      id="teaser-about-cta"
                      onClick={() => navigateTo('about')}
                      className="px-6 py-3 rounded-full bg-brand-taupe hover:bg-brand-beige text-brand-charcoal text-xs font-semibold tracking-widest uppercase transition"
                    >
                      {lang === 'ru' ? 'Читать всю историю' : lang === 'uk' ? 'Читати всю історію' : 'Read full biography'}
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section id="services-grid" className="py-20 bg-brand-ivory">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.services.title}</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal font-medium">{t.services.subtitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {servicesList.map((service) => (
                    <div 
                      key={service.id} 
                      className={`p-8 rounded-3xl border transition duration-300 flex flex-col justify-between ${
                        service.highlighted 
                          ? 'bg-brand-beige/50 border-brand-taupe/80 shadow-medium relative overflow-hidden' 
                          : 'bg-brand-ivory border-brand-beige hover:shadow-soft'
                      }`}
                    >
                      {service.highlighted && (
                        <div className="absolute top-0 right-0 bg-brand-terracotta text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                          Popular
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-2xl text-brand-charcoal font-medium">{service.title}</h3>
                            <p className="text-xs text-brand-terracotta font-semibold mt-1">{service.subtitle}</p>
                          </div>
                        </div>

                        <p className="text-sm text-brand-brown/90 leading-relaxed">{service.description}</p>
                        
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">{t.services.includesTitle}</span>
                          <ul className="space-y-1.5">
                            {service.details.slice(0, 3).map((detail, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-xs text-brand-brown">
                                <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full flex-shrink-0"></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-brand-beige/60 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-brand-brown uppercase tracking-wider block">{t.services.priceLabel}</span>
                          <span className="text-lg font-serif font-bold text-brand-charcoal">{service.price}</span>
                          <span className="text-xs text-brand-brown"> / {service.duration}</span>
                        </div>

                        {service.id === 'group' ? (
                          <button
                            id={`services-waitlist-${service.id}`}
                            onClick={() => { alert(lang === 'ru' ? 'Вы добавлены в лист ожидания!' : lang === 'uk' ? 'Вас додано до листа очікування!' : 'You have been added to our class waitlist!'); }}
                            className="px-4 py-2.5 rounded-full border border-brand-taupe hover:bg-brand-beige text-brand-charcoal text-xs font-semibold uppercase tracking-wider transition"
                          >
                            {t.services.waitlistBtn}
                          </button>
                        ) : (
                          <button
                            id={`services-book-${service.id}`}
                            onClick={() => handleBookClick(service.id)}
                            className="px-5 py-2.5 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-semibold uppercase tracking-wider transition"
                          >
                            {t.services.bookBtn}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button 
                    id="services-full-view-cta"
                    onClick={() => navigateTo('services')}
                    className="px-6 py-3 rounded-full bg-brand-cream hover:bg-brand-beige text-brand-charcoal text-xs font-bold tracking-widest uppercase transition"
                  >
                    {lang === 'ru' ? 'Посмотреть все форматы и цены' : lang === 'uk' ? 'Подивитися всі формати та ціни' : 'Explore full services index'}
                  </button>
                </div>
              </div>
            </section>

            {/* INTERACTIVE STRETCH & EAT PROMOTION */}
            <section id="stretch-eat-highlight" className="py-20 bg-brand-cream">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">Gdańsk Wellness Community</span>
                  <h2 className="font-serif text-3xl sm:text-5xl text-brand-charcoal font-medium">{t.stretchEat.title}</h2>
                  <p className="text-xs text-brand-terracotta italic font-semibold">{t.stretchEat.subtitle}</p>
                  <p className="text-brand-brown/90 text-sm sm:text-base leading-relaxed">{t.stretchEat.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-brand-ivory rounded-2xl border border-brand-beige">
                      <Heart className="w-5 h-5 text-brand-terracotta mb-2" />
                      <span className="text-xs font-bold text-brand-charcoal block">{t.stretchEat.elements.stretching.title}</span>
                      <span className="text-[11px] text-brand-brown">{t.stretchEat.elements.stretching.desc}</span>
                    </div>
                    <div className="p-4 bg-brand-ivory rounded-2xl border border-brand-beige">
                      <Music className="w-5 h-5 text-brand-terracotta mb-2" />
                      <span className="text-xs font-bold text-brand-charcoal block">{t.stretchEat.elements.dancing.title}</span>
                      <span className="text-[11px] text-brand-brown">{t.stretchEat.elements.dancing.desc}</span>
                    </div>
                    <div className="p-4 bg-brand-ivory rounded-2xl border border-brand-beige">
                      <Coffee className="w-5 h-5 text-brand-terracotta mb-2" />
                      <span className="text-xs font-bold text-brand-charcoal block">{t.stretchEat.elements.brunch.title}</span>
                      <span className="text-[11px] text-brand-brown">{t.stretchEat.elements.brunch.desc}</span>
                    </div>
                    <div className="p-4 bg-brand-ivory rounded-2xl border border-brand-beige">
                      <Smile className="w-5 h-5 text-brand-terracotta mb-2" />
                      <span className="text-xs font-bold text-brand-charcoal block">{t.stretchEat.elements.community.title}</span>
                      <span className="text-[11px] text-brand-brown">{t.stretchEat.elements.community.desc}</span>
                    </div>
                  </div>

                  {/* Upcoming Event Flexible Card */}
                  <div className="p-6 rounded-3xl bg-brand-pink/20 border border-brand-blush/40 shadow-soft space-y-4">
                    {UPCOMING_EVENT_CONFIG.isSeasonActive ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-white/70 px-3 py-1 rounded-full border border-brand-blush/20">
                            {UPCOMING_EVENT_CONFIG.activeEvent.status[lang]}
                          </span>
                          <Calendar className="w-4 h-4 text-brand-terracotta" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <h4 className="font-serif text-lg font-bold text-brand-charcoal">
                            {UPCOMING_EVENT_CONFIG.activeEvent.title[lang]}
                          </h4>
                          <p className="text-xs text-brand-brown/90 leading-relaxed">
                            {UPCOMING_EVENT_CONFIG.activeEvent.description[lang]}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-brand-blush/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center space-x-2 text-xs text-brand-brown">
                            <Calendar className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                            <span className="font-semibold">{UPCOMING_EVENT_CONFIG.activeEvent.date[lang]}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-brand-brown">
                            <Clock className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                            <span>{UPCOMING_EVENT_CONFIG.activeEvent.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-brand-brown">
                            <MapPin className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                            <span className="truncate max-w-[200px]">{UPCOMING_EVENT_CONFIG.activeEvent.location[lang]}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta mx-auto">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-base font-bold text-brand-charcoal">
                          {UPCOMING_EVENT_CONFIG.offseason.title[lang]}
                        </h4>
                        <p className="text-xs text-brand-brown/90 max-w-sm mx-auto leading-relaxed">
                          {UPCOMING_EVENT_CONFIG.offseason.description[lang]}
                        </p>
                        <a 
                          href="https://instagram.com/sasha_stretching" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-terracotta hover:text-brand-brown transition pt-1"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          <span>Instagram</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="relative rounded-3xl overflow-hidden aspect-video border-4 border-white shadow-medium bg-brand-beige">
                    <img src={IMAGES.brunch} alt="Stretch and Eat event" className="w-full h-full object-cover" />
                  </div>

                  {/* Side-by-Side Comparison Widget */}
                  <div className="bg-brand-ivory p-6 rounded-3xl border border-brand-taupe/20 shadow-soft space-y-6">
                    <div className="space-y-1 text-center">
                      <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                        {lang === 'ru' ? 'Форматы участия' : lang === 'uk' ? 'Формати участі' : 'Choose Your Format'}
                      </h4>
                      <p className="text-[11px] text-brand-brown">
                        {lang === 'ru' ? 'Два фиксированных тарифа без скрытых расчетов' : lang === 'uk' ? 'Два фіксовані тарифи без прихованих розрахунків' : 'Two fixed pricing options with no complex formulas'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Option 1 */}
                      <div className="p-5 rounded-2xl bg-brand-cream/30 border border-brand-beige flex flex-col justify-between space-y-4 hover:border-brand-taupe/40 transition duration-300">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-brand-brown font-semibold block">Option 1</span>
                            <h5 className="font-serif text-sm font-bold text-brand-charcoal leading-tight">{optionsData.opt1.title}</h5>
                            <p className="text-[11px] text-brand-brown/90 leading-normal">{optionsData.opt1.subtitle}</p>
                          </div>
                          
                          <div>
                            <span className="text-xl font-serif font-bold text-brand-charcoal">{optionsData.opt1.price}</span>
                            <span className="text-[10px] text-brand-brown/80 block mt-0.5 italic">({optionsData.opt1.noBreakfast})</span>
                          </div>

                          <ul className="space-y-1.5 pt-2 border-t border-brand-beige/50">
                            {optionsData.opt1.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start space-x-1.5 text-[10px] text-brand-brown leading-tight">
                                <Check className="w-3 h-3 text-brand-terracotta/70 mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleBookClick('park', `${optionsData.opt1.title} (${optionsData.opt1.price})`)}
                          className="w-full py-2 rounded-full border border-brand-terracotta/80 text-brand-terracotta hover:bg-brand-terracotta hover:text-white text-[10px] font-bold uppercase tracking-wider transition duration-300 mt-2"
                        >
                          {optionsData.opt1.cta}
                        </button>
                      </div>

                      {/* Option 2 */}
                      <div className="p-5 rounded-2xl bg-brand-pink/10 border-2 border-brand-terracotta/30 flex flex-col justify-between space-y-4 relative hover:border-brand-terracotta/50 transition duration-300 shadow-sm">
                        <span className="absolute -top-2.5 right-3 bg-brand-terracotta text-white text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                          {optionsData.opt2.highlightBadge}
                        </span>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-brand-terracotta font-semibold block">Option 2</span>
                            <h5 className="font-serif text-sm font-bold text-brand-charcoal leading-tight">{optionsData.opt2.title}</h5>
                            <p className="text-[11px] text-brand-brown/90 leading-normal">{optionsData.opt2.subtitle}</p>
                          </div>
                          
                          <div>
                            <span className="text-xl font-serif font-bold text-brand-terracotta">{optionsData.opt2.price}</span>
                            <span className="text-[9px] uppercase tracking-widest text-brand-terracotta font-bold block mt-0.5">Full Experience</span>
                          </div>

                          <ul className="space-y-1.5 pt-2 border-t border-brand-beige/50">
                            {optionsData.opt2.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start space-x-1.5 text-[10px] text-brand-brown leading-tight">
                                <Check className="w-3 h-3 text-brand-terracotta mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleBookClick('park', `${optionsData.opt2.title} (${optionsData.opt2.price})`)}
                          className="w-full py-2 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-[10px] font-bold uppercase tracking-wider transition duration-300 mt-2 shadow-soft"
                        >
                          {optionsData.opt2.cta}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ACCORDION FAQ */}
            <section id="faq-accordions" className="py-20 bg-brand-cream/60">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">FAQ</span>
                  <h2 className="font-serif text-3xl text-brand-charcoal font-medium">{t.faq.title}</h2>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((idx) => {
                    const isOpen = openFaq === idx;
                    const q = t.faq[`q${idx}` as keyof typeof t.faq];
                    const a = t.faq[`a${idx}` as keyof typeof t.faq];
                    
                    return (
                      <div key={idx} className="bg-brand-ivory rounded-2xl border border-brand-beige overflow-hidden transition-all duration-300">
                        <button
                          id={`faq-toggle-${idx}`}
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                        >
                          <span className="font-serif text-base sm:text-lg text-brand-charcoal font-normal pr-4">{q}</span>
                          <ChevronDown className={`w-5 h-5 text-brand-terracotta transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-5 text-xs sm:text-sm text-brand-brown/90 leading-relaxed border-t border-brand-beige/50 pt-3 animate-fade-in">
                            {a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ================= ABOUT TAB ================= */}
        {activeTab === 'about' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.about.title}</span>
                <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal font-medium">{t.about.subtitle}</h1>
              </div>

              {/* Bio Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-medium aspect-4/5 bg-brand-beige">
                    <img src={IMAGES.about} alt="Sasha" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="text-base sm:text-lg text-brand-charcoal/90 leading-relaxed font-serif italic">
                    {t.about.credo}
                  </p>
                  <p className="text-sm sm:text-base text-brand-brown leading-relaxed">
                    {t.about.story1}
                  </p>
                  <p className="text-sm sm:text-base text-brand-brown leading-relaxed">
                    {t.about.story2}
                  </p>
                  <p className="text-sm sm:text-base text-brand-brown leading-relaxed">
                    {t.about.story3}
                  </p>
                </div>
              </div>

              {/* Core Values Section */}
              <div className="bg-brand-cream/80 rounded-3xl p-8 sm:p-12 border border-brand-beige space-y-12">
                <h2 className="font-serif text-3xl text-brand-charcoal text-center font-medium">{t.about.valuesTitle}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-3 text-center md:text-left">
                    <div className="w-10 h-10 rounded-full bg-brand-pink/50 flex items-center justify-center text-brand-terracotta mx-auto md:mx-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">{t.about.values.gentle.title}</h3>
                    <p className="text-xs text-brand-brown leading-relaxed">{t.about.values.gentle.desc}</p>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <div className="w-10 h-10 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta mx-auto md:mx-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">{t.about.values.effective.title}</h3>
                    <p className="text-xs text-brand-brown leading-relaxed">{t.about.values.effective.desc}</p>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <div className="w-10 h-10 rounded-full bg-brand-pink/50 flex items-center justify-center text-brand-terracotta mx-auto md:mx-0">
                      <Smile className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">{t.about.values.personalized.title}</h3>
                    <p className="text-xs text-brand-brown leading-relaxed">{t.about.values.personalized.desc}</p>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <div className="w-10 h-10 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta mx-auto md:mx-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">{t.about.values.sustainable.title}</h3>
                    <p className="text-xs text-brand-brown leading-relaxed">{t.about.values.sustainable.desc}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= SERVICES TAB ================= */}
        {activeTab === 'services' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.services.title}</span>
                <h1 className="font-serif text-4xl text-brand-charcoal font-medium">{t.services.subtitle}</h1>
              </div>

              {/* Grid of full services detailed indices */}
              <div className="space-y-8">
                {servicesList.map((service) => (
                  <div key={service.id} className="p-8 sm:p-12 rounded-3xl bg-brand-cream border border-brand-beige grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-terracotta bg-brand-pink/60 px-3 py-1 rounded-full">
                          {service.subtitle}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl font-medium text-brand-charcoal">{service.title}</h2>
                      <p className="text-sm sm:text-base text-brand-brown/90 leading-relaxed">{service.description}</p>
                      
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block">{t.services.includesTitle}</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-brand-brown">
                              <Check className="w-4 h-4 text-brand-terracotta flex-shrink-0" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-brand-ivory p-6 sm:p-8 rounded-2xl border border-brand-beige space-y-6 text-center lg:text-left">
                      <div className="grid grid-cols-2 gap-4 border-b border-brand-beige pb-4">
                        <div>
                          <span className="text-[10px] text-brand-brown uppercase tracking-wider block font-semibold">{t.services.durationLabel}</span>
                          <span className="text-base font-serif font-bold text-brand-charcoal">{service.duration}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-brand-brown uppercase tracking-wider block font-semibold">{t.services.priceLabel}</span>
                          <span className="text-lg font-serif font-bold text-brand-terracotta">{service.price}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-brand-brown uppercase tracking-wider block font-semibold">Location / Format</span>
                        <span className="text-xs font-bold text-brand-charcoal flex items-center justify-center lg:justify-start space-x-1.5">
                          <MapPin className="w-4 h-4 text-brand-terracotta" />
                          <span>{service.location}</span>
                        </span>
                      </div>

                      {service.id === 'group' ? (
                        <button
                          id={`services-view-waitlist-${service.id}`}
                          onClick={() => { alert(lang === 'ru' ? 'Вы добавлены в лист ожидания!' : lang === 'uk' ? 'Вас додано до листа очікування!' : 'You have been added to our class waitlist!'); }}
                          className="w-full py-3 rounded-full border border-brand-taupe hover:bg-brand-beige text-brand-charcoal font-semibold text-xs tracking-widest uppercase transition"
                        >
                          {t.services.waitlistBtn}
                        </button>
                      ) : (
                        <button
                          id={`services-view-book-${service.id}`}
                          onClick={() => handleBookClick(service.id)}
                          className="w-full py-3.5 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white font-bold text-xs tracking-widest uppercase transition shadow-soft"
                        >
                          {t.services.bookBtn}
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ================= ONLINE PROGRAMS TAB ================= */}
        {activeTab === 'programs' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.programs.title}</span>
                <h1 className="font-serif text-4xl text-brand-charcoal font-medium">{t.programs.subtitle}</h1>
              </div>

              {/* Showcase the products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Product 1: Morning Routine */}
                <div className="p-8 rounded-3xl bg-brand-cream border border-brand-beige space-y-6 flex flex-col justify-between hover:shadow-soft transition">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-terracotta">{t.programs.morning.subtitle}</span>
                    <h2 className="font-serif text-2xl font-medium text-brand-charcoal">{t.programs.morning.title}</h2>
                    <p className="text-sm text-brand-brown leading-relaxed">{t.programs.morning.desc}</p>
                    
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block">Benefits:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {t.programs.morning.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-brand-brown">
                            <Check className="w-3.5 h-3.5 text-brand-terracotta" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-beige/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-brand-brown uppercase block">Format</span>
                      <span className="text-xs font-bold text-brand-charcoal">10 {t.programs.episodes} • YouTube</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-brown uppercase block">{t.programs.buyNow}</span>
                      <span className="text-lg font-serif font-bold text-brand-terracotta">{lang === 'en' ? '€19' : '80 PLN'}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      id="practice-sample-trigger-morning"
                      onClick={() => setIsBreathingActive(true)}
                      className="flex-1 py-3 px-4 rounded-full border border-brand-terracotta hover:bg-brand-beige text-brand-terracotta font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{t.programs.playSample}</span>
                    </button>
                    <button
                      id="buy-action-morning"
                      onClick={() => { alert(lang === 'ru' ? 'Вы перенаправляетесь на страницу оплаты!' : lang === 'uk' ? 'Ви перенаправляєтесь на сторінку оплати!' : 'Redirecting to checkout panel...'); }}
                      className="flex-1 py-3 px-4 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white font-bold text-xs uppercase tracking-widest transition shadow-soft text-center"
                    >
                      {lang === 'ru' ? 'Купить за 80 PLN' : lang === 'uk' ? 'Купити за 80 PLN' : 'Buy for €19'}
                    </button>
                  </div>
                </div>

                {/* Product 2: Posture Intensive */}
                <div className="p-8 rounded-3xl bg-brand-cream border border-brand-beige space-y-6 flex flex-col justify-between hover:shadow-soft transition">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-terracotta">{t.programs.intensive.subtitle}</span>
                    <h2 className="font-serif text-2xl font-medium text-brand-charcoal">{t.programs.intensive.title}</h2>
                    <p className="text-sm text-brand-brown leading-relaxed">{t.programs.intensive.desc}</p>
                    
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-brand-charcoal uppercase tracking-wider block">Benefits:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {t.programs.intensive.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-brand-brown">
                            <Check className="w-3.5 h-3.5 text-brand-terracotta" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-beige/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-brand-brown uppercase block">Duration</span>
                      <span className="text-xs font-bold text-brand-charcoal">4 weeks • 12 lessons</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-brown uppercase block">{t.programs.buyNow}</span>
                      <span className="text-lg font-serif font-bold text-brand-terracotta">{lang === 'en' ? '€59' : '240 PLN'}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      id="practice-sample-trigger-intensive"
                      onClick={() => setIsBreathingActive(true)}
                      className="flex-1 py-3 px-4 rounded-full border border-brand-terracotta hover:bg-brand-beige text-brand-terracotta font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{t.programs.playSample}</span>
                    </button>
                    <button
                      id="buy-action-intensive"
                      onClick={() => { alert(lang === 'ru' ? 'Вы перенаправляетесь на страницу оплаты!' : lang === 'uk' ? 'Ви перенаправляєтесь на сторінку оплати!' : 'Redirecting to checkout panel...'); }}
                      className="flex-1 py-3 px-4 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white font-bold text-xs uppercase tracking-widest transition shadow-soft text-center"
                    >
                      {lang === 'ru' ? 'Купить за 240 PLN' : lang === 'uk' ? 'Купити за 240 PLN' : 'Buy for €59'}
                    </button>
                  </div>
                </div>

              </div>

              {/* BREATHING PRACTICE SIMULATOR DRAWER / CARD */}
              {isBreathingActive && (
                <div className="bg-brand-cream/90 rounded-3xl p-8 sm:p-12 border-2 border-brand-terracotta shadow-medium text-center space-y-6 max-w-2xl mx-auto transition-all animate-fade-in relative">
                  <button
                    id="close-breathing-practice"
                    onClick={() => setIsBreathingActive(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-beige text-brand-charcoal transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white rounded-full border border-brand-beige text-brand-terracotta text-xs font-semibold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.programs.sampleHeader}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-brown max-w-md mx-auto">{t.programs.sampleDesc}</p>

                  {/* Pulsing visual circle representing the breathing cycle */}
                  <div className="flex flex-col items-center justify-center py-8 space-y-6">
                    <div 
                      className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out border-4 ${
                        breathCycle === 'inhale' 
                          ? 'bg-brand-pink/60 border-brand-blush scale-110' 
                          : breathCycle === 'hold'
                          ? 'bg-brand-sage-light/60 border-brand-sage scale-105'
                          : 'bg-brand-cream border-brand-taupe scale-90'
                      }`}
                    >
                      <span className="text-sm font-serif font-bold text-brand-charcoal tracking-wide">
                        {breathCycle === 'inhale' && t.programs.inhale}
                        {breathCycle === 'hold' && t.programs.hold}
                        {breathCycle === 'exhale' && t.programs.exhale}
                      </span>
                      <span className="text-[10px] text-brand-brown mt-1">
                        {breathCycle === 'inhale' && (lang === 'en' ? 'Breathe in' : 'Вдох')}
                        {breathCycle === 'hold' && (lang === 'en' ? 'Retain' : 'Задержка')}
                        {breathCycle === 'exhale' && (lang === 'en' ? 'Release' : 'Выдох')}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-brand-brown uppercase tracking-wider block font-semibold">{t.programs.breathingTimer}</span>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-brand-charcoal">{breathTimer} s</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      id="reset-practice-btn"
                      onClick={() => { setIsBreathingActive(false); }}
                      className="px-6 py-2 rounded-full border border-brand-taupe hover:bg-brand-beige text-brand-charcoal text-xs font-semibold uppercase tracking-wider transition"
                    >
                      {t.programs.closeSample}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ================= SCHEDULE TAB ================= */}
        {activeTab === 'schedule' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.schedule.title}</span>
                <h1 className="font-serif text-4xl text-brand-charcoal font-medium">{t.schedule.subtitle}</h1>
              </div>

              {/* Sunday Highlight Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-brand-sage-light/50 border border-brand-sage/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta flex-shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-charcoal">{t.schedule.sundayHighlight}</h3>
                    <p className="text-xs text-brand-brown">{t.stretchEat.nextDate}</p>
                  </div>
                </div>
                <button
                  id="schedule-sunday-highlight-cta"
                  onClick={() => { setActiveTab('events'); }}
                  className="px-6 py-3 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-bold uppercase tracking-widest transition shadow-soft flex items-center space-x-2"
                >
                  <span>{lang === 'ru' ? 'Подробнее о Stretch & Eat' : lang === 'uk' ? 'Детальніше про Stretch & Eat' : 'More about Stretch & Eat'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Beautiful Weekly Schedule Board */}
              <div className="bg-brand-cream border border-brand-beige rounded-3xl overflow-hidden shadow-soft">
                <div className="grid grid-cols-1 lg:grid-cols-7 divide-y lg:divide-y-0 lg:divide-x divide-brand-beige/80">
                  
                  {/* Iterate over week days */}
                  {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const).map((day) => {
                    const dayEvents = scheduleData.filter((ev) => ev.day === day);
                    const isSunday = day === 'Sunday';
                    
                    return (
                      <div key={day} className={`p-6 space-y-4 ${isSunday ? 'bg-brand-sage-light/10' : ''}`}>
                        <div className="pb-3 border-b border-brand-beige flex items-center justify-between">
                          <span className="font-serif text-lg text-brand-charcoal font-medium">{t.schedule.allDays[day]}</span>
                          {isSunday && <span className="w-2.5 h-2.5 bg-brand-terracotta rounded-full"></span>}
                        </div>

                        <div className="space-y-3">
                          {dayEvents.length === 0 ? (
                            <div className="py-8 text-center text-xs text-brand-brown italic">
                              {lang === 'ru' ? 'Индивидуальные сессии по записи' : lang === 'uk' ? 'Індивідуальні сесії за записом' : 'Personal slots available'}
                            </div>
                          ) : (
                            dayEvents.map((ev) => (
                              <div 
                                key={ev.id} 
                                onClick={() => handleBookClick(ev.type === 'event' ? 'park' : ev.type)}
                                className={`p-4 rounded-2xl border transition text-left cursor-pointer hover:scale-[1.02] duration-200 ${
                                  ev.isSpecial 
                                    ? 'bg-brand-sage-light border-brand-sage' 
                                    : 'bg-brand-ivory border-brand-beige/80'
                                }`}
                              >
                                <span className="text-[10px] font-bold text-brand-terracotta uppercase tracking-wider block mb-1">
                                  {ev.time}
                                </span>
                                <h4 className="text-xs font-bold text-brand-charcoal leading-tight">
                                  {ev.title}
                                </h4>
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center space-x-1 text-[10px] text-brand-brown">
                                    <MapPin className="w-3 h-3 text-brand-terracotta" />
                                    <span className="truncate">{ev.location}</span>
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-brand-brown pt-1.5 border-t border-brand-beige/40">
                                    <span>{ev.price}</span>
                                    <span className="font-semibold text-brand-terracotta">
                                      {ev.spotsTotal - ev.spotsTaken > 0 
                                        ? `${ev.spotsTotal - ev.spotsTaken} free` 
                                        : 'Full'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                      </div>
                    );
                  })}

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= EVENTS (STRETCH & EAT) TAB ================= */}
        {activeTab === 'events' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">Gdańsk Community</span>
                <h1 className="font-serif text-4xl text-brand-charcoal font-medium">{t.stretchEat.title}</h1>
                <p className="text-xs text-brand-terracotta font-bold italic">{t.stretchEat.subtitle}</p>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <p className="text-base sm:text-lg text-brand-brown leading-relaxed">
                    {t.stretchEat.description}
                  </p>
                  
                  <div className="p-6 bg-brand-cream rounded-3xl border border-brand-beige space-y-4">
                    <h3 className="font-serif text-xl font-medium text-brand-charcoal">{t.stretchEat.atmosphereTitle}</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-brand-terracotta mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-bold text-brand-charcoal block">{t.stretchEat.elements.stretching.title}</span>
                          <span className="text-xs text-brand-brown">{t.stretchEat.elements.stretching.desc}</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-brand-terracotta mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-bold text-brand-charcoal block">{t.stretchEat.elements.dancing.title}</span>
                          <span className="text-xs text-brand-brown">{t.stretchEat.elements.dancing.desc}</span>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-brand-terracotta mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-bold text-brand-charcoal block">{t.stretchEat.elements.brunch.title}</span>
                          <span className="text-xs text-brand-brown">{t.stretchEat.elements.brunch.desc}</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Upcoming Event Flexible Card */}
                  <div className="p-6 rounded-3xl bg-brand-pink/20 border border-brand-blush/40 shadow-soft space-y-4">
                    {UPCOMING_EVENT_CONFIG.isSeasonActive ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-white/70 px-3 py-1 rounded-full border border-brand-blush/20">
                            {UPCOMING_EVENT_CONFIG.activeEvent.status[lang]}
                          </span>
                          <Calendar className="w-4 h-4 text-brand-terracotta" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <h4 className="font-serif text-lg font-bold text-brand-charcoal">
                            {UPCOMING_EVENT_CONFIG.activeEvent.title[lang]}
                          </h4>
                          <p className="text-xs text-brand-brown/90 leading-relaxed">
                            {UPCOMING_EVENT_CONFIG.activeEvent.description[lang]}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-brand-blush/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center space-x-2 text-xs text-brand-brown">
                            <Calendar className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                            <span className="font-semibold">{UPCOMING_EVENT_CONFIG.activeEvent.date[lang]}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-brand-brown">
                            <Clock className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                            <span>{UPCOMING_EVENT_CONFIG.activeEvent.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-brand-brown">
                            <MapPin className="w-3.5 h-3.5 text-brand-terracotta flex-shrink-0" />
                            <span className="truncate max-w-[200px]">{UPCOMING_EVENT_CONFIG.activeEvent.location[lang]}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta mx-auto">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-base font-bold text-brand-charcoal">
                          {UPCOMING_EVENT_CONFIG.offseason.title[lang]}
                        </h4>
                        <p className="text-xs text-brand-brown/90 max-w-sm mx-auto leading-relaxed">
                          {UPCOMING_EVENT_CONFIG.offseason.description[lang]}
                        </p>
                        <a 
                          href="https://instagram.com/sasha_stretching" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-terracotta hover:text-brand-brown transition pt-1"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          <span>Instagram</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="relative rounded-3xl overflow-hidden aspect-video border-4 border-white shadow-medium bg-brand-beige">
                    <img src={IMAGES.brunch} alt="Gdańsk Picnic stretching" className="w-full h-full object-cover" />
                  </div>

                  {/* Side-by-Side Comparison Widget */}
                  <div className="bg-brand-cream p-6 rounded-3xl border border-brand-beige space-y-6">
                    <div className="space-y-1 text-center">
                      <h4 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">
                        {lang === 'ru' ? 'Форматы участия' : lang === 'uk' ? 'Формати участі' : 'Choose Your Format'}
                      </h4>
                      <p className="text-[11px] text-brand-brown">
                        {lang === 'ru' ? 'Два фиксированных тарифа без скрытых расчетов' : lang === 'uk' ? 'Два фіксовані тарифи без прихованих розрахунків' : 'Two fixed pricing options with no complex formulas'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Option 1 */}
                      <div className="p-5 rounded-2xl bg-white/60 border border-brand-beige flex flex-col justify-between space-y-4 hover:border-brand-taupe/40 transition duration-300">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-brand-brown font-semibold block">Option 1</span>
                            <h5 className="font-serif text-sm font-bold text-brand-charcoal leading-tight">{optionsData.opt1.title}</h5>
                            <p className="text-[11px] text-brand-brown/90 leading-normal">{optionsData.opt1.subtitle}</p>
                          </div>
                          
                          <div>
                            <span className="text-xl font-serif font-bold text-brand-charcoal">{optionsData.opt1.price}</span>
                            <span className="text-[10px] text-brand-brown/80 block mt-0.5 italic">({optionsData.opt1.noBreakfast})</span>
                          </div>

                          <ul className="space-y-1.5 pt-2 border-t border-brand-beige/50">
                            {optionsData.opt1.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start space-x-1.5 text-[10px] text-brand-brown leading-tight">
                                <Check className="w-3 h-3 text-brand-terracotta/70 mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleBookClick('park', `${optionsData.opt1.title} (${optionsData.opt1.price})`)}
                          className="w-full py-2 rounded-full border border-brand-terracotta/80 text-brand-terracotta hover:bg-brand-terracotta hover:text-white text-[10px] font-bold uppercase tracking-wider transition duration-300 mt-2"
                        >
                          {optionsData.opt1.cta}
                        </button>
                      </div>

                      {/* Option 2 */}
                      <div className="p-5 rounded-2xl bg-brand-pink/10 border-2 border-brand-terracotta/30 flex flex-col justify-between space-y-4 relative hover:border-brand-terracotta/50 transition duration-300 shadow-sm">
                        <span className="absolute -top-2.5 right-3 bg-brand-terracotta text-white text-[7px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                          {optionsData.opt2.highlightBadge}
                        </span>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-brand-terracotta font-semibold block">Option 2</span>
                            <h5 className="font-serif text-sm font-bold text-brand-charcoal leading-tight">{optionsData.opt2.title}</h5>
                            <p className="text-[11px] text-brand-brown/90 leading-normal">{optionsData.opt2.subtitle}</p>
                          </div>
                          
                          <div>
                            <span className="text-xl font-serif font-bold text-brand-terracotta">{optionsData.opt2.price}</span>
                            <span className="text-[9px] uppercase tracking-widest text-brand-terracotta font-bold block mt-0.5">Full Experience</span>
                          </div>

                          <ul className="space-y-1.5 pt-2 border-t border-brand-beige/50">
                            {optionsData.opt2.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start space-x-1.5 text-[10px] text-brand-brown leading-tight">
                                <Check className="w-3 h-3 text-brand-terracotta mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => handleBookClick('park', `${optionsData.opt2.title} (${optionsData.opt2.price})`)}
                          className="w-full py-2 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-[10px] font-bold uppercase tracking-wider transition duration-300 mt-2 shadow-soft"
                        >
                          {optionsData.opt2.cta}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* ================= BLOG TAB ================= */}
        {activeTab === 'blog' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">Mindful Lifestyle Blog</span>
                <h1 className="font-serif text-4xl text-brand-charcoal font-medium">
                  {lang === 'ru' ? 'Блог о здоровом теле' : lang === 'uk' ? 'Блог про здорове тіло' : 'Mindful Movement Library'}
                </h1>
              </div>

              {/* Grid of articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-8 rounded-3xl bg-brand-cream border border-brand-beige flex flex-col justify-between hover:shadow-soft transition">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-brand-brown">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="font-serif text-2xl text-brand-charcoal font-medium leading-tight">{post.title}</h2>
                      <p className="text-sm text-brand-brown/90 leading-relaxed">{post.intro}</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-beige/50 flex justify-start">
                      <button
                        id={`read-article-btn-${post.id}`}
                        onClick={() => setReadingPost(post.id)}
                        className="text-brand-terracotta font-bold text-xs uppercase tracking-widest flex items-center space-x-1 hover:text-brand-brown transition"
                      >
                        <span>{lang === 'ru' ? 'Читать статью' : lang === 'uk' ? 'Читати статтю' : 'Read full article'}</span>
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ARTICLE READER DRAWER */}
              {readingPost && (
                <div className="p-8 sm:p-12 bg-brand-cream rounded-3xl border-2 border-brand-taupe shadow-medium max-w-3xl mx-auto relative animate-fade-in space-y-6">
                  <button
                    id="close-article-reader"
                    onClick={() => setReadingPost(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-beige text-brand-charcoal transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {(() => {
                    const post = blogPosts.find(p => p.id === readingPost);
                    if (!post) return null;
                    return (
                      <>
                        <div className="flex items-center justify-between text-xs text-brand-brown border-b border-brand-beige pb-3">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h2 className="font-serif text-3xl text-brand-charcoal font-normal">{post.title}</h2>
                        <div className="text-sm sm:text-base text-brand-brown leading-relaxed space-y-4 whitespace-pre-line font-sans pt-4">
                          {post.content}
                        </div>
                        <div className="pt-6 border-t border-brand-beige flex justify-end">
                          <button
                            id="bottom-close-article-reader"
                            onClick={() => setReadingPost(null)}
                            className="px-6 py-2.5 rounded-full bg-brand-terracotta text-white font-semibold text-xs uppercase tracking-widest"
                          >
                            {lang === 'ru' ? 'Закрыть статью' : lang === 'uk' ? 'Закрити статтю' : 'Close Article'}
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

            </div>
          </div>
        )}

        {/* ================= CONTACT TAB ================= */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in py-16 bg-brand-ivory">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-terracotta font-semibold">{t.contact.title}</span>
                <h1 className="font-serif text-4xl text-brand-charcoal font-medium">{t.contact.subtitle}</h1>
              </div>

              {/* Form & Map grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Contact Form card */}
                <div className="lg:col-span-7 bg-brand-cream p-8 rounded-3xl border border-brand-beige shadow-soft">
                  <h2 className="font-serif text-2xl font-medium text-brand-charcoal mb-6">{t.contact.formTitle}</h2>
                  
                  {isFormSubmitted ? (
                    <div className="space-y-6 text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta mx-auto">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-2xl text-brand-charcoal font-normal">{t.contact.successTitle}</h3>
                      <p className="text-sm text-brand-brown/95 max-w-md mx-auto">{t.contact.successMessage}</p>
                      <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                        <a 
                          id="form-success-telegram"
                          href="https://t.me" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="px-6 py-3 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>{t.contact.successCta}</span>
                        </a>
                        <button
                          id="form-success-reset"
                          onClick={resetBookingForm}
                          className="px-6 py-3 rounded-full border border-brand-taupe hover:bg-brand-beige text-brand-charcoal text-xs font-bold tracking-widest uppercase transition"
                        >
                          {lang === 'ru' ? 'Отправить еще' : lang === 'uk' ? 'Надіслати ще' : 'Send another booking'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.nameLabel} *</label>
                          <input 
                            id="contact-form-name"
                            type="text" 
                            required 
                            placeholder={lang === 'en' ? 'Sasha' : 'Саша'} 
                            value={bookingForm.name} 
                            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.emailLabel} *</label>
                          <input 
                            id="contact-form-email"
                            type="email" 
                            required 
                            placeholder="sasha@example.com" 
                            value={bookingForm.email} 
                            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.phoneLabel} *</label>
                          <input 
                            id="contact-form-phone"
                            type="tel" 
                            required 
                            placeholder="+48 123 456 789" 
                            value={bookingForm.phone} 
                            onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.telegramLabel}</label>
                          <input 
                            id="contact-form-telegram"
                            type="text" 
                            placeholder="@sasha_stretching" 
                            value={bookingForm.telegram} 
                            onChange={(e) => setBookingForm({ ...bookingForm, telegram: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.serviceLabel}</label>
                        <select 
                          id="contact-form-service-select"
                          value={selectedServiceId} 
                          onChange={(e) => setSelectedServiceId(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal cursor-pointer"
                        >
                          <option value="individual">{t.services.individual.title}</option>
                          <option value="online">{t.services.online.title}</option>
                          <option value="park">{t.services.park.title}</option>
                          <option value="group">{t.services.group.title}</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.dateLabel}</label>
                          <input 
                            id="contact-form-date"
                            type="date" 
                            value={bookingForm.date} 
                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.timeLabel}</label>
                          <input 
                            id="contact-form-time"
                            type="time" 
                            value={bookingForm.time} 
                            onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-brown block">{t.contact.notesLabel}</label>
                        <textarea 
                          id="contact-form-notes"
                          rows={3} 
                          placeholder={lang === 'en' ? 'Back pain, stretching history...' : 'Боли в спине, опыт занятий...'} 
                          value={bookingForm.notes} 
                          onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                        />
                      </div>

                      <button
                        id="contact-form-submit-btn"
                        type="submit"
                        className="w-full py-4 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-bold tracking-widest uppercase transition shadow-medium"
                      >
                        {t.contact.submitBtn}
                      </button>
                    </form>
                  )}
                </div>

                {/* Info and Mock Gdańsk Map panel */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Address info card */}
                  <div className="p-6 bg-brand-cream rounded-3xl border border-brand-beige space-y-4">
                    <h3 className="font-serif text-xl font-normal text-brand-charcoal">{lang === 'ru' ? 'Адрес и Локации' : lang === 'uk' ? 'Адреса та Локації' : 'Locations in Gdańsk'}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 text-xs sm:text-sm text-brand-brown">
                        <MapPin className="w-5 h-5 text-brand-terracotta flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-brand-charcoal block">Park Oliwski (Sunday Outdoor)</span>
                          <span>Opałowa 1, 80-330 Gdańsk, Poland</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 text-xs sm:text-sm text-brand-brown">
                        <MapPin className="w-5 h-5 text-brand-terracotta flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-brand-charcoal block">Cozy Central Studio</span>
                          <span>Szeroka 23, 80-835 Gdańsk, Poland</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 text-xs sm:text-sm text-brand-brown">
                        <Mail className="w-5 h-5 text-brand-terracotta flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-brand-charcoal block">Email Address</span>
                          <span>sasha.uhtinskaya@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Styled Vector representation of Gdańsk Map */}
                  <div className="rounded-3xl border border-brand-beige bg-brand-beige/40 p-4 space-y-3 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">{lang === 'ru' ? 'Интерактивная карта' : lang === 'uk' ? 'Інтерактивна карта' : 'Interactive Map Representation'}</span>
                      <span className="w-2 h-2 bg-brand-terracotta rounded-full animate-ping"></span>
                    </div>

                    <div className="relative w-full h-48 bg-brand-pink/20 rounded-2xl overflow-hidden border border-brand-beige flex items-center justify-center">
                      
                      {/* Styled abstract representation of Gdansk beach / parks */}
                      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full text-brand-taupe opacity-30">
                        <path d="M0,80 Q100,60 200,90 T400,100" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M0,130 Q150,150 300,120 T400,140" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="120" cy="70" r="15" fill="var(--color-brand-sage)" className="opacity-40" />
                        <circle cx="280" cy="110" r="25" fill="var(--color-brand-sage)" className="opacity-40" />
                      </svg>

                      {/* Oliwa Park Marker */}
                      <div className="absolute top-[60px] left-[110px] flex flex-col items-center group cursor-pointer z-10">
                        <MapPin className="w-6 h-6 text-brand-terracotta filter drop-shadow animate-bounce" />
                        <div className="bg-brand-charcoal text-white text-[9px] font-bold py-1 px-2 rounded-md whitespace-nowrap -mt-1 shadow-soft">
                          Park Oliwski (10:00 Sun)
                        </div>
                      </div>

                      {/* Studio Marker */}
                      <div className="absolute top-[105px] left-[265px] flex flex-col items-center group cursor-pointer z-10">
                        <MapPin className="w-6 h-6 text-brand-terracotta filter drop-shadow" />
                        <div className="bg-brand-charcoal text-white text-[9px] font-bold py-1 px-2 rounded-md whitespace-nowrap -mt-1 shadow-soft">
                          Cozy Studio (Szeroka)
                        </div>
                      </div>

                      {/* Gdansk Bay Indicator */}
                      <div className="absolute top-2 right-4 text-[10px] font-serif italic text-brand-brown">
                        Gdańsk Bay
                      </div>
                    </div>
                    <p className="text-[11px] text-brand-brown/80 text-center italic">{t.contact.mapLocation}</p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* 3. TESTIMONIALS AND FAQ AS SUBSECTIONS OF SECTIONS IF EXPLORING THE REST */}
      
      {/* 4. FOOTER */}
      <footer id="main-footer" className="bg-brand-cream border-t border-brand-beige py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-brand-beige">
            
            {/* Brand block */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-widest uppercase font-semibold text-brand-charcoal">Sasha Uhtinskaya</span>
                <span className="font-sans text-[10px] tracking-widest uppercase text-brand-terracotta -mt-1 font-semibold">stretching & mobility</span>
              </div>
              <p className="text-xs text-brand-brown leading-relaxed max-w-xs">
                {lang === 'en' 
                  ? 'Feminine, elegant, and mindful movement guidelines to liberate your joints and spine from fatigue.'
                  : 'Бережный, элегантный силовой стретчинг и мобильность для легкого движения вашего тела без болей.'}
              </p>
            </div>

            {/* Links Block 1 */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal block">{lang === 'en' ? 'Navigate' : 'Разделы'}</span>
              <ul className="space-y-2 text-xs text-brand-brown">
                <li><button onClick={() => navigateTo('home')} className="hover:text-brand-terracotta transition">{t.nav.home}</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-brand-terracotta transition">{t.nav.about}</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-brand-terracotta transition">{t.nav.services}</button></li>
                <li><button onClick={() => navigateTo('schedule')} className="hover:text-brand-terracotta transition">{t.nav.schedule}</button></li>
              </ul>
            </div>

            {/* Links Block 2 */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal block">Gdańsk Location</span>
              <p className="text-xs text-brand-brown">
                Park Oliwski & Center Studio, Gdańsk, Poland
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-brand-ivory rounded-full border border-brand-beige text-brand-terracotta hover:bg-brand-beige transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="p-2.5 bg-brand-ivory rounded-full border border-brand-beige text-brand-terracotta hover:bg-brand-beige transition">
                  <Send className="w-4 h-4" />
                </a>
                <a href="mailto:sasha.uhtinskaya@gmail.com" className="p-2.5 bg-brand-ivory rounded-full border border-brand-beige text-brand-terracotta hover:bg-brand-beige transition">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-brown/85">
            <span>&copy; 2026 Sasha Uhtinskaya. {t.contact.rights}</span>
            <span className="mt-2 sm:mt-0 italic font-serif">Made for mindful wellness</span>
          </div>

        </div>
      </footer>



      {/* 6. BOOKING AND SCHEDULE MODAL CONTAINER */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-brand-cream rounded-3xl border border-brand-beige p-6 sm:p-8 shadow-medium max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              id="close-booking-modal"
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-beige text-brand-charcoal transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-brand-charcoal font-normal">{t.contact.formTitle}</h3>
              <p className="text-xs text-brand-brown">{t.contact.subtitle}</p>
            </div>

            {isFormSubmitted ? (
              <div className="space-y-6 text-center py-6">
                <div className="w-14 h-14 rounded-full bg-brand-sage-light flex items-center justify-center text-brand-terracotta mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl text-brand-charcoal font-normal">{t.contact.successTitle}</h3>
                <p className="text-xs text-brand-brown leading-relaxed">{t.contact.successMessage}</p>
                <div className="pt-2 flex flex-col gap-2">
                  <a 
                    id="modal-success-tg-action"
                    href="https://t.me" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full py-3 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-bold tracking-widest uppercase transition flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.contact.successCta}</span>
                  </a>
                  <button
                    id="modal-success-close-action"
                    onClick={resetBookingForm}
                    className="w-full py-2.5 rounded-full border border-brand-taupe text-brand-charcoal text-xs font-bold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.nameLabel} *</label>
                  <input 
                    id="modal-form-name"
                    type="text" 
                    required 
                    placeholder="Sasha" 
                    value={bookingForm.name} 
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige focus:outline-none focus:border-brand-terracotta text-sm text-brand-charcoal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.emailLabel} *</label>
                    <input 
                      id="modal-form-email"
                      type="email" 
                      required 
                      placeholder="sasha@example.com" 
                      value={bookingForm.email} 
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.phoneLabel} *</label>
                    <input 
                      id="modal-form-phone"
                      type="tel" 
                      required 
                      placeholder="+48 123 456 789" 
                      value={bookingForm.phone} 
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.telegramLabel}</label>
                  <input 
                    id="modal-form-telegram"
                    type="text" 
                    placeholder="@sasha_stretching" 
                    value={bookingForm.telegram} 
                    onChange={(e) => setBookingForm({ ...bookingForm, telegram: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.serviceLabel}</label>
                  <select 
                    id="modal-form-service"
                    value={selectedServiceId} 
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal cursor-pointer"
                  >
                    <option value="individual">{t.services.individual.title}</option>
                    <option value="online">{t.services.online.title}</option>
                    <option value="park">{t.services.park.title}</option>
                    <option value="group">{t.services.group.title}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.dateLabel}</label>
                    <input 
                      id="modal-form-date"
                      type="date" 
                      value={bookingForm.date} 
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.timeLabel}</label>
                    <input 
                      id="modal-form-time"
                      type="time" 
                      value={bookingForm.time} 
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-brown block">{t.contact.notesLabel}</label>
                  <textarea 
                    id="modal-form-notes"
                    rows={2} 
                    placeholder="Notes..." 
                    value={bookingForm.notes} 
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-brand-beige text-sm text-brand-charcoal"
                  />
                </div>

                <button
                  id="modal-form-submit-btn"
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-brand-terracotta hover:bg-brand-brown text-white text-xs font-bold tracking-widest uppercase transition shadow-soft"
                >
                  {t.contact.submitBtn}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
