/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationDict {
  nav: {
    home: string;
    about: string;
    services: string;
    programs: string;
    schedule: string;
    events: string;
    blog: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    headline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    tagline1: string;
    tagline2: string;
    tagline3: string;
  };
  about: {
    title: string;
    subtitle: string;
    story1: string;
    story2: string;
    story3: string;
    credo: string;
    valuesTitle: string;
    values: {
      gentle: { title: string; desc: string };
      effective: { title: string; desc: string };
      personalized: { title: string; desc: string };
      sustainable: { title: string; desc: string };
    };
  };
  services: {
    title: string;
    subtitle: string;
    pausedTag: string;
    waitlistBtn: string;
    bookBtn: string;
    spotsLeft: string;
    durationLabel: string;
    priceLabel: string;
    includesTitle: string;
    individual: {
      title: string;
      subtitle: string;
      desc: string;
      details: string[];
    };
    online: {
      title: string;
      subtitle: string;
      desc: string;
      details: string[];
    };
    group: {
      title: string;
      subtitle: string;
      desc: string;
      details: string[];
    };
    park: {
      title: string;
      subtitle: string;
      desc: string;
      details: string[];
    };
  };
  programs: {
    title: string;
    subtitle: string;
    playSample: string;
    closeSample: string;
    episodes: string;
    buyNow: string;
    sampleHeader: string;
    sampleDesc: string;
    breathingTimer: string;
    inhale: string;
    hold: string;
    exhale: string;
    morning: {
      title: string;
      subtitle: string;
      desc: string;
      benefits: string[];
    };
    intensive: {
      title: string;
      subtitle: string;
      desc: string;
      benefits: string[];
    };
  };
  schedule: {
    title: string;
    subtitle: string;
    sundayHighlight: string;
    allDays: {
      Monday: string;
      Tuesday: string;
      Wednesday: string;
      Thursday: string;
      Friday: string;
      Saturday: string;
      Sunday: string;
    };
    events: {
      morningWarmup: string;
      postureGroup: string;
      individualSession: string;
      parkTraining: string;
      stretchEat: string;
    };
    locations: {
      online: string;
      studio: string;
      park: string;
    };
  };
  stretchEat: {
    title: string;
    subtitle: string;
    description: string;
    atmosphereTitle: string;
    elements: {
      stretching: { title: string; desc: string };
      dancing: { title: string; desc: string };
      brunch: { title: string; desc: string };
      community: { title: string; desc: string };
    };
    calculatorTitle: string;
    calculatorDesc: string;
    calcStretching: string;
    calcDancing: string;
    calcBrunch: string;
    calcPrice: string;
    calcBook: string;
    nextDate: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    items: {
      posture: { title: string; desc: string };
      backPain: { title: string; desc: string };
      flexibility: { title: string; desc: string };
      energy: { title: string; desc: string };
      mobility: { title: string; desc: string };
      confidence: { title: string; desc: string };
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      t1: { name: string; age: number; occupation: string; achievement: string; text: string };
      t2: { name: string; age: number; occupation: string; achievement: string; text: string };
      t3: { name: string; age: number; occupation: string; achievement: string; text: string };
    };
  };
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    telegramLabel: string;
    serviceLabel: string;
    dateLabel: string;
    timeLabel: string;
    notesLabel: string;
    submitBtn: string;
    successTitle: string;
    successMessage: string;
    successCta: string;
    mapLocation: string;
    socialConnect: string;
    rights: string;
  };
}

export const translations: Record<'ru' | 'uk' | 'en', TranslationDict> = {
  ru: {
    nav: {
      home: "Главная",
      about: "Обо мне",
      services: "Услуги",
      programs: "Онлайн-программы",
      schedule: "Расписание",
      events: "Мероприятия",
      blog: "Блог",
      contact: "Контакты",
      cta: "Записаться"
    },
    hero: {
      badge: "Осознанное движение в Гданьске и онлайн",
      headline: "Двигайся свободно. Чувствуй себя сильнее.",
      description: "Персональный тренер по стретчингу Саша Ухтинская. Помогаю женщинам обрести легкую осанку, избавиться от боли в спине и шее, вернуть гибкость и полюбить движение без изнуряющих тренировок.",
      ctaPrimary: "Записаться на тренировку",
      ctaSecondary: "Посмотреть расписание",
      tagline1: "Активный силовой стретчинг",
      tagline2: "Здоровая осанка и спина",
      tagline3: "Мягкий женский подход"
    },
    about: {
      title: "Обо мне",
      subtitle: "Привет, я Саша Ухтинская",
      story1: "Я верю, что красивое тело — это здоровое и свободное тело. Мой путь в стретчинг начался с личной потребности: долгая офисная работа оставила меня с постоянным напряжением в шее и скованностью. Я хотела найти баланс между силой и мягкостью.",
      story2: "Сегодня я помогаю девушкам от 20 до 45 лет услышать свое тело. Мой метод — это сочетание активного силового стретчинга, работы над мобильностью суставов и осознанного дыхания. Никакой агрессии и работы на разрыв, только бережное, но глубокое развитие.",
      story3: "Я живу и провожу очные занятия в Гданьске, Польша, а также встречаюсь со своими ученицами в онлайн-формате из любой точки мира. Каждая тренировка со мной — это шаг к легкости, любви к себе и свободному движению.",
      credo: "«Стретчинг — это не про боль. Это про возвращение вашего тела к его естественной гармонии, силе и свободе.»",
      valuesTitle: "Мои ценности",
      values: {
        gentle: {
          title: "Бережность",
          desc: "Мы не насилуем тело ради быстрых шпагатов. Движения естественны и безопасны для суставов."
        },
        effective: {
          title: "Эффективность",
          desc: "Силовой стретчинг укрепляет мышцы в растянутом состоянии, создавая подтянутый рельеф."
        },
        personalized: {
          title: "Индивидуальный подход",
          desc: "Каждое тело уникально. Я подбираю прогрессии упражнений под вашу анатомию и уровень."
        },
        sustainable: {
          title: "Осознанность",
          desc: "Мы внедряем здоровые привычки в повседневную жизнь, избавляясь от зажимов навсегда."
        }
      }
    },
    services: {
      title: "Услуги",
      subtitle: "Направления тренировок",
      pausedTag: "Временно на паузе",
      waitlistBtn: "В лист ожидания",
      bookBtn: "Забронировать",
      spotsLeft: "Осталось мест: ",
      durationLabel: "Длительность",
      priceLabel: "Стоимость",
      includesTitle: "Что входит в занятие:",
      individual: {
        title: "Индивидуальные тренировки",
        subtitle: "Офлайн в Гданьске / Онлайн",
        desc: "Персональная программа тренировок, полностью адаптированная под ваше состояние здоровья, осанку и цели. Максимальное внимание тренера.",
        details: [
          "Диагностика осанки и паттернов движения",
          "Индивидуальный план упражнений",
          "Коррекция техники в реальном времени",
          "Рекомендации по эргономике рабочего места"
        ]
      },
      online: {
        title: "Онлайн занятия (Zoom)",
        subtitle: "Персональный формат в любой точке мира",
        desc: "Полноценная тренировка под моим контролем через видеосвязь. Качественная альтернатива живым встречам для занятых девушек.",
        details: [
          "Удобный формат без трат времени на дорогу",
          "Глубокая проработка зажимов и осанки",
          "Поддержка в чате между тренировками",
          "Запись сессии для самостоятельного повторения"
        ]
      },
      group: {
        title: "Групповые тренировки в студии",
        subtitle: "Временно приостановлено",
        desc: "Камерные группы до 6 человек в уютной студии. Энергия единомышленниц, бережный контроль техники и фокус на здоровье спины.",
        details: [
          "Вторник 17:00, Суббота 15:00",
          "Уютный инвентарь (коврики, блоки, ремни)",
          "Поддержка женского комьюнити",
          "Чайная церемония после тренировки"
        ]
      },
      park: {
        title: "Тренировки в парке Gdańsk",
        subtitle: "Каждое воскресенье в 10:00",
        desc: "Занятия на свежем воздухе под теплыми лучами утреннего солнца. Идеальный способ зарядиться энергией и соединиться с природой.",
        details: [
          "Каждое воскресенье в парке Гданьска",
          "Мягкая суставная разминка и стретчинг",
          "Дыхательные практики на траве",
          "Общение и новые знакомства в Gdańsk"
        ]
      }
    },
    programs: {
      title: "Онлайн-программы",
      subtitle: "Занимайтесь в своем темпе",
      playSample: "Попробовать демо (30 сек)",
      closeSample: "Закрыть",
      episodes: "уроков",
      buyNow: "Приобрести программу",
      sampleHeader: "Минутка осознанности с Сашей",
      sampleDesc: "Давайте сделаем быструю паузу для легкой дыхательной практики прямо сейчас. Настройтесь на свое тело.",
      breathingTimer: "Таймер практики",
      inhale: "Вдох...",
      hold: "Задержка...",
      exhale: "Выдох...",
      morning: {
        title: "Утренняя зарядка (5 минут)",
        subtitle: "Короткие видео на каждый день",
        desc: "Серия из 10 коротких, эстетичных видеоуроков в закрытом доступе на YouTube. Мягкое пробуждение суставов, избавление от отеков и заряд бодрости на весь день.",
        benefits: ["Экономия времени", "Мягкий старт дня", "Доступ навсегда", "Подходит для любого уровня"]
      },
      intensive: {
        title: "Интенсив по осанке",
        subtitle: "Глубокий онлайн-курс",
        desc: "4-недельная пошаговая программа для расправления плеч, устранения компьютерной шеи и укрепления мышечного корсета спины с поддержкой в чате.",
        benefits: ["12 полноценных тренировок", "Диагностический урок", "Чат поддержки с Сашей", "Ощутимый результат за 30 дней"]
      }
    },
    schedule: {
      title: "Расписание",
      subtitle: "Ваша неделя здорового движения",
      sundayHighlight: "Главное событие недели: тренировка в парке + пикник",
      allDays: {
        Monday: "Понедельник",
        Tuesday: "Вторник",
        Wednesday: "Среда",
        Thursday: "Четверг",
        Friday: "Пятница",
        Saturday: "Суббота",
        Sunday: "Воскресенье"
      },
      events: {
        morningWarmup: "Онлайн Утренняя Зарядка",
        postureGroup: "Спина & Осанка в Студии",
        individualSession: "Персональный стретчинг (Запись)",
        parkTraining: "Тренировка в парке Гданьска",
        stretchEat: "Stretch & Eat (Спец. событие)"
      },
      locations: {
        online: "Онлайн / YouTube",
        studio: "Уютная студия, Гданьск",
        park: "Парк Оливский, Гданьск"
      }
    },
    stretchEat: {
      title: "Stretch & Eat",
      subtitle: "Эстетика, движение и общение",
      description: "Особый формат встреч нашего комьюнити в Гданьске. Мы объединяем мягкий силовой стретчинг под открытым небом, легкие танцевальные движения для раскрытия женственности и красивый здоровый пикник-завтрак на траве.",
      atmosphereTitle: "Как это проходит:",
      elements: {
        stretching: {
          title: "Осознанный стретчинг",
          desc: "45 минут мягкой растяжки на ковриках в самых красивых зеленых уголках Гданьска."
        },
        dancing: {
          title: "Свободный танец",
          desc: "Элементы интуитивного движения для освобождения от зажимов и наполнения женской энергией."
        },
        brunch: {
          title: "Эстетичный бранч",
          desc: "Полезный завтрак: свежие ягоды, авокадо-тосты, матча и полезные десерты."
        },
        community: {
          title: "Новые подруги",
          desc: "Разговоры по душам в поддерживающей атмосфере девушек со схожими ценностями."
        }
      },
      calculatorTitle: "Создайте свою идеальную встречу",
      calculatorDesc: "Выберите опции, чтобы рассчитать стоимость участия в ближайшем событии Stretch & Eat в Гданьске.",
      calcStretching: "Тренировка по стретчингу (45 мин)",
      calcDancing: "Танцевальная разминка (15 мин)",
      calcBrunch: "Аэстетичный бранч от шефа",
      calcPrice: "Расчетная стоимость участия",
      calcBook: "Забронировать место на бранч",
      nextDate: "Ближайшая встреча: Воскресенье, 10:00, Парк Оливский"
    },
    benefits: {
      title: "Результаты занятий",
      subtitle: "Что изменят регулярные тренировки со мной",
      items: {
        posture: {
          title: "Красивая осанка",
          desc: "Плечи расправятся, грудной отдел раскроется, а шея примет анатомически правильное положение."
        },
        backPain: {
          title: "Жизнь без боли",
          desc: "Уйдет вечное мышечное напряжение в области поясницы, между лопаток и в шейном отделе."
        },
        flexibility: {
          title: "Гибкость и грация",
          desc: "Ваши движения станут более плавными, амплитудными и элегантными."
        },
        energy: {
          title: "Прилив бодрости",
          desc: "За счет улучшения кровообращения и снятия зажимов вы почувствуете прилив сил на весь день."
        },
        mobility: {
          title: "Здоровые суставы",
          desc: "Развитие мобильности убережет вас от травм и сохранит легкость движений на долгие годы."
        },
        confidence: {
          title: "Любовь к телу",
          desc: "Вы начнете чувствовать себя увереннее, свободнее и сексуальнее в каждом шаге."
        }
      }
    },
    testimonials: {
      title: "Отзывы",
      subtitle: "Истории преображения моих учениц",
      items: {
        t1: {
          name: "Анна",
          age: 28,
          occupation: "UX/UI Дизайнер",
          achievement: "Избавилась от боли в шее",
          text: "Из-за 8-10 часов за ноутбуком шея просто раскалывалась. После месяца занятий с Сашей боль полностью ушла. Я стала чувствовать себя собранной и легкой, а осанка теперь — моя гордость!"
        },
        t2: {
          name: "Мария",
          age: 34,
          occupation: "Маркетолог",
          achievement: "Села на продольный шпагат",
          text: "Я всегда думала, что деревянная, и шпагат — не для меня. Саша показала, что можно растягиваться без слез и дикой боли. Силовой стретчинг — это любовь! Идеальное мягкое отношение."
        },
        t3: {
          name: "Елена",
          age: 41,
          occupation: "Предприниматель",
          achievement: "Обрела легкость и энергию",
          text: "Занятия в парке по воскресеньям стали моим любимым ритуалом. Завтрак, общение с девочками и растяжка дают невероятный заряд на всю рабочую неделю. Всем рекомендую!"
        }
      }
    },
    faq: {
      title: "Вопросы и ответы",
      subtitle: "Все, что вы хотели знать о тренировках",
      q1: "Подходят ли занятия для новичков без растяжки?",
      a1: "Да, абсолютно! 90% моих учениц начинают с нуля. Мы двигаемся в вашем индивидуальном темпе, постепенно увеличивая амплитуду. Моя цель — здоровье вашего тела, а не рекорды.",
      q2: "Нужна ли хорошая гибкость для первой тренировки?",
      a2: "Конечно нет. Гибкость — это то, за чем вы приходите на тренировку, а не то, что требуется для старта. Мы мягко тестируем ваше тело и бережно развиваем его.",
      q3: "Как проходят онлайн-тренировки?",
      a3: "Мы созваниваемся в Zoom. Вы устанавливаете камеру так, чтобы я видела вас в полный рост на коврике. Я подробно показываю каждое упражнение, слежу за вашей техникой и голосом корректирую движения.",
      q4: "Что нужно взять с собой на занятия?",
      a4: "Для занятий в парке или онлайн вам понадобятся удобная эластичная спортивная одежда (без жестких швов), коврик и бутылка чистой воды. Обувь не нужна — мы занимаемся в носочках или босиком.",
      q5: "Какие противопоказания существуют?",
      a5: "Среди основных противопоказаний: острые воспалительные процессы, недавние переломы или операции (менее 6 месяцев), тяжелые заболевания позвоночника в стадии обострения. Если сомневаетесь — проконсультируйтесь с врачом."
    },
    contact: {
      title: "Контакты",
      subtitle: "Начните свой путь к легкости",
      formTitle: "Записаться на занятие",
      nameLabel: "Ваше имя",
      emailLabel: "Электронная почта",
      phoneLabel: "Номер телефона",
      telegramLabel: "Telegram никнейм (желательно)",
      serviceLabel: "Выберите направление",
      dateLabel: "Желаемая дата",
      timeLabel: "Удобное время",
      notesLabel: "Ваши пожелания или особенности здоровья",
      submitBtn: "Отправить заявку",
      successTitle: "Заявка успешно отправлена!",
      successMessage: "Спасибо за доверие! Я свяжусь с вами в Telegram или по почте в течение 2-3 часов, чтобы подтвердить детали тренировки и отправить координаты.",
      successCta: "Написать мне в Telegram",
      mapLocation: "Локация занятий в Гданьске: Парк Оливский & уютная студия в центре",
      socialConnect: "Следите за атмосферой в соцсетях",
      rights: "Все права защищены."
    }
  },
  uk: {
    nav: {
      home: "Головна",
      about: "Про мене",
      services: "Послуги",
      programs: "Онлайн-програми",
      schedule: "Розклад",
      events: "Заходи",
      blog: "Блог",
      contact: "Контакти",
      cta: "Записатись"
    },
    hero: {
      badge: "Усвідомлений рух у Гданську та онлайн",
      headline: "Рухайся вільно. Відчувай себе сильнішою.",
      description: "Персональний тренер зі стретчингу Саша Ухтинська. Допомагаю жінкам отримати легку поставу, позбутися болю в спині та шиї, повернути гнучкість і полюбити рух без виснажливих тренувань.",
      ctaPrimary: "Записатись на тренування",
      ctaSecondary: "Подивитися розклад",
      tagline1: "Активний силовий стретчинг",
      tagline2: "Здорова постава та спина",
      tagline3: "М'який жіночий підхід"
    },
    about: {
      title: "Про мене",
      subtitle: "Привіт, я Саша Ухтинська",
      story1: "Я вірю, що гарне тіло — це здорове та вільне тіло. Мій шлях у стретчинг розпочався з особистої потреби: тривала офісна робота залишила мене з постійною напругою в шиї та скутістю. Я хотіла знайти баланс між силою та м'якістю.",
      story2: "Сьогодні я допомагаю дівчатам від 20 до 45 років почути своє тіло. Мій метод — це поєднання активного силового стретчингу, роботи над мобільністю суглобів та усвідомленого дихання. Жодної агресії, тільки дбайливий, але глибокий розвиток.",
      story3: "Я живу та проводжу очні заняття в Гданську, Польща, а також зустрічаюся зі своїми ученицями в онлайн-форматі з будь-якої точки світу. Кожне тренування зі мною — це крок до легкості, любові до себе та вільного руху.",
      credo: "«Стретчинг — це не про біль. Це про повернення вашого тіла до його природної гармонії, сили та свободи.»",
      valuesTitle: "Мої цінності",
      values: {
        gentle: {
          title: "Дбайливість",
          desc: "Ми не гвалтуємо тіло заради швидких шпагатів. Рухи природні та безпечні для суглобів."
        },
        effective: {
          title: "Ефективність",
          desc: "Силовий стретчинг зміцнює м'язи у розтягнутому стані, створюючи підтягнутий рельєф."
        },
        personalized: {
          title: "Індивідуальний підхід",
          desc: "Кожне тіло унікальне. Я підбираю прогресії вправ під вашу анатомію та рівень."
        },
        sustainable: {
          title: "Усвідомленість",
          desc: "Ми впроваджуємо здорові звички у повсякденне життя, позбавляючись затисків назавжди."
        }
      }
    },
    services: {
      title: "Послуги",
      subtitle: "Напрямки тренувань",
      pausedTag: "Тимчасово на паузі",
      waitlistBtn: "В лист очікування",
      bookBtn: "Забронювати",
      spotsLeft: "Залишилось місць: ",
      durationLabel: "Тривалість",
      priceLabel: "Вартість",
      includesTitle: "Що входить у заняття:",
      individual: {
        title: "Індивідуальні тренування",
        subtitle: "Офлайн у Гданську / Онлайн",
        desc: "Персональна програма тренувань, повністю адаптована під ваш стан здоров'я, поставу та цілі. Максимальна увага тренера.",
        details: [
          "Діагностика постави та патернів руху",
          "Індивідуальний план вправ",
          "Корекція техніки в реальному часі",
          "Рекомендації щодо ергономіки робочого місця"
        ]
      },
      online: {
        title: "Онлайн заняття (Zoom)",
        subtitle: "Персональний формат у будь-якій точці світу",
        desc: "Повноцінне тренування під моїм контролем через відеозв'язок. Якісна альтернатива живим зустрічам для зайнятих дівчат.",
        details: [
          "Зручний формат без витрат часу на дорогу",
          "Глибока проробка затисків та постави",
          "Підтримка в чаті між тренуваннями",
          "Запис сесії для самостійного повторення"
        ]
      },
      group: {
        title: "Групові тренування в студії",
        subtitle: "Тимчасово призупинено",
        desc: "Камерні групи до 6 осіб у затишній студії. Енергія однодумиць, дбайливий контроль техніки та фокус на здоров'ї спини.",
        details: [
          "Вівторок 17:00, Субота 15:00",
          "Затишний інвентар (килимки, блоки, ремені)",
          "Підтримка жіночого ком'юніті",
          "Чайна церемонія після тренування"
        ]
      },
      park: {
        title: "Тренування в парку Gdańsk",
        subtitle: "Щонеділі о 10:00",
        desc: "Заняття на свіжому повітрі під теплими променями ранкового сонця. Ідеальний спосіб зарядитися енергією та з'єднатися з природою.",
        details: [
          "Щонеділі у парку Гданська",
          "М'яка суглобова розминка та стретчинг",
          "Дихальні практики на траві",
          "Спілкування та нові знайомства в Gdańsk"
        ]
      }
    },
    programs: {
      title: "Онлайн-програми",
      subtitle: "Займайтеся у своєму темпі",
      playSample: "Спробувати демо (30 сек)",
      closeSample: "Закрити",
      episodes: "уроків",
      buyNow: "Придбати програму",
      sampleHeader: "Хвилинка усвідомленості з Сашею",
      sampleDesc: "Давайте зробимо швидку паузу для легкої дихальної практики прямо зараз. Налаштуйтеся на своє тіло.",
      breathingTimer: "Таймер практики",
      inhale: "Вдих...",
      hold: "Затримка...",
      exhale: "Видих...",
      morning: {
        title: "Ранкова зарядка (5 хвилин)",
        subtitle: "Короткі відео на кожен день",
        desc: "Серія з 10 коротких, естетичних відеоуроків у закритому доступі на YouTube. М'яке пробудження суглобів, позбавлення від набряків та заряд бадьорості на весь день.",
        benefits: ["Економія часу", "М'який старт дня", "Доступ назавжди", "Підходить для будь-якого рівня"]
      },
      intensive: {
        title: "Інтенсив з постави",
        subtitle: "Глибокий онлайн-курс",
        desc: "4-тижнева покрокова програма для розправлення плечей, усунення комп'ютерної шиї та зміцнення м'язового корсета спини з підтримкою у чаті.",
        benefits: ["12 повноцінних тренувань", "Діагностичний урок", "Чат підтримки з Сашею", "Відчутний результат за 30 днів"]
      }
    },
    schedule: {
      title: "Розклад",
      subtitle: "Ваш тиждень здорового руху",
      sundayHighlight: "Головна подія тижня: тренування в парку + пікнік",
      allDays: {
        Monday: "Понеділок",
        Tuesday: "Вівторок",
        Wednesday: "Середа",
        Thursday: "Четвер",
        Friday: "П'ятниця",
        Saturday: "Субота",
        Sunday: "Неділя"
      },
      events: {
        morningWarmup: "Онлайн Ранкова Зарядка",
        postureGroup: "Спина & Постава у Студії",
        individualSession: "Персональний стретчинг (Запис)",
        parkTraining: "Тренування в парку Гданська",
        stretchEat: "Stretch & Eat (Спец. подія)"
      },
      locations: {
        online: "Онлайн / YouTube",
        studio: "Затишна студія, Гданськ",
        park: "Парк Олівський, Гданськ"
      }
    },
    stretchEat: {
      title: "Stretch & Eat",
      subtitle: "Естетика, рух та спілкування",
      description: "Особливий формат зустрічей нашого ком'юніті у Гданську. Ми об'єднуємо м'який силовий стретчинг під відкритим небом, легкі танцювальні рухи для розкриття жіночності та красивий здоровий пікнік-сніданок на траві.",
      atmosphereTitle: "Як це проходить:",
      elements: {
        stretching: {
          title: "Усвідомлений стретчинг",
          desc: "45 хвилин м'якої розтяжки на килимках у найкрасивіших зелених куточках Гданська."
        },
        dancing: {
          title: "Вільний танець",
          desc: "Елементи інтуїтивного руху для звільнення від затисків та наповнення жіночою енергією."
        },
        brunch: {
          title: "Естетичний бранч",
          desc: "Корисний сніданок: свіжі ягоди, авокадо-тости, матча та корисні десерти."
        },
        community: {
          title: "Нові подруги",
          desc: "Розмови по душах у підтримуючій атмосфері дівчат зі схожими цінностями."
        }
      },
      calculatorTitle: "Створіть свою ідеальну зустріч",
      calculatorDesc: "Оберіть опції, щоб розрахувати вартість участі у найближчій події Stretch & Eat у Гданську.",
      calcStretching: "Тренування зі стретчингу (45 хв)",
      calcDancing: "Танцювальна розминка (15 хв)",
      calcBrunch: "Естетичний бранч від шефа",
      calcPrice: "Розрахункова вартість участі",
      calcBook: "Забронювати місце на бранч",
      nextDate: "Найближча зустріч: Неділя, 10:00, Парк Олівський"
    },
    benefits: {
      title: "Результати занять",
      subtitle: "Що змінять регулярні тренування зі мною",
      items: {
        posture: {
          title: "Красива постава",
          desc: "Плечі розправляться, грудний відділ розкриється, а шия набуде анатомічно правильного положення."
        },
        backPain: {
          title: "Життя без болю",
          desc: "Піде вічна м'язова напруга в області попереку, між лопатками та в шийному відділі."
        },
        flexibility: {
          title: "Гнучкість та грація",
          desc: "Ваші рухи стануть більш плавними, амплітудними та елегантними."
        },
        energy: {
          title: "Приплив бадьорості",
          desc: "За рахунок покращення кровообігу та зняття затисків ви відчуєте приплив сил на весь день."
        },
        mobility: {
          title: "Здорові суглоби",
          desc: "Розвиток мобільності вбереже вас від травм та збереже легкість рухів на довгі роки."
        },
        confidence: {
          title: "Любов до тіла",
          desc: "Ви почнете відчувати себе впевненіше, вільніше та сексуальніше в кожному кроці."
        }
      }
    },
    testimonials: {
      title: "Відгуки",
      subtitle: "Історії перетворення моїх учениць",
      items: {
        t1: {
          name: "Анна",
          age: 28,
          occupation: "UX/UI Дизайнерка",
          achievement: "Позбулася болю в шиї",
          text: "Через 8-10 годин за ноутбуком шия просто розколювалася. Після місяця занять з Сашею біль повністю пішов. Я стала почуватися зібраною та легкою, а постава тепер — моя гордість!"
        },
        t2: {
          name: "Марія",
          age: 34,
          occupation: "Маркетолог",
          achievement: "Сіла на поздовжній шпагат",
          text: "Я завжди думала, що дерев'яна, і шпагат — не для мене. Саша показала, що можна розтягуватися без сліз і дикого болю. Силовий стретчинг — це любов! Ідеальне м'яке відношення."
        },
        t3: {
          name: "Олена",
          age: 41,
          occupation: "Підприємиця",
          achievement: "Знайшла легкість та енергію",
          text: "Заняття в парку щонеділі стали моїм улюбленим ритуалом. Сніданок, спілкування з дівчатами та розтяжка дають неймовірний заряд на весь робочий тиждень. Рекомендую!"
        }
      }
    },
    faq: {
      title: "Запитання та відповіді",
      subtitle: "Все, що ви хотіли знати про тренування",
      q1: "Чи підходять заняття для новачків без розтяжки?",
      a1: "Так, абсолютно! 90% моїх учениць починають з нуля. Ми рухаємося у вашому індивідуальному темпі, поступово збільшуючи амплітуду. Моя мета — здоров'я вашого тіла, а не рекорди.",
      q2: "Чи потрібна хороша гнучкість для першого тренування?",
      a2: "Звичайно ні. Гнучкість — це те, за чим ви приходите на тренування, а не те, що потрібно для старту. Ми м'яко тестуємо ваше тіло та дбайливо розвиваємо його.",
      q3: "Як проходять онлайн-тренування?",
      a3: "Ми здзвонюємося у Zoom. Ви встановлюєте камеру так, щоб я бачила вас на повний зріст на килимку. Я детально показую кожну вправу, стежу за вашою технікою та голосом коригую рухи.",
      q4: "Що потрібно взяти із собою на заняття?",
      a4: "Для занять у парку чи онлайн вам знадобляться зручний еластичний спортивний одяг (без жорстких швів), килимок та пляшка чистої води. Взуття не потрібне — ми займаємося в шкарпетках або босоніж.",
      q5: "Які протипоказання існують?",
      a5: "Серед основних протипоказань: гострі запальні процеси, нещодавні переломи або операції (менше 6 місяців), тяжкі захворювання хребта у стадії загострення. Якщо сумніваєтеся — проконсультуйтеся з лікарем."
    },
    contact: {
      title: "Контакти",
      subtitle: "Почніть свій шлях до легкості",
      formTitle: "Записатись на заняття",
      nameLabel: "Ваше ім'я",
      emailLabel: "Електронна пошта",
      phoneLabel: "Номер телефону",
      telegramLabel: "Telegram нікнейм (бажано)",
      serviceLabel: "Оберіть напрямок",
      dateLabel: "Бажана дата",
      timeLabel: "Зручний час",
      notesLabel: "Ваші побажання або особливості здоров'я",
      submitBtn: "Надіслати заявку",
      successTitle: "Заявку успішно надіслано!",
      successMessage: "Дякую за довіру! Я зв'яжуся з вами в Telegram або поштою протягом 2-3 годин, щоб підтвердити деталі тренування та надіслати координати.",
      successCta: "Написати мені в Telegram",
      mapLocation: "Локація занять у Гданську: Парк Олівський & затишна студія в центрі",
      socialConnect: "Слідкуйте за атмосферою в соцмережах",
      rights: "Всі права захищені."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      programs: "Online Programs",
      schedule: "Schedule",
      events: "Events",
      blog: "Blog",
      contact: "Contact",
      cta: "Book"
    },
    hero: {
      badge: "Mindful movement in Gdańsk & online",
      headline: "Move freely. Feel stronger. Live without pain.",
      description: "Personal stretching coach Sasha Uhtinskaya. Helping women cultivate elegant posture, release neck and back discomfort, regain flexibility, and fall in love with movement without exhausting workouts.",
      ctaPrimary: "Book a training session",
      ctaSecondary: "View weekly schedule",
      tagline1: "Active Strength Stretching",
      tagline2: "Healthy Posture & Back",
      tagline3: "Gentle Feminine Approach"
    },
    about: {
      title: "About me",
      subtitle: "Hi, I'm Sasha Uhtinskaya",
      story1: "I believe a beautiful body is a healthy, free body. My path to stretching began out of personal necessity: working long office hours left me with constant tension in my neck and severe stiffness. I wanted to find a balance between strength and gentleness.",
      story2: "Today, I help women aged 20 to 45 listen to their bodies. My method combines active strength stretching, joint mobility development, and mindful breathwork. No aggressive pushing, only safe, deep, and nurturing progression.",
      story3: "I live and coach offline in Gdańsk, Poland, and connect with students online from anywhere in the world. Every training session with me is a step towards lightweight sensation, self-love, and unhindered movement.",
      credo: "“Stretching is not about pain. It is about returning your body to its natural harmony, strength, and complete freedom.”",
      valuesTitle: "My Core Values",
      values: {
        gentle: {
          title: "Gentleness First",
          desc: "We never force the body for quick splits. Movements are natural, supportive, and completely safe for your joints."
        },
        effective: {
          title: "True Effectiveness",
          desc: "Strength stretching reinforces muscles in extended positions, shaping a toned, healthy silhouette."
        },
        personalized: {
          title: "Personalized Support",
          desc: "Every body is fully unique. I craft tailored progressions adapted directly to your anatomy and fitness level."
        },
        sustainable: {
          title: "Mindfulness",
          desc: "We integrate healthy structural habits into your daily lifestyle, liberating you from muscle blocks permanently."
        }
      }
    },
    services: {
      title: "Services",
      subtitle: "Our Training Offerings",
      pausedTag: "Currently paused",
      waitlistBtn: "Join Waitlist",
      bookBtn: "Book Session",
      spotsLeft: "Spots left: ",
      durationLabel: "Duration",
      priceLabel: "Price",
      includesTitle: "Included in every session:",
      individual: {
        title: "Individual Training",
        subtitle: "Offline in Gdańsk / Online",
        desc: "A completely personalized fitness layout adapted to your posture, spine health, and personal goals. Maximum personal trainer attention.",
        details: [
          "Complete posture and movement analysis",
          "Customized exercise plans",
          "Real-time postural technique corrections",
          "Personal workplace ergonomics advice"
        ]
      },
      online: {
        title: "Online Sessions (Zoom)",
        subtitle: "Personalized coaching worldwide",
        desc: "A high-fidelity stretching workout monitored by me via interactive video. A perfect alternative to offline meetings for busy women.",
        details: [
          "Convenient format saving travel time",
          "Deep muscular tension relief",
          "Direct text support with me between classes",
          "Video recording for independent repetitions"
        ]
      },
      group: {
        title: "Group Studio Classes",
        subtitle: "Currently on pause",
        desc: "Boutique classes of up to 6 people in a cozy, aesthetic studio. Share positive female community energy and protect your spine.",
        details: [
          "Tuesday 17:00, Saturday 15:00",
          "All aesthetic equipment (mats, blocks, straps)",
          "Empowering female community circle",
          "Healing tea ceremony after workout"
        ]
      },
      park: {
        title: "Sunday Gdańsk Park Workout",
        subtitle: "Every Sunday at 10:00",
        desc: "A beautiful outdoor morning class under warm sun rays. The ultimate way to recharge, breathe fresh air, and feel grounded.",
        details: [
          "Every Sunday in Gdańsk beautiful parks",
          "Gentle joint warmup & strength stretching",
          "Relaxing breathwork practices on the grass",
          "Community networking with local women"
        ]
      }
    },
    programs: {
      title: "Online Programs",
      subtitle: "Learn at Your Own Pace",
      playSample: "Try 30-sec sample",
      closeSample: "Close",
      episodes: "lessons",
      buyNow: "Get access",
      sampleHeader: "A Moment of Peace with Sasha",
      sampleDesc: "Let's take a quick pause for a gentle breath-stretching exercise right now. Tune in with your body.",
      breathingTimer: "Practice Timer",
      inhale: "Inhale...",
      hold: "Hold...",
      exhale: "Exhale...",
      morning: {
        title: "5-Minute Morning Routine",
        subtitle: "Short daily video tutorials",
        desc: "A series of 10 elegant, short routine videos hosted via private YouTube links. Safely wakes up your spine, reduces morning swelling, and floods you with energy.",
        benefits: ["Saves time", "Gentle morning start", "Lifetime access", "Suitable for all levels"]
      },
      intensive: {
        title: "Posture Intensive Course",
        subtitle: "Deep structural online training",
        desc: "A 4-week step-by-step master program designed to align your shoulders, eliminate computer-neck syndrome, and build a healthy back.",
        benefits: ["12 full-length video workouts", "Self-diagnostic guides", "Personal chat support with Sasha", "Visible results in 30 days"]
      }
    },
    schedule: {
      title: "Schedule",
      subtitle: "Your Week of Mindful Movement",
      sundayHighlight: "Main Event: Sunday outdoor stretching & community picnic",
      allDays: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday"
      },
      events: {
        morningWarmup: "Online Morning Routine",
        postureGroup: "Studio Spine & Posture Class",
        individualSession: "Individual Stretching (By Booking)",
        parkTraining: "Gdańsk Park Training",
        stretchEat: "Stretch & Eat (Special Event)"
      },
      locations: {
        online: "Online / YouTube Link",
        studio: "Boutique Studio, Gdańsk",
        park: "Oliwa Park, Gdańsk"
      }
    },
    stretchEat: {
      title: "Stretch & Eat",
      subtitle: "Aesthetic wellness, movement & connection",
      description: "A gorgeous, signature outdoor event for our Gdańsk community. We combine elegant strength stretching under open skies, soft dance-inspired movement to unlock femininity, and an aesthetic healthy brunch-picnic on the grass.",
      atmosphereTitle: "The Experience:",
      elements: {
        stretching: {
          title: "Mindful Stretching",
          desc: "45 minutes of body alignment and muscle release on mats in Gdańsk's most tranquil spots."
        },
        dancing: {
          title: "Intuitive Dance",
          desc: "Easy, expressive rhythmic patterns to dissolve tension and tap into positive female energy."
        },
        brunch: {
          title: "Aesthetic Brunch",
          desc: "Delightful catering: fresh berries, gourmet avocado toast, matcha lattes, and clean treats."
        },
        community: {
          title: "Deep Connections",
          desc: "Heartwarming conversations in a beautiful circle of women with aligned wellness values."
        }
      },
      calculatorTitle: "Design Your Experience",
      calculatorDesc: "Select your custom options to estimate the participation cost for the upcoming Gdańsk Stretch & Eat.",
      calcStretching: "Stretching Session (45 mins)",
      calcDancing: "Dance Warmup (15 mins)",
      calcBrunch: "Chef's Aesthetic Brunch",
      calcPrice: "Estimated Event Price",
      calcBook: "Pre-register for next Brunch",
      nextDate: "Upcoming: Sunday, 10:00, Oliwa Park, Gdańsk"
    },
    benefits: {
      title: "The Benefits",
      subtitle: "How mindful training transforms your daily life",
      items: {
        posture: {
          title: "Stately Posture",
          desc: "Align your shoulders, open up your chest cavity, and position your neck gracefully."
        },
        backPain: {
          title: "Pain-Free Living",
          desc: "Dissolve persistent muscular stress in your lower back, shoulder blades, and cervical spine."
        },
        flexibility: {
          title: "Graceful Flexibility",
          desc: "Your daily movements will become noticeably smoother, deeper, and more graceful."
        },
        energy: {
          title: "Vibrant Energy",
          desc: "By boosting healthy circulation and unlocking muscle blocks, you'll feel completely refreshed."
        },
        mobility: {
          title: "Joint Longevity",
          desc: "Active mobility safeguards your joints from injury and maintains agility for years."
        },
        confidence: {
          title: "Radiant Confidence",
          desc: "Feel deeply grounded, confident, and beautiful in your skin with every step."
        }
      }
    },
    testimonials: {
      title: "Testimonials",
      subtitle: "Transformation stories from Sasha's students",
      items: {
        t1: {
          name: "Anna",
          age: 28,
          occupation: "UX/UI Designer",
          achievement: "Freed from chronic neck pain",
          text: "Sitting 8-10 hours at my desk left my neck screaming in pain. After one month with Sasha, the pain is entirely gone. I feel so light, and my posture has become my absolute favorite asset!"
        },
        t2: {
          name: "Maria",
          age: 34,
          occupation: "Marketer",
          achievement: "Achieved full splits safely",
          text: "I was convinced I was completely inflexible. Sasha showed me that stretching can be peaceful and free from pain. Her strength stretching method is beautiful and respectful."
        },
        t3: {
          name: "Elena",
          age: 41,
          occupation: "Business Owner",
          achievement: "Rediscovered morning energy",
          text: "Sasha's Sunday park classes are my holy grail. Stretching, having breakfast, and connecting with other women charges my batteries fully for the entire workweek ahead. Must try!"
        }
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about our training",
      q1: "Can absolute beginners join without prior stretching experience?",
      a1: "Yes, completely! Over 90% of my students begin with zero experience. We customize progressions to your unique limits. My goal is structural health and safety, not extreme records.",
      q2: "Do I need to be naturally flexible to start?",
      a2: "Of course not. Flexibility is the outcome of consistent classes, not a prerequisite. We gently assess your mobility on day one and build your foundation slowly.",
      q3: "How do online sessions work?",
      a3: "We connect live via Zoom. You position your camera so I can see you on your mat. I demonstrate every sequence, observe your alignment carefully, and correct techniques through clear audio guidance.",
      q4: "What should I bring to class?",
      a4: "For park or online workouts, wear elastic sport clothing without tight seams. Bring a mat and a bottle of water. No shoes are required — we train in socks or barefoot.",
      q5: "Are there any health contraindications?",
      a5: "Major contraindications include acute inflammatory states, recent surgical procedures or fractures (under 6 months), and acute spinal conditions. When in doubt, consult your medical professional."
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Begin your journey to feeling light",
      formTitle: "Book Your Training Session",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      telegramLabel: "Telegram Username (preferred)",
      serviceLabel: "Select Training Format",
      dateLabel: "Preferred Date",
      timeLabel: "Preferred Time",
      notesLabel: "Special notes or health concerns",
      submitBtn: "Send Application",
      successTitle: "Application Received Successfully!",
      successMessage: "Thank you for trusting me! I will reach out to you via Telegram or Email within 2-3 hours to finalize your appointment and share exact coordinates.",
      successCta: "Message me on Telegram",
      mapLocation: "Training Locations: Oliwa Park & Boutique Studio in Central Gdańsk",
      socialConnect: "Catch our daily aesthetic vibes on social media",
      rights: "All rights reserved."
    }
  }
};
