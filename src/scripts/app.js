// Utils
import documentReady from './utils/DOMLoaded.js';

// DOM manipulation
import burger from './DOM/burger.js';

// DOM elements
const burgerEl = document.querySelector('[data-burger]');
const menuEl = document.querySelector('[data-menu');
const menuItemsEl = document.querySelectorAll('[data-menu-item]');

export const elements = {
  burgerEl,
  menuEl,
  menuItemsEl,
};

documentReady(() => {
  // Тут исполняем скрипты
  burger();
});
