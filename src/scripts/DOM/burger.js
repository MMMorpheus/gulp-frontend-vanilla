import scroll from '../utils/scroll.js';
import { elements } from '../app.js';

const openAriaBurger = (burgerEl) => {
  burgerEl?.setAttribute('aria-expanded', 'true');
  burgerEl?.setAttribute('aria-label', 'Закрыть меню');
  scroll.disable();
};

const closeAriaBurger = (burgerEl) => {
  burgerEl?.setAttribute('aria-expanded', 'false');
  burgerEl?.setAttribute('aria-label', 'Открыть меню');
  scroll.enable();
};

export default () => {
  const { burgerEl, menuEl} = elements;

  burgerEl?.addEventListener('click', () => {
    burgerEl.classList.toggle('burger-active');
    menuEl.classList.toggle('nav-active');

    if (menuEl?.classList.contains('nav-active')) {
      openAriaBurger(burgerEl);
    }
    closeAriaBurger(burgerEl);
  });

  menuEl.addEventListener('click', (e) => {
    if(e.target.tagName === "A") {
      burgerEl.classList.remove('burger-active');
      menuEl.classList.remove('nav-active');
      closeAriaBurger(burgerEl);
    }
  })

  // menuItemsEl?.forEach((el) => {
  //   el.addEventListener('click', () => {
  //     burgerEl.classList.remove('burger-active');
  //     menuEl.classList.remove('nav-active');
  //     closeAriaBurger(burgerEl);
  //   });
  // });

};
