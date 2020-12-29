import React from 'react';

const steps = [
  {
    target: 'body',
    placement: 'center',
    title: <strong>Рух</strong>,
    content: (
      <p>
        Цей модуль демонструє рух фігури за допомогою
        {' '}
        <strong>афінних перетворень</strong>
      </p>
    ),
  },
  {
    target: '.tutorial-step--points',
    placement: 'left',
    title: <strong>Налаштування позиції</strong>,
    styles: { options: { width: 500 } },
    content: (
      <p>
        За допомогою ціє панелі задаються координати вершин рівностороннього трикутника
        <br />
        3тя вершина вибирається з двух доступних
      </p>
    ),
  },
  {
    target: '.tutorial-step--angle',
    placement: 'left',
    title: <strong>Налаштування повороту</strong>,
    content: (
      <p>
        За допомогою ціє панелі задається кут, на який фігура повинна повернутись
      </p>
    ),
  },
  {
    target: '.tutorial-step--movement',
    placement: 'left',
    title: <strong>Налаштування напряму</strong>,
    content: (
      <p>
        За допомогою ціє панелі задається напрям руху фігури
      </p>
    ),
  },
  {
    target: '.tutorial-step--rotation',
    placement: 'left',
    title: <strong>Налаштування напряму</strong>,
    content: (
      <p>
        За допомогою ціє панелі задається напрям повороту фігури
      </p>
    ),
  },
  {
    target: '.tutorial-step--play',
    placement: 'left',
    title: <strong>Керування симуляцією</strong>,
    content: (
      <p>
        Дозволяє розпочати або зупинити симуляцію
      </p>
    ),
  },
  {
    target: '.tutorial-step--buttons',
    placement: 'top',
    title: <strong>Кнопки управління</strong>,
    content: (
      <p>
        <strong>Зберегти</strong>
        {' - '}
        дозволяє зберегти вихідне зображення
      </p>
    ),
  },
  {
    target: '.tutorial-step--canvas',
    placement: 'right',
    title: <strong>Полотно</strong>,
    content: (
      <p>
        Зображає рух фігури під час симуляції
        <br />
        <br />
        <strong>Навігація</strong>
        <br />
        <strong>W A S D</strong>
        {' - '}
        переміщення зображення
        <br />
        <strong>+ -</strong>
        {' - '}
        масштабування
      </p>
    ),
  },
];

export default steps;
