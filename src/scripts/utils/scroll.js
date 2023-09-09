const bodyEl = document.body;
const fixBlocks = document?.querySelectorAll('.fixed-block');
const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;
let scrollPosition = 0;

const enableWithNoScrollOffset = () => {
  bodyEl.classList.remove('dis-scroll');
  fixBlocks?.forEach((el) => {
    el.style.paddingRight = ''; // eslint-disable-line no-param-reassign
  });
  bodyEl.style.paddingRight = '';
  bodyEl.style.top = 'auto';
}

const enableScroll = () => {
  enableWithNoScrollOffset();
  window.scrollTo({
    top: scrollPosition,
    behavior: 'instant'
  });
};


const disableScroll = () => {
  scrollPosition = window.scrollY;

  bodyEl.classList.add('dis-scroll');
  fixBlocks?.forEach((el) => {
    el.style.paddingRight = paddingOffset; // eslint-disable-line no-param-reassign
  });
  bodyEl.style.paddingRight = paddingOffset;
  bodyEl.style.top = `-${scrollPosition}px`;
};

const scroll = {
  enable: enableScroll,
  disable: disableScroll,
};

export default scroll;
