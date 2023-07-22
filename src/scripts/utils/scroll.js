const htmlEl = document.documentElement;
const bodyEl = document.body;

// Если на странице есть блоки с фиксированым позиционирование, добавь к ним класс fixed-block,
// чтобы они не смещались вправо при скрытии полосы прокрутки
// If there are some blocks with fixed position on the page,
// just add fixed-block class not to shift to the right after the scrollbar was hidden
const fixBlocks = document?.querySelectorAll('.fixed-block');
const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;

const enableScroll = () => {
  const pagePosition = parseInt(bodyEl.dataset.position, 10);

  htmlEl.style.scrollBehavior = 'smooth';
  bodyEl.classList.remove('dis-scroll');
  fixBlocks?.forEach((el) => {
    el.style.paddingRight = '0px'; // eslint-disable-line no-param-reassign
  });
  bodyEl.style.paddingRight = '0px';
  bodyEl.style.top = 'auto';
  bodyEl.removeAttribute('data-position');
  window.scrollTo({
    top: pagePosition,
    left: 0,
  });
};

const disableScroll = () => {
  const pagePosition = window.scrollY;
  bodyEl.dataset.position = pagePosition;

  htmlEl.style.scrollBehavior = 'none';
  bodyEl.classList.add('dis-scroll');
  fixBlocks?.forEach((el) => {
    el.style.paddingRight = paddingOffset; // eslint-disable-line no-param-reassign
  });
  bodyEl.style.paddingRight = paddingOffset;
  bodyEl.style.top = `-${pagePosition}px`;
};

export default {
  enable: enableScroll,
  disable: disableScroll,
};
