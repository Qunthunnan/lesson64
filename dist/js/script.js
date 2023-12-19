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
  if (e.target && e.target.matches(modal.classList[0])) {
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
        opacity += 0.03;
        modal.style.opacity = opacity;
      }
    }
    showModalInvId = setInterval(addVisability, 16);
  }
}
function closeModal(modal, action) {
  if (modal.style.display !== 'none' || getComputedStyle(modal).display !== 'none') {
    function removeVisability(action) {
      opacity = +getComputedStyle(modal).opacity;
      if (opacity <= 0) {
        modal.style.display = 'none';
        modal.removeEventListener('click', eventCloseModal);
        document.removeEventListener('keydown', eventCloseKey);
        document.body.style.overflow = '';
        if (action) {
          action();
        }
        clearInterval(closeModalInvId);
      } else {
        opacity -= 0.03;
        modal.style.opacity = opacity;
      }
    }
    if (action) {
      closeModalInvId = setInterval(() => {
        removeVisability(action);
      }, 16);
    } else {
      closeModalInvId = setInterval(removeVisability, 16);
    }
  }
}
function openOnBottom() {
  if (window.scrollY + 1 + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    showModal(modal);
    window.removeEventListener('scroll', openOnBottom);
  }
} //Openning modal--form when user scrolls to bottom page

// const getData = async (url) => {
//     const result = await fetch(url);

//     if(!result.ok) {
//         throw new Error(`Could not get data from ${url}, request status: ${result.status}`);
//     }

//     return await result.json();
// }

// const postData = async (data, url) => {
//     const result = await fetch(url, {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: data,
//     });

//     return await result.json();
// }

class FoodItem {
  constructor(imagePath, imageAlt, title, descr, price, usdRate) {
    this.imagePath = imagePath;
    this.imageAlt = imageAlt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    if (usdRate && typeof usdRate === 'number') {
      this.usdRate = usdRate;
      this.price = Math.floor(this.usdRate * this.price);
    }
  }
  menuFiller(wrapper) {
    let menuItem = document.createElement('div');
    menuItem.classList.add('menu__item');
    menuItem.innerHTML = `
            <img src="${this.imagePath}" alt="${this.imageAlt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <footer class="menu__item_footer">
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </footer>
        `;
    wrapper.append(menuItem);
  }
}

// class Slider {
//     constructor (slides, nextBtn, prevBtn, curentCounter, totalCounter) {
//         this.slides = [];
//         slides.forEach(item => {
//             this.slides.push(item);
//         });
//         this.activeSlide = 0;
//         this.nextBtn = nextBtn;
//         this.prevBtn = prevBtn;
//         this.curentCounter = curentCounter;
//         this.totalCounter = totalCounter;
//         this.size = slides.length;
//         this.totalCounter.innerText = this.size;

//         nextBtn.addEventListener('click', ()=>{
//             this.nextSlide();
//         });
//         prevBtn.addEventListener('click', ()=>{
//             this.prevSlide();
//         });
//         this.updateSlider();
//     }

//     updateSlider () {
//         this.slides.forEach(element => {
//             element.classList.remove('offer__slide--start');
//             element.classList.remove('offer__slide--active');
//         });
//         this.slides[this.activeSlide].classList.add('offer__slide--active');
//         this.curentCounter.innerText = this.activeSlide + 1;
//     }

//     nextSlide () {
//         if(this.activeSlide >= this.slides.length - 1) {
//             this.activeSlide = 0;
//         } else {
//             this.activeSlide++;
//         }
//         this.updateSlider();
//     }

//     prevSlide () {
//         if(this.activeSlide === 0) {
//             this.activeSlide = this.slides.length - 1;
//         } else {
//             this.activeSlide--;
//         }
//         this.updateSlider();
//     }
// }

class Slider {
  constructor(sliderTrack, nextBtn, prevBtn, curentCounter, totalCounter) {
    debugger;
    this.sliderTrack = sliderTrack;
    this.activeSlide = 1;
    this.trackPositionX = 0;
    this.originalSliderContent = sliderTrack.querySelectorAll('.offer__slide');
    this.size = this.originalSliderContent.length;
    this.sliderWidth = +getComputedStyle(sliderTrack.querySelector('.offer__slide')).width.slice(0, -2);
    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;
    this.curentCounter = curentCounter;
    this.curentCounter.textContent = this.activeSlide;
    this.totalCounter = totalCounter;
    this.totalCounter.textContent = this.size;
    this.fillSliderTrack();
    this.sliderTrack.style.transition = 'all 0.5s ease 0s';
    this.createPagination();
    this.pagination = document.querySelector('.offer__slider_pagination');
    this.paginationItems = this.pagination.querySelectorAll('.offer__slider_pagination li');
    nextBtn.addEventListener('click', () => {
      this.nextSlide();
    });
    prevBtn.addEventListener('click', () => {
      this.prevSlide();
    });
    this.pagination.addEventListener('click', e => {
      if (e.target && e.target.matches('.offer__slider_pagination li')) {
        let dotIndex = +e.target.attributes[0].value;
        if (this.activeSlide !== dotIndex + 1) {
          this.trackPositionX = this.sliderWidth * -dotIndex - this.sliderWidth;
          this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
          this.activeSlide = dotIndex + 1;
          this.curentCounter.textContent = this.activeSlide;
          this.pagination.querySelector('.offer__dot_active').classList.remove('offer__dot_active');
          this.paginationItems[dotIndex].classList.add('offer__dot_active');
        }
      }
    });
  }
  fillSliderTrack() {
    for (let i = this.size - 1; i >= this.size - 1; i--) {
      this.sliderTrack.prepend(this.originalSliderContent[i].cloneNode(true));
    }
    for (let i = 0; i < 1; i++) {
      this.sliderTrack.append(this.originalSliderContent[i].cloneNode(true));
    }
    this.trackPositionX = this.sliderWidth * -1;
    this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
  }
  createPagination() {
    let pagination = document.createElement('ul');
    pagination.classList.add('offer__slider_pagination');
    for (let i = 0; i < this.size; i++) {
      let dot = document.createElement('li');
      dot.setAttribute('data-slide', i);
      if (i + 1 === this.activeSlide) {
        dot.classList.add('offer__dot_active');
      }
      pagination.append(dot);
    }
    this.sliderTrack.parentNode.parentNode.append(pagination);
  }

  // negativeRefill() {
  //     for(let i = this.size - 1; i >= 0; i--) {
  //         this.sliderTrack.lastChild.remove();
  //         this.sliderTrack.prepend(this.originalSliderContent[i].cloneNode(true));
  //     }
  // }

  // positiveRefill() {
  //     for(let i = 0; i < this.size; i++) {
  //         this.sliderTrack.firstChild.remove();
  //         this.sliderTrack.append(this.originalSliderContent[i].cloneNode(true));
  //     }
  // }

  nextSlide() {
    debugger;
    if (this.activeSlide === this.size) {
      this.activeSlide = 0;
      this.fakeTrackMove(true);
    } else {
      this.activeSlide++;
      this.curentCounter.textContent = this.activeSlide;
      this.trackPositionX -= this.sliderWidth;
      this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
    }
  }
  prevSlide() {
    debugger;
    if (this.activeSlide === 1) {
      this.activeSlide = this.size + 1;
      this.fakeTrackMove(false);
    } else {
      this.activeSlide--;
      this.curentCounter.textContent = this.activeSlide;
      this.trackPositionX += this.sliderWidth;
      this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
    }
  }

  // rebuildCounter (direction) {
  //     if (direction) {
  //         if(this.activeSlide === this.size) {
  //             this.activeSlide = 1;
  //             this.curentCounter.textContent = this.activeSlide;
  //         } else {
  //             this.activeSlide++;
  //             this.curentCounter.textContent = this.activeSlide;
  //         }
  //     } else {
  //         if(this.activeSlide === 1) {
  //             this.activeSlide = this.size;
  //             this.curentCounter.textContent = this.activeSlide;
  //         } else {
  //             this.activeSlide--;
  //             this.curentCounter.textContent = this.activeSlide;
  //         }
  //     }
  // }

  fakeTrackMove(direction) {
    this.sliderTrack.style.transition = 'none';
    if (direction) {
      this.trackPositionX = 0;
      this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
      setTimeout(() => {
        this.sliderTrack.style.transition = 'all 0.5s ease 0s';
        this.nextSlide();
      }, 1);
    } else {
      this.trackPositionX = this.sliderWidth * -this.size - this.sliderWidth;
      this.sliderTrack.style.transform = `matrix(1, 0, 0, 1, ${this.trackPositionX}, 0)`;
      setTimeout(() => {
        this.sliderTrack.style.transition = 'all 0.5s ease 0s';
        this.prevSlide();
      }, 1);
    }
  }
}
function makeFoodMenu() {
  // getData('http://localhost:3000/menu')
  axios.get('http://localhost:3000/menu').then(result => {
    result.data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new FoodItem(img, altimg, title, descr, price, usdRate).menuFiller(foodMenuWrapper);
    });
  });
}
const sliders = document.querySelectorAll('.tabcontent'),
  tabItems = document.querySelectorAll('.tabheader__item'),
  tabWrapper = document.querySelector('.tabheader__items'),
  modal = document.querySelector('.modal--form'),
  modalDone = document.querySelector('.modal--done'),
  modalError = document.querySelector('.modal--error'),
  closeModalBtns = document.querySelectorAll('.modal__close'),
  showModalBtns = document.querySelectorAll('[data-modal]'),
  foodMenuWrapper = document.querySelector('.menu__wrapper'),
  clientForm = modal.querySelector('.modal--form form'),
  //    offerSlides = document.querySelectorAll('.offer__slide'),
  sliderTrack = document.querySelector('.offer__slider_track'),
  nextSlideBtn = document.querySelector('.offer__slider-next'),
  prevSlideBtn = document.querySelector('.offer__slider-prev'),
  curSliderCounter = document.querySelector('#current'),
  totalSliderCounter = document.querySelector('#total'),
  slider = new Slider(sliderTrack, nextSlideBtn, prevSlideBtn, curSliderCounter, totalSliderCounter);
let endTime = new Date('2023-12-31'),
  showModalInvId,
  usdRate,
  closeModalInvId;

// getData('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=usd&json')
axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=usd&json').then(result => {
  usdRate = result.data[0]['rate'];
}).finally(makeFoodMenu);
closeModalBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    closeModal(e.target.closest('.modal'));
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
clientForm.addEventListener('submit', e => {
  e.preventDefault();
  const userData = new FormData(clientForm);

  // postData(JSON.stringify(Object.fromEntries(userData)), 'http://localhost:3000/requests')
  axios.post('http://localhost:3000/requests', Object.fromEntries(userData)).then(response => {
    console.log(response);
    closeModal(modal, () => {
      showModal(modalDone);
    });
  }).catch(() => {
    closeModal(modal, () => {
      showModal(modalError);
    });
    console.error(response);
  }).finally(() => {
    clientForm.reset();
  });
});
window.addEventListener('scroll', openOnBottom);
autoOpenTimId = setTimeout(() => {
  showModal(modal);
}, 1000 * 60 * 10);
timeUpdater(endTime);
/******/ })()
;
//# sourceMappingURL=script.js.map