import React from 'react';

const steps = [
  {
    target: 'body',
    placement: 'center',
    title: <strong>Фрактали</strong>,
    content: (
      <p>
        Цей модуль демонструє властивості геометричних фракталів, а семе
        {' '}
        <strong>дерево Піфагора</strong>
        {' '}
        та
        {' '}
        <strong>сніжинка Коха</strong>
      </p>
    ),
  },
  {
    target: '.tutorial-step--settings',
    placement: 'left',
    title: <strong>Налаштування</strong>,
    content: (
      <p>
        Дозволяє змінити тип фрактала та кількість ітерацій
        {' '}
        <strong>(повторення)</strong>
        {' '}
        для його побудови
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
        Зображає вхідне зображення фрактала
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
