/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
function tabsHide() {
  sliders.forEach(element => {
    element.classList.remove('tabcontent--active');
    element.classList.remove('tabcontent--show');
  });
}
function menuSwitch(item) {
  tabItems.forEach(element => {
    element.classList.remove('tabheader__item--active');
  });
  item.classList.add('tabheader__item--active');
}
function tabShow(item) {
  item.classList.add('tabcontent--show');
}
const sliders = document.querySelectorAll('.tabcontent'),
  tabItems = document.querySelectorAll('.tabheader__item'),
  tabWrapper = document.querySelector('.tabheader__items');
tabWrapper.addEventListener('click', e => {
  target = e.target;
  if (target && target.matches('.tabheader__item')) {
    tabItems.forEach((element, i) => {
      if (element == target) {
        menuSwitch(element);
        tabsHide();
        tabShow(sliders[i]);
      }
    });
  }
});
/******/ })()
;
//# sourceMappingURL=script.js.map