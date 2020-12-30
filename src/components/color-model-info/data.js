import ColorsImage from './images/colors.png';
import RgbImage from './images/rgb.png';
import HsvImage from './images/hsv.png';
import CmyImage from './images/cmy.png';

const data = {
  time: 1609291079920,
  blocks: [
    {
      type: 'header',
      data: {
        text: '❓Колірні моделі',
        level: 1,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: "<b>Колір</b> - це  властивість матеріальних об'єктів, яка сприймається як усвідомлене зорове відчуття та виникає в результаті дії на око потоків видимого електронно-магнітного випромінювання (з довжинами хвиль від 380 до 760 нм).<br>",
      },
    },
    {
      type: 'paragraph',
      data: {
        text: "Той або інший колір «привласнюється» людиною об'єкту в процесі зорового сприйняття цього об'єкту.<br>",
      },
    },
    {
      type: 'paragraph',
      data: {
        text: "Світло сприймається або безпосередньо від джерела, наприклад, від освітлювальних приладів, або як відбиття від поверхонь об'єктів або заломлення при проходженні крізь прозорі і напівпрозорі об'єкти.<br>",
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Амплітуда, що визначає енергію хвилі, відповідає за яскравість кольору.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Око людини - складна оптична система. Фоторецептори поділяються на два види: палички і колбочки.<br> ',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Палички є високочутливими елементами і працюють в умовах слабкого освітлення. ',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Вони нечутливі до довжини хвилі і тому не "розрізняють" кольору.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Колбочки, навпаки, "розрізняють" колір.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Паличок існує тільки один тип, а колбочки поділяються на три види, кожен з яких чутливий до певного діапазону довжин хвиль (довгі, середні або короткі).<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Саме поняття кольору є особливістю людського "бачення" навколишнього середовища.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Перехід від одного кольору до іншого здійснюється безперервно, поступово. Кожному кольору співставляється не якась одна довжина хвилі світла, а довжини хвиль, що потрапляють в деякий інтервал значень.',
      },
    },
    {
      type: 'image',
      data: {
        url: ColorsImage,
        caption: '',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: '<b>Призначення колірної моделі</b> - дати засоби опису кольору в межах деякого колірного діапазону, у тому числі і для виконання інтерполяції кольорів.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Існують різні моделі, оскільки із зображенням виконуються різні дії: відображення на екран, видрук на принтер, опрацювання кольорів, перетворення в сірі тони, корекція яскравості, інтенсивності і т.п.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Кожна модель має своє призначення, тобто ефективна для виконання окремих операцій.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Розглянемо апаратно-орієнтовані триколірні моделі <b>RGB</b>, <b>CMY</b> та триатрибутні <b>HSV</b>, <b>HSL</b>.',
      },
    },
    {
      type: 'image',
      data: {
        url: RgbImage,
        caption: 'RGB',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
    {
      type: 'image',
      data: {
        url: HsvImage,
        caption: 'HSV',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
    {
      type: 'image',
      data: {
        url: CmyImage,
        caption: 'CMY',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
  ],
  version: '2.19.1',
};

export default data;
