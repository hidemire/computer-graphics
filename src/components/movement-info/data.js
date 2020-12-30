import FernImage from './images/fern.png';
import MovementImage from './images/movement.png';
import RotationImage from './images/rotation.png';
import ScalingImage from './images/scaling.png';

const data = {
  time: 1609291603439,
  blocks: [
    {
      type: 'header',
      data: {
        text: '❓Рух',
        level: 1,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Математичною основою задачі створення рухомих зображень у КГ є афінні перетворення.<br>',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Відображення називається афінним, якщо його можна отримати наступним способом:',
      },
    },
    {
      type: 'list',
      data: {
        style: 'ordered',
        items: [
          'Обрати «новий» базис простору з «новим» початком координат;',
          'Координатам x кожної точки простору поставити у відповідність нові координати f (x), які мають те саме положення в просторі відносно «нової» системи координат, яке координати x мали в «старій».<br>',
        ],
      },
    },
    {
      type: 'image',
      data: {
        url: FernImage,
        caption: '',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: 'Афінні перетворення трьох видів',
      },
    },
    {
      type: 'list',
      data: {
        style: 'unordered',
        items: [
          'переміщення/зсув;',
          'масштабування (збільшення/зменшення);<br>',
          'поворот на кут.',
        ],
      },
    },
    {
      type: 'image',
      data: {
        url: MovementImage,
        caption: 'переміщення/зсув',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
    {
      type: 'image',
      data: {
        url: ScalingImage,
        caption: 'масштабування (збільшення/зменшення)',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
    {
      type: 'image',
      data: {
        url: RotationImage,
        caption: 'поворот на кут',
        withBorder: false,
        withBackground: true,
        stretched: false,
      },
    },
  ],
  version: '2.19.1',
};

export default data;
