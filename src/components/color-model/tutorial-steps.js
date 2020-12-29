import React from 'react';

const steps = [
  {
    target: 'body',
    placement: 'center',
    title: <strong>Колірні моделі</strong>,
    content: (
      <p>
        Цей модуль демонструє перехід від колірної моделі
        {' '}
        <strong>RGB</strong>
        {' '}
        до
        {' '}
        <strong>HSL</strong>
        {' '}
        та
        {' '}
        <strong>CMYK</strong>
        <br />
        <br />
        Наступні кроки покажуть як правильно працювати з модулем
        {' '}
        <strong>Колірні моделі</strong>
      </p>
    ),
  },
  {
    target: '.tutorial-step--blue-bright',
    placement: 'left',
    title: <strong>Зміна яскравості синього</strong>,
    content: (
      <p>
        Змінюючи значення приводить до зміни яскравості
        {' '}
        <strong>Lightness</strong>
        {' '}
        в колірній моделі
        {' '}
        <strong>HSL</strong>
      </p>
    ),
  },
  {
    target: '.tutorial-step--colors',
    placement: 'left',
    title: <strong>Координати кольорів</strong>,
    content: (
      <p>
        Навівши мишкою на піксель вибраної картинки можна побачити координати кольору в моделі
        {' '}
        <strong>HSL</strong>
        {' '}
        та
        {' '}
        <strong>CMYK</strong>
      </p>
    ),
  },
  {
    target: '.tutorial-step--buttons',
    placement: 'top',
    title: <strong>Кнопки управління</strong>,
    content: (
      <p>
        <strong>Завантажити</strong>
        {' - '}
        відповідає за завантаження зображення у модуль
        <br />
        <br />
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
        Зображає вхідне
        {' '}
        <strong>(ліва частина)</strong>
        {' '}
        та вихідне
        {' '}
        <strong>(права частина)</strong>
        {' '}
        зображення
      </p>
    ),
  },
];

export default steps;
