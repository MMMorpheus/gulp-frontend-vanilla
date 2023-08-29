export default (fn) => {
  // Если DOM только загружается, то ф-я сработает после загрузки
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    // Иначе она вызовется немедленно
    fn();
  }
};
