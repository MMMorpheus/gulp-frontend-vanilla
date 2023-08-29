// Apply as you need for some expandable elements
const openAria = (element, label) => {
  element?.setAttribute('aria-expanded', 'true');
  element?.setAttribute('aria-label', `Close ${label}`);
};

const closeAria = (element, label) => {
  element?.setAttribute('aria-expanded', 'false');
  element?.setAttribute('aria-label', `Open ${label}`);
};


const aria = {
  open: openAria,
  close: closeAria,
};

export default aria;
