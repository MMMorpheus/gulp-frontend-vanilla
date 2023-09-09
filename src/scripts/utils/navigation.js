export default (e) => {
  try {
    const targetEl = document.querySelector(e.target.dataset?.target);
    const distance = targetEl?.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: distance,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
};
