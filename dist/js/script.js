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
function zeroTime(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
function getTimeDifference(endTime) {
  const difference = new Date(endTime.getTime() - new Date().getTime());
  if (difference > 0) {
    return {
      days: zeroTime(difference.getDate()),
      hours: zeroTime(difference.getHours()),
      minutes: zeroTime(difference.getMinutes()),
      seconds: zeroTime(difference.getSeconds())
    };
  } else {
    return {
      days: '0',
      hours: '0',
      minutes: '0',
      seconds: '0'
    };
  }
}
function timeUpdater(endTime) {
  const dayElem = document.querySelector('#days'),
    hourElem = document.querySelector('#hours'),
    minuteElem = document.querySelector('#minutes'),
    secondElem = document.querySelector('#seconds');
  document.querySelector('[data-endday]').innerText = endTime.toLocaleTimeString('ua-UA', {
    day: '2-digit',
    month: 'long'
  });
  updateTime();
  let intervalId = setInterval(updateTime, 1000);
  function updateTime() {
    resultTimer = getTimeDifference(endTime);
    if (resultTimer.days === '0' && resultTimer.hours === '0' && resultTimer.minutes === '0' && resultTimer.seconds === '0') {
      clearInterval(intervalId);
    }
    dayElem.innerText = resultTimer.days;
    hourElem.innerText = resultTimer.hours;
    minuteElem.innerText = resultTimer.minutes;
    secondElem.innerText = resultTimer.seconds;
  }
}
function eventCloseModal(e) {
  if (e.target && e.target.matches('.modal')) {
    closeModal(modal);
  }
}
function eventCloseKey(e) {
  if (e.code == 'Escape') {
    closeModal(modal);
  }
}
function showModal(modal) {
  if (getComputedStyle(modal).display == 'none' || modal.style.display == 'none') {
    modal.style.opacity = '0';
    modal.style.display = 'block';
    function addVisability() {
      opacity = +getComputedStyle(modal).opacity;
      if (opacity >= 1) {
        document.body.style.overflow = 'hidden';
        modal.addEventListener('click', eventCloseModal);
        document.addEventListener('keydown', eventCloseKey);
        clearTimeout(autoOpenTimId);
        clearInterval(showModalInvId);
      } else {
        opacity += 0.1;
        modal.style.opacity = opacity;
      }
    }
    showModalInvId = setInterval(addVisability, 50);
  }
}
function closeModal(modal) {
  if (modal.style.display !== 'none' || getComputedStyle(modal).display !== 'none') {
    function removeVisability() {
      debugger;
      opacity = +getComputedStyle(modal).opacity;
      if (opacity <= 0) {
        modal.style.display = 'none';
        modal.removeEventListener('click', eventCloseModal);
        document.removeEventListener('keydown', eventCloseKey);
        document.body.style.overflow = '';
        clearInterval(closeModalInvId);
      } else {
        opacity -= 0.1;
        modal.style.opacity = opacity;
      }
    }
    closeModalInvId = setInterval(removeVisability, 50);
  }
}
function openOnBottom() {
  if (window.scrollY + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    showModal(modal);
    window.removeEventListener('scroll', openOnBottom);
  }
}
class FoodItem {
  constructor(imagePath, title, descr, price) {
    this.imagePath = imagePath;
    this.title = title;
    this.descr = descr;
    this.price = price;
    // this.usdRate = fetch('https://bank.gov.ua/NBU_Exchange/exchange_site?valcode=usd&json', { mode: 'no-cors'}).then(JSON.parse(response));
    // console.log(this.usdRate);
  }
  menuFiller(element) {
    element.querySelector('img').src = this.imagePath;
    element.querySelector('.menu__item-subtitle').innerText = this.title;
    element.querySelector('.menu__item-descr').innerText = this.descr;
    element.querySelector('.menu__item-total span').innerText = this.price;
  }
}
const sliders = document.querySelectorAll('.tabcontent'),
  tabItems = document.querySelectorAll('.tabheader__item'),
  tabWrapper = document.querySelector('.tabheader__items'),
  modal = document.querySelector('.modal'),
  closeModalBtns = document.querySelectorAll('.modal__close'),
  showModalBtns = document.querySelectorAll('[data-modal]'),
  foodMenuElements = document.querySelectorAll('.menu__item');
foodMenu = [new FoodItem('img/tabs/vegy.jpg', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229), new FoodItem('img/tabs/elite.jpg', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550), new FoodItem('img/tabs/post.jpg', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', '430')];
let endTime = new Date('2023-12-31');
closeModalBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    debugger;
    closeModal(modal);
  });
});
showModalBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    showModal(modal);
  });
});
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
foodMenuElements.forEach((element, i) => {
  foodMenu[i].menuFiller(element);
});
window.addEventListener('scroll', openOnBottom);
autoOpenTimId = setTimeout(() => {
  showModal(modal);
}, 1000 * 60 * 10);
timeUpdater(endTime);
/******/ })()
;
//# sourceMappingURL=script.js.map